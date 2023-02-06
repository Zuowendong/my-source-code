class Dep {
	constructor() {
		this.subs = [];
	}
	// 收集watcher (收集依赖，在视图上用了几次都要收集起来)
	depend() {
		this.subs.push(Dep.target);
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
