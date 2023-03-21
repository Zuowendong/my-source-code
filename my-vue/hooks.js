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
		Set(newValue) {
			refWrapper._value = newValue;
			//update
		},
	});

	console.log(refWrapper);
	return refWrapper;
}

export function createRefs(refs, nodes) {
	nodes.forEach((node) => {
		if (reg_var.test(node.textContent)) {
		}
	});
}
