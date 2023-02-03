export function mountComponent(vm, el) {
	console.log(vm, el);
	vm._update(vm._render());
	/**
	 * 源码
	 * vm._update(vm._render())
	 * 1. vm._render 将 render函数变成vnode
	 * 2. vm._update 将vnode变成真实dom放到页面上
	 */
}

export function lifecycleMixin(Vue) {
	Vue.prototype._update = function (vnode) {};
}
