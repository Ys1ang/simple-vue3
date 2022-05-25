import {istracking, trackEffects, triggerEffects} from "./effect";
import {hasChanged, isObject} from "../shared";
import {reactive} from "./reactive";

class RefImpl {
    public __v_isRef = true
    private dep: Set<any>;
    private _rawValue: any;

    constructor(value) {
        //如果是对象，用reactive处理，基础类型用ref处理
        this._rawValue = value;
        this._value = convert(value)
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
            this._value = convert(newValue)
            triggerEffects(this.dep)
        }
    }
}

function trackRefValue(dep) {
    if (istracking()) {
        trackEffects(dep);
    }
}

function convert(value) {
    return isObject(value) ? reactive(value) : value;
}


export function ref(value) {
    return new RefImpl(value)
}

export function isRef(ref) {
    return !!ref.__v_isRef
}


export function unRef(ref) {
    return isRef(ref) ? ref.value : ref;
}

export function proxyRefs(objRefs) {
    //ref 返回访问的value
    //非ref 返回本身
    return new Proxy(objRefs, {
        get(target, key) {
            return unRef(Reflect.get(target, key))
        },
        set(target, key, value) {
            if (isRef(target[key]) && !isRef(value)) {
                return (target[key].value = value)
            } else {
                return unRef(Reflect.set(target, key, value))
            }

        }
    })
}