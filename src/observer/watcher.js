import { pushTarget, popTarget } from "./dep";

let id = 0;
class Watcher {
	constructor(vm, updateComponent, cb, options) {
		this.vm = vm;
		this.exprOrfn = updateComponent;
		this.cb = cb;
		this.options = options;
		this.id = id++; // 标识 每个组件 都只有一个watcher
		this.deps = []; // watcher存放dep
		this.depsId = new Set();

		if (typeof updateComponent === "function") {
			this.getter = updateComponent;
		}
		// 更新视图
		this.get();
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

	// 初次渲染 (更新 插值表达式)
	get() {
		pushTarget(this); // 给 dep 添加 watcher
		this.getter(); // 渲染页面
		popTarget(); // 给 dep 取消 watcher
	}
	// 更新数据
	update() {
		// 不要数据更新之后 每次都调用get  ->  缓存
		// this.get(); // 重新渲染
		queueWatcher(this);
	}

	run() {
		this.get();
	}
}

let queue = []; // 将需要批量更新的 watcher 存放到 队列中
let has = {};
let pending = false;
function queueWatcher(watcher) {
	let id = watcher.id; // 每个组件都是同一个 watcher
	// console.log(id);
	// 去重
	if (!has[id]) {
		queue.push(watcher);
		console.log(queue);
		has[id] = true;

		// 防抖，用户触发多次，只执行一次
		if (!pending) {
			// 异步， 等待同步代码执行完成之后 再来执行
			setTimeout(() => {
				queue.forEach((item) => item.run());
				queue = [];
				has = {};
				pending = false;
			});
		}
		pending = true;
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
