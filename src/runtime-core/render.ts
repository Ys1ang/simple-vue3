import { Fragment,Text} from "./vNode";
import {createComponentInstance, setupComponent} from "./component";
import {ShapeFlags} from "../shared/ShapeFlags";
import { createAppAPI} from "./createApp";

export  function createRender(options){
    const  {createElement,patchProps,insert}=options;
     function render(vnode, container,parentComponent=null) {
        patch(vnode, container,parentComponent)
    }
    function patch(vnode, container,parentComponent) {
        //处理组件 || 处理element
        //type === strinng => string
        //type === object => element
        const {shapeFlag,type} = vnode;
        switch (type){
            case Fragment:
                processFragment(vnode,container,parentComponent);
                break
            case Text:
                processText(vnode,container);
                break
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(vnode, container,parentComponent)
                } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                    processComponent(vnode, container,parentComponent)
                }
        }
    }


function processText(vnode, container) {
    const {children} = vnode;
    const  textNode = document.createTextNode(children);
    console.log('processText')
    container.append(textNode);
}


function setupRenderEffect(instance: any, initVnode, container) {
    const {proxy} = instance;
    const subTree = instance.render.call(proxy);
    patch(subTree, container,instance)
    initVnode.el = subTree.el
}

function mountComponent(initVnode: any, container: any,parentComponent:any) {
    const instance = createComponentInstance(initVnode,parentComponent)
    setupComponent(instance);
    setupRenderEffect(instance, initVnode, container);
}

function processComponent(vnode: any, container: any,parentComponent) {
    mountComponent(vnode, container,parentComponent)
}

function mountChildren(vnode, el,parentComponent) {
    vnode.children.forEach(v => {
        patch(v, el,parentComponent)
    })
}

function mountElement(vnode: any, container: any,parentComponent) {
    //插入child需要判断是不是string或者是array
    const {children, props, shapeFlag} = vnode;
    const el = createElement(vnode.type)
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(vnode, el,parentComponent)
    }
    for (const key in props) {
     const val = props[key];
        patchProps(el,key,val)
    }
    insert(el,container)
}

function processElement(vnode: any, container: any,parentComponent) {
    mountElement(vnode, container,parentComponent)
}

function processFragment(vnode: any, container: any,parentComponent) {
    mountChildren(vnode,container,parentComponent)
}


return {
         createApp:createAppAPI(render)
}
}
