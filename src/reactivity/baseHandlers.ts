import {track, trigger} from "./effect";

function createdGetter(isReadonly = false) {
    return function (target, key) {
        const res = Reflect.get(target, key)
        if (!isReadonly) {
            track(target, key);
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
    get: createdGetter(),
    set: createdSetter(),
}
export const readonlyHandler: any = {
    get: createdGetter(true),
    set: function (target, key, value) {
        return true;
    }
}