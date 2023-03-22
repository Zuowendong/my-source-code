export function render(refs) {
	for (const key in refs) {
		const ref = refs[key];
		_render(ref);
	}
}

export function update({ deps, value }) {
	_render({ deps, value });
}

function _render({ deps, value }) {
	// 通知机制
	deps.forEach((dep) => {
		dep.textContent = value;
	});
}
