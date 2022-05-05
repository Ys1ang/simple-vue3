export const App = {
    //sfc
    //template
    //render
    render() {
        return h('div', 'hi ' + this.msg)
    },

    setup() {
        //组合 api
        return {
            'msg': 'simple Vue'
        }
    }
}