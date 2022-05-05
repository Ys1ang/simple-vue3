import {createVNode} from "./vNode";
import {render} from "./render";

export function createApp(rootCpt) {
    return {
        mount(rootContainer) {
            //组件转vnode
            //之后行为都会围绕vnode处理
            const vnode = createVNode(rootCpt);
            render(vnode, rootContainer);
        }
    }
}



