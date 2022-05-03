import {extend} from "../shared";

class ReactiveEffect {
    deps = [];
    active = true;
    onStop?: () => void;
    private readonly _fn: any;

    constructor(fn, public scheduler?) {
        this._fn = fn;
    }

    run() {
        activeEffect = this;
        this._fn();
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
}


const targetMap = new Map();

export function track(target, key) {
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
    if (!activeEffect) return;
    dep.add(activeEffect);
    activeEffect.deps.push(dep)
}

export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler()
        } else {
            effect.run()
        }
    }
}


let activeEffect;

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

