import { ArrayMethods } from "./array";

export function observer(data) {
	// console.log(data);
	if (typeof data != "object" || data == null) return data;
	// 对象
	return new Observer(data);
}

// vue2 对 对象 劫持 使用 Object.defineProperty  -> 缺点: 只能对 对象中一个属性 进行劫持

class Observer {
	constructor(value) {
		// 给每个对象添加一个 __ob__ 属性
		Object.defineProperty(value, "__ob__", {
			enumerable: false, //不可枚举,
			value: this, // Observer 实例  -> 可以拿到它的observerArray方法
		});

		// 判断数据 是 对象 还是 数组类型
		if (Array.isArray(value)) {
			// console.log("数组"); // list: [1,2,3,4]
			value.__proto__ = ArrayMethods;
			// 对象数组情况  -> [{ name: "jack" }, { name: "tom" }], name 未劫持
			this.observerArray(value); // 处理 数组中对象 劫持
		} else {
			// 对象
			this.walk(value); // 遍历 对 对象一层中每个属性劫持
		}
	}
	walk(data) {
		// { msg: 'Hello', info: {name: 'jack'}}
		let keys = Object.keys(data);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i]; // msg
			const value = data[key]; // Hello
			defineReactive(data, key, value);
		}
	}
	observerArray(value) {
		for (let i = 0; i < value.length; i++) {
			observer(value[i]);
		}
	}
}

// 对 对象中的属性 进行劫持
function defineReactive(data, key, value) {
	observer(value); // 深度代理 -> 递归处理当前属性的值 (如果还是个对象的话) -> {name: 'jack'}
	Object.defineProperty(data, key, {
		get() {
			// console.log("获取");
			return value;
		},
		set(newValue) {
			// console.log("设置");
			if (newValue === value) return;
			observer(newValue); // 处理 对象赋的 新值不响应 问题  -> vm._data.info = { name: "tom" } name属性不响应
			value = newValue;
		},
	});
}

/**
 * 总结 对象
 * 1. Object.defineProperty 有缺点: 只能对对象中一个属性进行劫持
 * 2. 遍历 data 中每个属性
 * 3. 递归 get set
 */

/**
 * 数组 [1,2,3,4]  [{name: 'jack'}, {name: 'tom'}]
 * 函数劫持, 重写数组方法
 */
