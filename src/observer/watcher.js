import { pushTarget, popTarget } from "../dep";

let id = 0;
class Watcher {
	constructor(vm, updateComponent, cb, options) {
		this.vm = vm;
		this.exprOrfn = updateComponent;
		this.cb = cb;
		this.options = options;
		this.id = id++;
		this.deps = []; // watcher存放dep
		this.depsId = new Set();

		if (typeof updateComponent === "function") {
			this.getter = updateComponent;
		}
		// 更新视图
		this.get();
	}
	// 初次渲染 (更新 插值表达式)
	get() {
		pushTarget(this); // 给 dep 添加 watcher
		this.getter(); // 渲染页面
		popTarget(); // 给 dep 取消 watcher
	}
	// 更新
	update() {
		this.getter();
	}
	addDep(dep) {
		// 去重 -> 存过的不能再存
		let id = dep.id;
		if (!this.depsId.has(id)) {
			this.deps.push(dep);
			this.depsId.add(id);
			dep.addSub(this); // 双向记忆，dep里存放了watcher,watcher里存放了dep
		}
	}
}

export default Watcher;

/**
 * 收集依赖 dep watcher data: {msg}
 * dep: dep和data中属性 是一一对应的
 * watcher: 在视图上data用了几个, 就有几个watcher
 *
 * dep 和 watcher 的关系
 *  一  对 多 的关系  dep.msg = [watcher1, watcher2]
 */
