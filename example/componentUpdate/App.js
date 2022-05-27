// 在 render 中使用 proxy 调用 emit 函数
// 也可以直接使用 this
// 验证 proxy 的实现逻辑
import {h, ref} from "../../lib/simple-vue.esm.js";
import Child from "./Child.js";

export default {
    name: "App",
    setup() {
        const msg = ref("123");
        const count = ref('0');
        window.msg = msg

        const changeChildProps = () => {
            msg.value = "456";
        };
        const changeCount = () => {
            count.value++;
        }

        return {msg, count, changeCount, changeChildProps};
    },

    render() {
        return h("div", {}, [
            h("div", {}, "你好"),
            h(
                "button",
                {
                    onClick: this.changeChildProps,
                },
                "change child props"
            ),
            h(
                "button",
                {
                    onClick: this.changeCount,
                },
                "change Count props" + this.count
            ),
            h(Child, {
                msg: this.msg,
                count: this.count
            }),

        ]);
    },
};
