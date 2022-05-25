import {h, ref} from "../../lib/simple-vue.esm.js";

const nextChildren = 'newChildren';
const prevChildren = 'oldChildren';

export default {
    setup: function () {
        const isChange = ref(false);
        window.isChange = isChange;

        return {isChange}

    },
    render() {
        const self = this;

        return self.isChange === true ? h('div', {}, nextChildren) : h('div', {}, prevChildren)
    },
}