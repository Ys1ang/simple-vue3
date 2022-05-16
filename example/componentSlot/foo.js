import {h,renderSlots} from "../../lib/simple-vue.esm.js";

export const Foo = {
    setup(props) {
     return{}
    },
    render() {
        const foo = h('p',{},'foo');

        console.log(this.$slots)
        return h('div', {}, [renderSlots(this.$slots,'header',{age:100}),foo,renderSlots(this.$slots,'footer')]);
    }
}