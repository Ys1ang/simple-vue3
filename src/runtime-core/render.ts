import {createVNode} from "./vNode";
import {createComponentInstance, setupComponent} from "./component";
import {isObject} from "../shared";
import {ShapeFlags} from "../shared/ShapeFlags";

export function render(vnode, container) {
//patch =>
    patch(vnode, container)
}

function patch(vnode, container) {
    //处理组件 || 处理element
    //type === strinng => string
    //type === object => element

    const {children} = vnode;
    if (typeof vnode.type === 'string') {
        processElement(vnode, container)
    } else if (isObject(vnode.type)) {
        processComponent(vnode, container)
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

