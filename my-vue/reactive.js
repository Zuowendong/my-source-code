/**
 * Objecct.defineProperty -> 给一个对象设置可配置的属性
 * 给属性设置getter, setter函数
 */

/**
 * proxy 容器  ->  data
 * proxy.a = 100 set -> data.a
 */

export function reactive(data) {
	return new Proxy(data, {
		get(target, key) {
			const value = Reflect.get(target, key); // target[key]
			return value !== null && typeof value === "object" ? reactive(value) : value;
		},
		set(target, key, value) {
			console.log(value);
			return Reflect.set(target, key, value);
		},
	});
}
