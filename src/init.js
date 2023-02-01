import { initState } from "./initState";

export function initMixin(Vue) {
	Vue.prototype._init = function (options) {
		// console.log("vue", options);
		let vm = this; // vue实例
		vm.$options = options; // 挂载options方便后续使用
		// 初始化状态
		initState(vm);
	};
}
