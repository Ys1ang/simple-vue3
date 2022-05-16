import {createTextVNode, h, renderSlots,getCurrentInstance} from "../../lib/simple-vue.esm.js";

export const Foo = {
    setup(props) {

        const instance = getCurrentInstance()
        console.log('foo',instance)
     return{}
    },
    render() {
        const foo = h('p',{},'foo');

        return h('div', {}, [
            foo
            ]);
    }
}