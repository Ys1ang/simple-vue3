import {track, trigger} from "./effect";


function createdGetter(isReadonly=false){
   return function  (target, key) {
       const res = Reflect.get(target, key)
       if(!isReadonly){
           track(target, key);
       }
       return res
   }
}

export function reactive(raw) {
    return new Proxy(raw, {
        get: createdGetter(),
        set(target, key, value) {
            const res = Reflect.set(target, key, value);
            //TODO
            // 触发依赖 done
            trigger(target, key)
            return res
        }
    })
}


export function readonly(raw){
    return new Proxy(raw, {
        get: createdGetter(true),
        set(target, key, value) {
          return true;
        }
    })

}