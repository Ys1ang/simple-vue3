import {h, ref} from "../../lib/simple-vue.esm.js";


export const App = {
    name:'App',
    setup(){
        const count = ref(0);
        const onClick = ()=>{
            count.value++
        }

        return {
            count,
            onClick
        }
    },
    render(){
        return h('div',{id:'root'},[h('button',{},'apiInject'),h(Provider)])
    }
}