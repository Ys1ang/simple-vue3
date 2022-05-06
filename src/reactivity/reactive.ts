import {mutableHandlers, readonlyHandler, shallowReadonlyHandlers} from "./baseHandlers";
import {isObject} from "../shared";


export const enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive",
    IS_READONLY = "__v_isReadonly"
}

export function reactive(raw) {
    return createReactiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
    return createReactiveObject(raw, readonlyHandler)
}

function createReactiveObject(raw: any, baseHandlers) {
    if (!isObject(raw)) {
        console.warn('target' + raw + ' is not reactive Object')
        return raw;
    }
    return new Proxy(raw, baseHandlers)
}

export function isReactive(value) {
    return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
    return !!value[ReactiveFlags.IS_READONLY];
}

export function shallowReadonly(raw) {
    return createReactiveObject(raw, shallowReadonlyHandlers)

}

export function isProxy(value) {
    return isReactive(value) || isReadonly(value)

}
