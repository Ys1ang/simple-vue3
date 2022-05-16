export function  emit(instance,event,...args){
    console.log('emit',event);
    const {props} = instance;

    //TPP
    //特定实现=》抽象通用行为
    // const handler = props['onAdd'];
    // handler&& handler();


    const camelize = str =>{
       return   str.replace(/-(\w)/g,(_,c)=>{
            return c ? c.toUpperCase() : ''
        })
    }


    const capitalize = str=>{
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const  toHandlerKey = str=>{
        return str ? "on"+ capitalize(str): '';
    }



    const hanlerName = toHandlerKey(camelize(event));
    const handler = props[hanlerName];
    handler&& handler(...args);

}