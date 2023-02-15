import h from "./dom/h";
import patch from "./dom/patch";

// 真实dom
let container = document.getElementById("container");

// 虚拟节点
let vnode1 = h("span", {}, "你好");
let vnode2 = h("ul", {}, [h("li", {}, "a"), h("li", {}, "b"), h("li", {}, "c")]);
patch(container, vnode2);
