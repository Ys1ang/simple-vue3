import {istracking, track, trackEffects, triggerEffects} from "./effect";
import {hasChanged, isObject} from "../shared";
import {reactive} from "./reactive";

class RefImpl {
    private dep: Set<any>;
    private _rawValue: any;

    constructor(value) {
        //如果是对象，用reactive处理，基础类型用ref处理
        this._rawValue = value;
        this._value = isObject(value) ? reactive(value) : value;
        this.dep = new Set();
    }

    private _value: any;
    get value() {
        trackRefValue(this.dep)
        return this._value
    }

    set value(newValue) {
        // 重复值 不处理
        // 对比，要区分是否是reactive对象。
        if (hasChanged(newValue, this._rawValue)) {
            this._rawValue = newValue;
            this._value = isObject(newValue) ? reactive(newValue) : newValue;
            triggerEffects(this.dep)
        }
    }
}

function trackRefValue(dep) {
    if (istracking()) {
        trackEffects(dep);
    }
}


export function ref(value) {
    return new RefImpl(value)
}