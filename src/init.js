import { initState } from "./initState";
import { compileToFunction } from "./compiler/index";
import { mountComponent } from "./lifecycle";

export function initMixin(Vue) {
	Vue.prototype._init = function (options) {
		// console.log("vue", options);
		let vm = this; // vue实例
		vm.$options = options; // 挂载options方便后续使用
		// 初始化状态
		initState(vm);

		// 渲染模板
		if (vm.$options.el) {
			vm.$mount(vm.$options.el);
		}
	};

	/**
	 * vue初次渲染过程  -> 先初始化数据  -> 将模板进行编译  ->  变成render()  ->  生辰虚拟节点vnode  ->  变成真实的dom  ->  放在页面上
	 *
	 * vue模板编译的方式 render  template  el  (注意： 必须有el才能挂载app)
	 * 优先级 render > template > el
	 */

	Vue.prototype.$mount = function (el) {
		// el < template < render
		let vm = this;
		el = document.querySelector(el);
		if (!vm.$options.render) {
			// 不存在render
			if (!vm.$options.template && el) {
				// 不存在template, 获取el outerHtml
				el = el.outerHTML; // <div id="app">{{ msg }} Vue</div>

				// 编译成 ast 语法树 -> render()
				let render = compileToFunction(el);
				// console.log(render);
				// 1. 将render() 变成 vnode  2. vnode 变成 真实dom 放到页面上
				vm.$options.render = render;
			}
		}
		// 挂载组件
		mountComponent(vm, el);
	};
}
