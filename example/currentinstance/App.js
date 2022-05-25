import {getCurrentInstance, h} from "../../lib/simple-vue.esm.js";
import {Foo} from "./foo.js";

window.self = null;

export const App = {
    name: 'App',
    setup() {
        //组合 api
        const instance = getCurrentInstance()
        console.log('foo', instance)
        return {}
    },
    render() {
        return h('div', {}, [h('p', {}, 'currentInstance demo'), h(Foo)])
    },

}