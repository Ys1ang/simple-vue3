const publicProptiesMap = {
    $el: (i) =>
        i.vnode.el,
}


export const PublicInstanceProxyHandlers = {
    get({_: instance}, key) {
        let {setupState} = instance;
        if (key in setupState) {
            return setupState[key]
        }
        const publicGetter = publicProptiesMap[key];
        if (publicGetter) {
            return publicGetter(instance)
        }

    },
}