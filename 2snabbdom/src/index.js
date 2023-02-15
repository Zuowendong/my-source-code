import { init, classModule, propsModule, styleModule, eventListenersModule, h } from "snabbdom";

const patch = init([
	// Init patch function with chosen modules
	classModule, // makes it easy to toggle classes
	propsModule, // for setting properties on DOM elements
	styleModule, // handles styling on elements with support for animations
	eventListenersModule, // attaches event listeners
]);

const container = document.getElementById("container");
const btn = document.getElementById("btn");

const vnode1 = h("h1", {}, "新节点");
patch(container, vnode1);

btn.onclick = function () {
	const vnode2 = h("ul", {}, [h("li", {}, "a"), h("li", {}, "b"), h("li", {}, "c")]);
	console.log(vnode2);

	patch(vnode1, vnode2);
};
