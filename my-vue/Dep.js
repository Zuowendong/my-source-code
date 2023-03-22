export default class Dep {
	constructor() {
		this.effectMap = new WeakMap();
	}

	static effectCB = null;

	collect(target, key) {
		const { effectCB } = Dep;
		if (effectCB) {
			let depMap = this.effectMap.get(target);
			if (!depMap) {
				depMap = new Map();
				this.effectMap.set(target, depMap);
			}
			let deps = depMap.get(key);
			if (!deps) {
				deps = new Set();
				depMap.set(key, deps);
			}
			deps.add(effectCB);
		}
	}

	notify(target, key) {
		const depMap = this.effectMap.get(target);
		if (!depMap) return;
		const deps = depMap.get(key);
		deps.forEach((dep) => {
			dep();
		});
	}
}

/**
 * WeakMap {
 *  data: Map {
 *    a: Set [cb,cb],
 *    {c:1}: Set [cb, cb]
 *  }
 * }
 */
