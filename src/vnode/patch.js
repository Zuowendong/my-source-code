export function patch(oldEl, vnode) {
	// console.log(oldEl, vnode);
	// vnode -> 真实的dom

	// 暴力替换 -> 全部dom直接更换 -> 性能极差 -> vue采用 diff算法
	// 1. 创建 新的 dom
	let el = createEl(vnode);
	// console.log(el);
	// 2. 替换 == 获取父节点 -> 插入 -> 删除
	let parentEl = oldEl.parentNode;
	parentEl.insertBefore(el, oldEl.nextsibling);
	parentEl.removeChild(oldEl);

	// console.log(el);
	return el;
}

// 创建dom
function createEl(vnode) {
	let { tag, children, key, data, text } = vnode;
	// 标签
	if (typeof tag === "string") {
		vnode.el = document.createElement(tag);
		if (children && children.length) {
			children.forEach((child) => {
				vnode.el.appendChild(createEl(child));
			});
		}
	} else {
		// 文本
		vnode.el = document.createTextNode(text);
	}
	return vnode.el;
}
