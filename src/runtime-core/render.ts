import {createVNode, Fragment,Text} from "./vNode";
import {createComponentInstance, setupComponent} from "./component";
import {isObject} from "../shared";
import {ShapeFlags} from "../shared/ShapeFlags";

export function render(vnode, container) {
//patch =>
    patch(vnode, container)
}

function processText(vnode, container) {
    const {children} = vnode;
    const  textNode = document.createTextNode(children);
    console.log('processText')
    container.append(textNode);
}

function patch(vnode, container) {
    //处理组件 || 处理element
    //type === strinng => string
    //type === object => element
    const {shapeFlag,type} = vnode;

    switch (type){
        case Fragment:
            processFragment(vnode,container);
            break
        case Text:
            processText(vnode,container);
            break
        default:
            if (shapeFlag & ShapeFlags.ELEMENT) {
                processElement(vnode, container)
            } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                processComponent(vnode, container)
            }
    }




}

function setupRenderEffect(instance: any, initVnode, container) {
    const {proxy} = instance;
    const subTree = instance.render.call(proxy);
    patch(subTree, container)
    initVnode.el = subTree.el
}

function mountComponent(initVnode: any, container: any) {
    const instance = createComponentInstance(initVnode)
    setupComponent(instance);
    setupRenderEffect(instance, initVnode, container);
}

function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container)
}

function mountChildren(vnode, el) {
    vnode.children.forEach(v => {
        patch(v, el)
    })
}

function mountElement(vnode: any, container: any) {
    //插入child需要判断是不是string或者是array
    const {children, props, shapeFlag} = vnode;
    const el = (vnode.el = document.createElement('div'))
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(vnode, el)
    }
    for (const key in props) {
        let value = props[key]
        el.setAttribute(key, value);
        if (isOn(key)) {
            el.addEventListener(key.slice(2).toLowerCase(), value)
        }
    }
    container.append(el)
}

const isOn = (key: string) => /^on[A-Z]/.test(key)

function processElement(vnode: any, container: any) {
    //init
    mountElement(vnode, container)
    // update

}




function processFragment(vnode: any, container: any) {
    //init

    mountChildren(vnode,container)
    // update

}
