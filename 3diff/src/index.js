import h from "./dom/h";

let vnode1 = h("div", {}, "你好");

console.log(vnode1);

let vnode2 = h("ul", {}, [h("li", {}, "a"), h("li", {}, "b"), h("li", {}, "c")]);

console.log(vnode2);
