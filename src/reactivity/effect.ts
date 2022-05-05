import {extend} from "../shared";

let activeEffect;
let shouldTrack;

export class ReactiveEffect {
    deps = [];
    active = true;
    onStop?: () => void;
    private readonly _fn: any;

    constructor(fn, public scheduler?) {
        this._fn = fn;
    }

    run() {
        if (!this.active) {
            this._fn();
        }
        activeEffect = this;
        shouldTrack = true;
        // 1.当同时出发get and set操作的时候， 需要判断是否有需要触发track，通过开关参数进行控制。
        let result = this._fn();
        shouldTrack = false;
        return result

    }

    stop() {
        if (this.active) {
            cleanupEffect(this);
            this.active = false;
            if (this.onStop) {
                this.onStop();
            }
        }

    }


}

function cleanupEffect(effect) {
    effect.deps.forEach((dep: any) => {
        dep.delete(effect);
    })
    effect.deps.length = 0;
}


const targetMap = new Map();

export function track(target, key) {
    if (!istracking()) return;
    // 收集effect
    let depsMap = targetMap.get(target);

    //如果不存在 depsMap ，生成一个新的map在target中注册
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap)
    }

    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep)
    }
    // let  dep  = new Set();

    trackEffects(dep)
}


export function trackEffects(dep) {
    if (dep.has(activeEffect)) return;
    dep.add(activeEffect);
    activeEffect.deps.push(dep)
}

export function istracking() {
    return shouldTrack && activeEffect !== undefined;
}

export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    triggerEffects(dep)
}

export function triggerEffects(dep) {
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler()
        } else {
            effect.run()
        }
    }
}


export function effect(fn, options: any = {}) {
    const _effect = new ReactiveEffect(fn, options.scheduler)
    extend(_effect, options)
    _effect.run();
    const runner: any = _effect.run.bind(_effect);
    runner.effect = _effect
    return runner
}

export function stop(runner) {
    runner.effect.stop()
}

