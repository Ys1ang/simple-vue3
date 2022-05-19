import {h,ref} from "../../lib/simple-vue.esm.js";


export const App = {
    name:'App',
    setup(){
        const count = ref(0);
        const onClick = ()=>{
            count.value++
            console.log('click')
        }

        return {
            count,
            onClick
        }
    },
    render(){
        return h('div',{id:'root'},[h('button',{
            onClick:this.onClick,
        },'click'),
        h('div',{},'count'+this.count)
        ])
    }
}