import {h, ref} from "../../lib/simple-vue.esm.js";


export const App = {
    name: 'App',
    setup() {
        const count = ref(0);
        const onClick = () => {
            count.value++
            console.log('click')
        }
        const props = ref({
            foo: "foo",
            bar: 'bar',
        })
        const onChangePropsDemo1 = () => {
            props.value.foo = 'new-foo';
        }

        const onChangePropsDemo2 = () => {
            props.value.foo = undefined;
        }
        const onChangePropsDemo3 = () => {
            props.value = {
                foo: 'foo',
            }
        }

        return {
            count,
            onClick,
            props,
            onChangePropsDemo1,
            onChangePropsDemo2,
            onChangePropsDemo3,
        }
    },
    render() {
        return h('div', {id: 'root', ...this.props}, [
            h('button', {
                onClick: this.onClick,
            }, 'click'),
            h('div', {}, 'count' + this.count),
            h('button', {
                onClick: this.onChangePropsDemo1,
            }, 'onChangePropsDemo1'),
            h('div', {}, 'onChangePropsDemo1' + this.count),
            h('button', {
                onClick: this.onChangePropsDemo2,
            }, 'onChangePropsDemo2'),
            h('div', {}, 'onChangePropsDemo2' + this.count),
            h('button', {
                onClick: this.onChangePropsDemo3,
            }, 'onChangePropsDemo3'),
            h('div', {}, 'onChangePropsDemo3' + this.count)
        ])
    }
}