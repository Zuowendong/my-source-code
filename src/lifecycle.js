import { patch } from "./vnode/patch";
import Watcher from "./observer/watcher";

export function mountComponent(vm, el) {
	// console.log(vm, el);
	callHook(vm, "beforeMount"); // 页面加载之前调用
	// vm._update(vm._render());

	let updateComponent = () => {
		vm._update(vm._render());
	};
	new Watcher(vm, updateComponent, () => {}, true);

	callHook(vm, "mounted"); // 页面加载之后调用
	/**
	 * 源码
	 * vm._update(vm._render())
	 * 1. vm._render 将 render函数变成vnode
	 * 2. vm._update 将vnode变成真实dom放到页面上
	 */
}

export function lifecycleMixin(Vue) {
	// 2
	Vue.prototype._update = function (vnode) {
		// console.log(vnode);
		let vm = this;
		vm.$el = patch(vm.$el, vnode);
		// console.log(vm);
	};
}

// 生命周期的调用
export function callHook(vm, hook) {
	const handlers = vm.$options[hook];
	if (handlers) {
		for (let i = 0; i < handlers.length; i++) {
			handlers[i].call(this); // 改变生命周期中的this指向问题
		}
	}
}
