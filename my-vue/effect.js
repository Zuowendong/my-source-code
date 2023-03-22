import ComputedRef from "./ComputedRef";
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

export function computed(callback) {
	Dep.effectCB = callback;
	const value = callback();
	const computedRef = new ComputedRef(value);

	Object.defineProperty(callback, "computedRef", {
		value: computedRef,
	});

	Dep.effectCB = null;
	return computedRef;
}
