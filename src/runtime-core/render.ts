import {createVNode} from "./vNode";
import {createComponentInstance, setupComponent} from "./component";
import {isObject} from "../shared";

export function render(vnode, container) {
//patch =>
    patch(vnode, container)
}


function patch(vnode, container) {
    //处理组件 || 处理element

    if (typeof vnode.type === 'string') {
        processElement(vnode, container)
    } else if (isObject(vnode.type)) {
        processComponent(vnode, container)
    }

    console.log(vnode.type)


}


function setupRenderEffect(instance: any, container) {

    const subTree = instance.render();
    patch(subTree, container)

}

function mountComponent(vnode: any, container: any) {
    const instance = createComponentInstance(vnode)

    setupComponent(instance);
    setupRenderEffect(instance, container);
}

function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container)
}

function mountElement(vnode: any, container: any) {
    // el.textContent = 'hi JOJO ,its Simple Vue'
    // el.setAttribute('id', 'root')
    // document.body.append(el)

    //插入child需要判断是不是string或者是array

    const {children, props} = vnode;
    const el = document.createElement('div')
    if (typeof children === 'string') {
        el.textContent = children;
    } else if (Array.isArray(children)) {
        mountChildren(vnode, el)
    }

    function mountChildren(vnode, el) {
        vnode.children.forEach(v => {
            patch(v, el)
        })
    }


    for (const key in props) {
        let value = props[key]
        el.setAttribute(key, value);
    }
    console.log("jojo")
    console.log(vnode)

    container.append(el)


}

function processElement(vnode: any, container: any) {
    //init
    mountElement(vnode, container)
    // update

}

