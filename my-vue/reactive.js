/**
 * Objecct.defineProperty -> 给一个对象设置可配置的属性
 * 给属性设置getter, setter函数
 */

/**
 * proxy 容器  ->  data
 * proxy.a = 100 set -> data.a
 */

import Dep from "./Dep";

const dep = new Dep();

export function reactive(data) {
	return new Proxy(data, {
		get(target, key) {
			const value = Reflect.get(target, key); // target[key]
			// collect
			dep.collect(target, key);
			return value !== null && typeof value === "object" ? reactive(value) : value;
		},
		set(target, key, value) {
			const res = Reflect.set(target, key, value);
			// notify
			dep.notify(target, key);
			return res;
		},
	});
}
