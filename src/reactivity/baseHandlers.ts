import {track, trigger} from "./effect";
import {ReactiveFlags} from "./reactive";

let get = createdGetter();
let set = createdSetter();
let readonlyGet = createdGetter(true)

function createdGetter(isReadonly = false) {
    return function (target, key) {
        const res = Reflect.get(target, key)
        if (!isReadonly) {
            track(target, key);
        }

        if (key === ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key === ReactiveFlags.IS_READONLY) {
            return isReadonly
        }
        return res
    }
}

function createdSetter() {
    return function (target, key, value) {
        const res = Reflect.set(target, key, value);
        //TODO
        // 触发依赖 done
        trigger(target, key)
        return res
    }
}

export const mutableHandlers: any = {
    get, set
}
export const readonlyHandler: any = {
    get: readonlyGet,
    set: function (target, key, value) {
        console.warn('keys:${key}set失败,应为target为readonly')
        return true;
    }
}