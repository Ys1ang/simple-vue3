import {h, inject, provide} from "../../lib/simple-vue.esm.js";

const Provider = {
    name: 'provider',
    setup() {
        provide('foo', 'fooVal');
        provide('bar', 'barVal');
    },
    render() {
        return h('div', {}, [h('p', {}, 'provider'), h(ProviderTwo)])
    }
};

const ProviderTwo = {
    name: 'ProviderTwo',
    setup() {
        provide('foo', 'fooTwo');
        const foo = inject('foo');
        return {foo}
    },
    render() {
        return h('div', {}, [h('p', {}, 'ProviderTwo' + this.foo), h(Consumer)])
    }
};

const Consumer = {
    name: 'Consumer',
    setup() {
        const foo = inject('foo');
        const bar = inject('bar');
        const baz = inject('baz', 'baz-default');
        return {
            foo,
            bar,
            baz
        }
    },

    render() {
        return h('div', {}, `Cusumer:- ${this.foo} - ${this.bar} - ${this.baz}`);
    }
}

export const App = {
    name: 'App',
    setup() {
    },
    render() {
        return h('div', {}, [h('p', {}, 'apiInject'), h(Provider)])
    }
}