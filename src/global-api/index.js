import { mergeOptions } from "../utils/index";

export function initGlobalApi(Vue) {
	// 源码  Vue.options = {created: [a,b,c], watch: [a,b,c]}

	Vue.options = {};
	Vue.Mixin = function (mixin) {
		// console.log(mixin);
		this.options = mergeOptions(this.options, mixin); // this: vue实例
		// console.log(Vue.options);
	};
}
