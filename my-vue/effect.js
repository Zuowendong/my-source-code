import Dep from "./Dep";

// let effectCB = null;

export function watchEffect(callback) {
	Dep.effectCB = callback;
	callback();
	Dep.effectCB = null;
}
