import {createRender} from '../runtime-core'


function createElement(type) {
    return document.createElement(type)
}


function patchProps(el, key, prevVal, nextVal) {
    const isOn = (key: string) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
        const event = key.slice(2).toLowerCase();
        el.addEventListener(event, nextVal)

    } else {
        if (nextVal === undefined || nextVal === null) {
            el.removeAttribute(key)
        } else {
            el.setAttribute(key, nextVal)

        }
    }

}


// function insert(el, container, anchor) {
//     container.insertBefore(el, anchor || null)
// }

function insert(child, parent, anchor = null) {
    console.log("Insert");
    console.log(child,);
    console.log(parent);
    console.log(anchor);
    parent.insertBefore(child, anchor);
}


function remove(child) {
    const parent = child.parentNode;
    if (parent) {
        parent.removeChild(child);
    }
}


function setElementText(el, child) {
    el.textContent = child;
}

const renderer: any = createRender({
    createElement,
    patchProps,
    insert,
    remove,
    setElementText
})


export function createApp(...args) {
    return renderer.createApp(...args)
}

export * from '../runtime-core'