import Dep from "./Dep";

// let effectCB = null;

export function watchEffect(callback) {
	Dep.effectCB = callback;
	callback();
	Dep.effectCB = null;
}

export function watch(depFn, callback) {
	Dep.effectCB = callback;
	depFn();
	Dep.effectCB = null;
}
