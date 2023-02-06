/**
 * 一 自动更新视图
 * 1. 数据变化自动更新视图 vm._update(vm._render())
 * 2. vue 中更新组件策略： 以组件为单位，给每个组件添加一个watcher, 属性变化后调用这个watcher
 *
 * 二 对象的收集依赖
 *
 * dep 和 watcher 多对多的关系  -> computed 缓存
 *
 * 三 数组的收集依赖
 * 实现思路
 * 1. 给所有对象类型增加一个dep （数组 也是 对象类型）
 * 2. 获取数组值，会调用get方法，让当前数组获取这个渲染的watcher
 * 		2.1 需要获取当前dep
 * 		2.2 当前面对数组取值时，让数组的dep记住这个watcher
 * 3. 更新数组时，即触发push等这些重写的数组方法时，找到这个watcher进行更新
 */

let dep = 0;
class Dep {
	constructor() {
		this.id = dep++;
		this.subs = [];
	}
	// 收集watcher (收集依赖，在视图上用了几次都要收集起来)
	depend() {
		// this.subs.push(Dep.target);

		// watcher可以存放dep  -> 双向记忆
		Dep.target.addDep(this); // Dep.target === watcher
	}
	addSub(watcher) {
		this.subs.push(watcher);
	}
	// 更新
	notify() {
		this.subs.forEach((watcher) => {
			watcher.update();
		});
	}
}

Dep.target = null;
// 添加watcher
export function pushTarget(watcher) {
	Dep.target = watcher;
}
// 移除watcher
export function popTarget() {
	Dep.target = null;
}

export default Dep;
