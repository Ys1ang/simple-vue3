import {Fragment, Text} from "./vNode";
import {createComponentInstance, setupComponent} from "./component";
import {ShapeFlags} from "../shared/ShapeFlags";
import {createAppAPI} from "./createApp";
import {effect} from "../reactivity/effect";

const EMPTY_OBJ = {};


export function createRender(options) {
    const {
        createElement: hostCreateElement,
        patchProps: hostPatchProps,
        insert: hostInsert,
        remove: hostRemove,
        setElementText: hostSetElementText
    } = options;


    function render(vnode, container, parentComponent = null) {
        patch(null, vnode, container, parentComponent, null)
    }

    //n1:old Vnode
    //n2:new Vnode
    function patch(n1, n2, container, parentComponent, anchor) {
        //处理组件 || 处理element
        //type === strinng => string
        //type === object => element

        const {type, shapeFlag} = n2;

        switch (type) {
            case Fragment:
                processFragment(n1, n2, container, parentComponent, anchor);
                break
            case Text:
                processText(n1, n2, container);
                break
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(n1, n2, container, parentComponent, anchor)
                } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                    processComponent(n1, n2, container, parentComponent, anchor)
                }
        }
    }


    function processText(n1, n2, container) {
        const {children} = n2;
        const textNode = document.createTextNode(children);
        console.log('processText')
        container.append(textNode);
    }


    function setupRenderEffect(instance: any, initVnode, container, anchor) {
        effect(() => {

            if (!instance.isMounted) {
                const {proxy} = instance;
                const subTree = (instance.sunTree = instance.render.call(proxy));
                patch(null, subTree, container, instance, anchor)
                initVnode.el = subTree.el;
                instance.isMounted = true;
            } else {
                console.log('update');
                const {proxy} = instance;
                const subTree = instance.render.call(proxy);

                const prevSubTree = instance.sunTree;
                instance.subTree = subTree;
                patch(prevSubTree, subTree, container, instance, anchor)

                //
                // console.log('subTree')
                // console.log(subTree)
                // console.log('prevSubTree')
                // console.log(prevSubTree)

            }

        })
    }

    function mountComponent(initVnode: any, container: any, parentComponent: any, anchor) {
        const instance = createComponentInstance(initVnode, parentComponent)
        setupComponent(instance);
        setupRenderEffect(instance, initVnode, container, anchor);
    }

    function processComponent(n1, n2: any, container: any, parentComponent, anchor) {
        mountComponent(n2, container, parentComponent, anchor)
    }

    function mountChildren(children, el, parentComponent, anchor) {
        children.forEach(v => {
            patch(null, v, el, parentComponent, anchor)
        })
    }

    function mountElement(vnode: any, container: any, parentComponent, anchor) {
        //插入child需要判断是不是string或者是array
        const {children, props, shapeFlag} = vnode;
        const el = (vnode.el = hostCreateElement(vnode.type))
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            el.textContent = children;
        } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(vnode.children, el, parentComponent, anchor)
        }
        for (const key in props) {
            const val = props[key];
            hostPatchProps(el, key, null, val)
        }

        hostInsert(el, container, anchor)
    }

    function processElement(n1, n2, container: any, parentComponent, anchor) {

        if (!n1) {
            mountElement(n2, container, parentComponent, anchor)
        } else {
            patchElement(n1, n2, container, parentComponent, anchor)
        }
    }

    function patchElement(n1, n2, container, parentComponent, anchor) {
        console.log('pathEle')
        console.log(n1)
        console.log(n2)
        //dff算法更新props children

        const oldProps = n1.props || EMPTY_OBJ;
        const newProps = n2.props || EMPTY_OBJ;
        const el = (n2.el = n1.el)
        patchChildren(n1, n2, el, parentComponent, anchor)
        pathProps(el, oldProps, newProps)
    }


    function patchChildren(n1, n2, container, parentComponent, anchor) {
        const prevShapeFlag = n1.shapeFlag;
        const {shapeFlag} = n2;
        const c2 = n2.children;
        const c1 = n1.children;

        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            //文本节点
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                unMountChildren(n1.children)
            }
            if (c1 !== c2) {
                hostSetElementText(container, c2)
            }
        } else {
            if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
                hostSetElementText(container, "");
                mountChildren(c2, container, parentComponent, anchor)
            } else {
                //array diff array
                pathKeyedChildren(c1, c2, container, parentComponent, anchor);
            }
        }

    }

    function isSomeVnodeType(n1: any, n2: any) {
        //type
        //key
        return n1.type === n2.type && n1.key === n2.key
    }

    function pathKeyedChildren(c1, c2, container, parentComponent, anchor) {
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1;
        let e2 = l2 - 1;
        while (i <= e1 && 1 <= e2) {


            const n1 = c1[i];
            const n2 = c2[i];

            if (isSomeVnodeType(n1, n2)) {
                patch(n1, n2, container, parentComponent, anchor);
            } else {
                break
            }
            i++;
        }
        // 右端对比
        while (i <= e1 && i <= e2) {
            const n1 = c1[e1];
            const n2 = c2[e2];

            if (isSomeVnodeType(n1, n2)) {
                patch(n1, n2, container, parentComponent, anchor)
            } else {
                break
            }
            e1--;
            e2--;
        }
        // 新的比老的多

        if (i > e1) {
            if (i <= e2) {
                //bug:没有覆盖到所有情况
                const nextPos = i + 1;
                const anchor = nextPos < l2 ? c2[nextPos].el : null;

                while (i <= e2) {
                    patch(null, c2[i], container, parentComponent, anchor)
                    i++;
                }
            }
        } else if (i > e2) {
            while (i <= e1) {
                hostRemove(c1[i].el);
                i++;
            }
        }
    }

    function unMountChildren(children) {

        for (let i = 0; i < children.length; i++) {
            const el = children[i].el;
            hostRemove(el)
        }
    }


    function pathProps(el, oldProps: {}, newProps: {}) {

        for (const key in newProps) {
            const prevProp = oldProps[key];
            const nextProp = newProps[key];

            if (prevProp !== nextProp) {
                hostPatchProps(el, key, prevProp, nextProp);
            }

        }

        if (oldProps !== EMPTY_OBJ) {
            for (const key in oldProps) {
                if (!(key in newProps)) {
                    hostPatchProps(el, key, oldProps[key], null)
                }
            }
        }

    }

    function processFragment(n1, n2: any, container: any, parentComponent, anchor) {
        mountChildren(n2.children, container, parentComponent, anchor)
    }


    return {
        createApp: createAppAPI(render)
    }
}
