import { observer } from "./observer/index";
import { nextTick } from "./utils/nextTick";
import Watcher from "./observer/watcher";

export function initState(vm) {
	let opts = vm.$options;
	// console.log(opts);
	// 各配置项初始化
	if (opts.props) {
		initProps(vm);
	}
	if (opts.data) {
		initData(vm);
	}
	if (opts.watch) {
		initWatch(vm);
	}
	if (opts.computed) {
		initComputed(vm);
	}
	if (opts.methods) {
		initMethods(vm);
	}
}

function initProps() {}

function initWatch(vm) {
	let watch = vm.$options.watch;
	// console.log(watch);
	// watch 是个对象，多个进行遍历
	for (const key in watch) {
		let handler = watch[key]; // 多种情况 (watch 的4种基本使用方式) ->  数组，对象，字符，函数
		// console.log(handler);
		if (Array.isArray(handler)) {
			handler.forEach((item) => createWatcher(vm, key, item));
		} else {
			createWatcher(vm, key, handler);
		}
	}
}

// vm.$watch(() => {return 'a'})
/**
 *
 * @param {实例} vm
 * @param {key或者表达式} exprOrfn
 * @param {值} handler
 * @param {自定义配置，标识} options
 */
function createWatcher(vm, exprOrfn, handler, options) {
	// console.log(handler);
	// 处理handler多种类型
	if (typeof handler === "object") {
		options = handler; // 用户配置项
		handler = handler.handler;
	}
	if (typeof handler === "string") {
		handler = vm[handler]; // 将实例上的方法作为handler
	}
	// 函数
	return vm.$watch(exprOrfn, handler, options);
}

function initComputed() {}
function initMethods() {}

// 对 vue2 data 进行初始化
function initData(vm) {
	// console.log("data初始化", vm); // data两种类型情况 : 1.对象 2.函数(执行函数返回对象)
	let data = vm.$options.data;
	data = vm._data = typeof data === "function" ? data.call(vm) : data; // this指向问题  -> 指向vm实例

	// 将data中所有属性代理到实例上
	for (const key in data) {
		proxy(vm, "_data", key);
	}

	// 对data数据进行劫持
	observer(data);
}

function proxy(vm, source, key) {
	Object.defineProperty(vm, key, {
		get() {
			return vm[source][key];
		},
		set(newValue) {
			vm[source][key] = newValue;
		},
	});
}

export function stateMixin(Vue) {
	Vue.prototype.$nextTick = function (cb) {
		nextTick(cb);
	};

	// 创建$watch
	Vue.prototype.$watch = function (exprOrfn, handler, options = {}) {
		// console.log(exprOrfn, handler, options);
		// watch 核心 watcher
		// console.log(this); // vm 实例
		let watcher = new Watcher(this, exprOrfn, handler, { ...options, user: true });
		// console.log(watcher);
		if (options.immediate) {
			handler.call(this); // immediate立即执行
		}
	};
}
