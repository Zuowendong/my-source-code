let dep = 0;
class Dep {
	constructor() {
		let id = dep++;
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
