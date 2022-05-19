import { Fragment,Text} from "./vNode";
import {createComponentInstance, setupComponent} from "./component";
import {ShapeFlags} from "../shared/ShapeFlags";
import { createAppAPI} from "./createApp";
import {effect} from "../reactivity/effect";

export  function createRender(options){
    const  {createElement,patchProps,insert}=options;
     function render(vnode, container,parentComponent=null) {
        patch(null,vnode, container,parentComponent)
    }
    //n1:old Vnode
    //n2:new Vnode
    function patch(n1,n2, container,parentComponent) {
        //处理组件 || 处理element
        //type === strinng => string
        //type === object => element

        const  {type, shapeFlag} = n2;

        switch (type){
            case Fragment:
                processFragment(n1,n2,container,parentComponent);
                break
            case Text:
                processText(n1,n2,container);
                break
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(n1,n2, container,parentComponent)
                } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                    processComponent(n1,n2, container,parentComponent)
                }
        }
    }


function processText(n1,n2, container) {
    const {children} = n2;
    const  textNode = document.createTextNode(children);
    console.log('processText')
    container.append(textNode);
}


function setupRenderEffect(instance: any, initVnode, container) {
  effect(()=>{

      if(!instance.isMounted){
          const {proxy} = instance;
          const subTree =  (instance.sunTree = instance.render.call(proxy));
          patch(null,subTree, container,instance)
          initVnode.el = subTree.el;
          instance.isMounted = true;
      }else{
          console.log('update');
          const {proxy} = instance;
          const subTree = instance.render.call(proxy);

          const prevSubTree = instance.sunTree;
          instance.subTree =  subTree;
          patch(prevSubTree,subTree, container,instance)

          //
          // console.log('subTree')
          // console.log(subTree)
          // console.log('prevSubTree')
          // console.log(prevSubTree)

      }

  })
}

function mountComponent(initVnode: any, container: any,parentComponent:any) {
    const instance = createComponentInstance(initVnode,parentComponent)
    setupComponent(instance);
    setupRenderEffect(instance, initVnode, container);
}

function processComponent(n1,n2: any, container: any,parentComponent) {
    mountComponent(n2, container,parentComponent)
}

function mountChildren(vnode, el,parentComponent) {
    vnode.children.forEach(v => {
        patch(null,v, el,parentComponent)
    })
}

function mountElement(vnode: any, container: any,parentComponent) {
    //插入child需要判断是不是string或者是array
    const {children, props, shapeFlag} = vnode;
    const el = createElement(vnode.type)
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(vnode, el,parentComponent)
    }
    for (const key in props) {
     const val = props[key];
        patchProps(el,key,val)
    }
    insert(el,container)
}

function processElement(n1,n2, container: any,parentComponent) {

    if(!n1){
        mountElement(n2,container,parentComponent)
    }else{
        patchElement(n1,n2,container)
    }
}

function patchElement(n1,n2,container) {
    console.log('pathEle')
    console.log(n1)
    console.log(n2)
    //dff算法更新props children
}

function processFragment(n1,n2: any, container: any,parentComponent) {
    mountChildren(n2,container,parentComponent)
}


return {
         createApp:createAppAPI(render)
}
}
