import {hasOwn} from "../shared";

const publicProptiesMap = {
    $el: (i) =>
        i.vnode.el,
    $slots: (i) => i.slots
}

export const PublicInstanceProxyHandlers = {
    get({_: instance}, key) {
        let {setupState, props} = instance;

        if (hasOwn(setupState, key)) {
            return setupState[key]
        } else if (hasOwn(props, key)) {
            return props[key]
        }

        const publicGetter = publicProptiesMap[key];
        if (publicGetter) {
            return publicGetter(instance)
        }

    },
}