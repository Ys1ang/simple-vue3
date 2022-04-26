import {mutableHandlers, readonlyHandler} from "./baseHandlers";
export function reactive(raw) {
    return new Proxy(raw, mutableHandlers)
}
export function readonly(raw){
    return new Proxy(raw, readonlyHandler)
}