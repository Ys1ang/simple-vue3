import {createVNode} from "./vNode";
import {createComponentInstance, setupComponent} from "./component";

export function render(vnode, container) {
//path =>

    path(vnode, container)
}


function path(vnode, container) {
    //处理组件 || 处理element
    processComponent(vnode, container)

}


function setupRenderEffect(instance: any, container) {
    const subTree = instance.render();
    path(subTree, container)

}

function mountComponent(vnode: any, container: any) {
    const instance = createComponentInstance(vnode)

    setupComponent(instance);
    setupRenderEffect(instance, container);
}

function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container)

}

