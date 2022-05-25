import {h} from "../../lib/simple-vue.esm.js";
import patchChildren from "./PatchChildren.js";

;

export default {
    name: "App",
    setup() {
    },

    render() {
        return h("div", {tId: 1}, [h("p", {}, "主页"),
            // h(ArrayToText),
            h(patchChildren),
        ]);
    },
};



