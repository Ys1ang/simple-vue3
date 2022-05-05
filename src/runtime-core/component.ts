import {PublicInstanceProxyHandlers} from "./componentPublicInstance";

export function createComponentInstance(vnode: any) {
    const component = {vnode, type: vnode.type, setupState: {}};
    return component;
}

function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
    // if (Component.render) {
    //
    // }
}

function handleSetupResult(instance, setupResult: any) {

    //
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }


    finishComponentSetup(instance)

}

function setupStateFulComponent(instance: any) {
    const Component = instance.type;
    instance.proxy = new Proxy({_: instance}, PublicInstanceProxyHandlers)


    const {setup} = Component;

    if (setup) {
        const setupResult = setup();

        handleSetupResult(instance, setupResult)
    }
}

export function setupComponent(instance: any) {

    // initProps();
    // initslots();


    setupStateFulComponent(instance);

}
