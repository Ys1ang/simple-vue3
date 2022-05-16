import {ShapeFlags} from "../shared/ShapeFlags";

function getShapeFlag(type) {
    return typeof type === 'string' ? ShapeFlags['ELEMENT'] : ShapeFlags.STATEFUL_COMPONENT
}

export function createVNode(type, props?, children?) {
    const vnode = {
        type,
        props,
        children,
        shapeFlag: getShapeFlag(type),
        el: null
    }


    if (typeof children === 'string') {
        vnode.shapeFlag = vnode.shapeFlag | ShapeFlags.TEXT_CHILDREN;
    } else if (Array.isArray(children)) {
        vnode.shapeFlag = vnode.shapeFlag | ShapeFlags.ARRAY_CHILDREN;
    }
    if(vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
        if(typeof children === 'object'){
            vnode.shapeFlag = vnode.shapeFlag | ShapeFlags.SLOT_CHILDREN;
        }
    }


    return vnode
}