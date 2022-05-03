import {mutableHandlers, readonlyHandler} from "./baseHandlers";


export const enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive"
}

export function reactive(raw) {
    return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
    return createActiveObject(raw, readonlyHandler)
}

function createActiveObject(raw: any, baseHandlers) {
    return new Proxy(raw, baseHandlers)
}

export function isReactive(value) {
    return !!value[ReactiveFlags.IS_REACTIVE];
}

