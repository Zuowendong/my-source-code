import { observer } from "./observer/index";

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
function initWatch() {}
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
