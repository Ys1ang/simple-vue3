import {h} from "../../lib/simple-vue.esm.js";
import {Foo} from "./foo.js";

window.self = null;

export const App = {
    name: 'App',
    render() {
        return h("div", {}, [h("div", {}, 'App'), h(Foo, {
            onAdd(a, b) {
                console.log('onAdd')
                console.log('a', a)
                console.log('b', b)
            },
            onAddFoo() {
                console.log('AddFoo')
            }
        })])
    },
    setup() {
        //组合 api
        return {
            'msg': 'simple Vue'
        }
    }
}