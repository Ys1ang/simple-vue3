import {ShapeFlags} from "../shared/ShapeFlags";

export function initSlots(instance, children) {
    // instance.slots = Array.isArray(children)? children : [children]
    const {vnode} = instance;
    if (vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
        normalizeObjectValue(children, instance.slots);

    }
}

function normalizeObjectValue(children, slots) {
    for (const key in children) {
        const value = children[key]
        slots[key] = (props) =>
            normalizeSlotValue(value(props))
    }

}

function normalizeSlotValue(value) {
    return Array.isArray(value) ? value : [value];
}