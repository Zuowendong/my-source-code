export function observer(data) {
	// console.log(data);
	if (typeof data != "object" || data == null) return data;
	// 对象
	return new Observer(data);
}

// vue2 对 对象 劫持 使用 Object.defineProperty  -> 缺点: 只能对 对象中一个属性 进行劫持

class Observer {
	constructor(value) {
		this.walk(value); // 遍历 对 对象一层中每个属性劫持
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
}

// 对 对象中的属性 进行劫持
function defineReactive(data, key, value) {
	observer(value); // 深度代理 -> 递归处理当前属性的值 (如果还是个对象的话) -> {name: 'jack'}
	Object.defineProperty(data, key, {
		get() {
			console.log("获取");
			return value;
		},
		set(newValue) {
			console.log("设置");
			if (newValue === value) return;
			observer(newValue); // 处理 对象赋的 新值不响应 问题  -> vm._data.info = { name: "tom" } name属性不响应
			value = newValue;
		},
	});
}
