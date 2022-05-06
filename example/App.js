import {h} from "../lib/simple-vue.esm.js";
import {Foo} from "./foo.js";

window.self = null;

export const App = {
    //sfc
    //template
    //render
    render() {
        window.self = this;
        // return h('div', {
        //         id: 'root',
        //         class: ["red", "hard"]
        //     },
        //     // 'hi ' + this.msg
        //     'hi JOJO'
        // )

        return h('div', {
                id: 'root',
                class: ["red hard"],
                //on+event
                onClick() {
                    console.log('click')
                },
                onMousedown() {
                    console.log('click')
                }
            },
            [
                h('div', {}, 'hi,' + this.msg),
                h(Foo, {count: 1}, 'hi,' + this.count),
            ]


            // 'hi ' + this.msg
            // [
            //     h('p', {class: 'blue'}, [
            //         h('p', {class: 'blue'}, 'asd'),
            //         h('p', {class: 'blue'}, '1asd')
            //     ]),
            //     h('p', {class: 'blue'}, 'simple-vue2')
            // ]
        )
    },

    setup() {
        //组合 api
        return {
            'msg': 'simple Vue'
        }
    }
}