import { update } from "./render";
const reg_var = /\{\{(.+?)\}\}/;

export function ref(defaultValue) {
	const refWrapper = {
		deps: new Set(),
		_value: defaultValue,
		_defaultValue: defaultValue,
	};

	Object.defineProperty(refWrapper, "value", {
		get() {
			return refWrapper._value;
		},
		set(newValue) {
			refWrapper._value = newValue;
			//update
			update(refWrapper);
		},
	});
	return refWrapper;
}

export function createRefs(refs, nodes) {
	nodes.forEach((el) => {
		if (reg_var.test(el.textContent)) {
			// 依赖收集
			// console.log(el.textContent.match(reg_var)); // ['{{ title }}', ' title ', index: 0, input: '{{ title }}', groups: undefined]
			const refKey = el.textContent.match(reg_var)[1].trim();
			refs[refKey].deps.add(el);
		}
	});
	return refs;
}
