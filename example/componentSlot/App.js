import {h} from "../../lib/simple-vue.esm.js";
import {Foo} from "./foo.js";

window.self = null;

export const App = {
    name:'App',
    render() {
       const app = h('div',{},'App');
       //字符串
       // const foo = h(Foo,{},h('p',{},'12311'));
      //多子节点
      //   const foo = h(Foo,{},[h('p',{},'12311'),h('p',{},'123222')]);
      // 对象化
        const foo = h(Foo,{},{
            header:({age})=>{
              return    h('p',{},'header'+age)
            },
            footer:()=>h('p',{},'footer')
        });
        return  h('div',{},[app,foo]);
    },
    setup() {
        //组合 api
        return {
            'msg': 'simple Vue'
        }
    }
}