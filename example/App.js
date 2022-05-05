import {h} from "../lib/simple-vue.esm.js";

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
                class: ["red", "hard"]
            },
            'hi ' + this.msg
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