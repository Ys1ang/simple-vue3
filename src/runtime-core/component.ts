import {PublicInstanceProxyHandlers} from "./componentPublicInstance";
import {initProps} from "./componentProps";
import {shallowReadonly} from "../reactivity/reactive";
import {emit} from "./componentEmit";
import {initSlots} from "./componentSlots";

export function createComponentInstance(vnode: any) {
    const component = {vnode, type: vnode.type, setupState: {}, props: {},emit:()=>{},slots:()=>{}};
    component.emit = emit.bind(null,component) as any
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
        const setupResult = setup(shallowReadonly(instance.props),{emit:instance.emit});

        handleSetupResult(instance, setupResult)
    }
}

export function setupComponent(instance: any) {
    initProps(instance, instance.vnode.props);
    initSlots(instance,instance.vnode.children);
    setupStateFulComponent(instance);

}
