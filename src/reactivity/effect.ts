class ReactiveEffect{
   private readonly _fn: any;
    constructor(fn) {
        this._fn =fn;
    }
    run(){
        activeEffect = this;
        this._fn();
    }

}


const targetMap = new Map();
export function track(target,key){
     // 收集effect
    let  depsMap = targetMap.get(target);

    //如果不存在 depsMap ，生成一个新的map在target中注册
    if (!depsMap){
        depsMap = new Map();
        targetMap.set(target,depsMap)
    }

    let dep = depsMap.get(key);
    if(!dep){
        dep = new Set();
        depsMap.set(key,dep)
    }
    // let  dep  = new Set();
    dep.add(activeEffect);
}

export  function trigger (target,key){
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    for (const effect of dep){
        effect.run()
    }
}



let activeEffect ;

export function effect(fn){
    const  _effect =  new ReactiveEffect(fn)
    _effect.run();
}
