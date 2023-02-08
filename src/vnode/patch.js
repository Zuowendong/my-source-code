/**
 * diff 算法   最小量更新比对
 * 1. 创建两个vnode
 * 2. 比对：在数据更新时，拿到老的节点 和 新的节点 做对比， 将不同的地方进行更新
 */

export function patch(oldVnode, vnode) {
	// console.log(oldVnode, vnode);
	// vnode -> 真实的dom

	// 暴力替换 -> 全部dom直接更换 -> 性能极差 -> vue采用 diff算法

	// 第一次渲染 oldVnode 是一个真实的DOM
	if (oldVnode.nodeType === 1) {
		// 1. 创建 新的 dom
		let el = createEl(vnode);
		// console.log(el);
		// 2. 替换 == 获取父节点 -> 插入 -> 删除
		let parentEl = oldVnode.parentNode;
		parentEl.insertBefore(el, oldVnode.nextsibling);
		parentEl.removeChild(oldVnode);

		// console.log(el);
		return el;
	} else {
		// diff  ->  同一层级比较
		console.log(oldVnode, vnode);

		// 1. 标签元素不一样，直接替换
		if (oldVnode.tag !== vnode.tag) {
			console.log(oldVnode.el.parentNode);
			return oldVnode.el.parentNode.replaceChild(createEl(vnode), oldVnode.el);
		}
		// 文本对比  ->  tag: undefined
		if (!oldVnode.tag) {
			if (oldVnode.text !== vnode.text) {
				// console.log(oldVnode.el);
				return (oldVnode.el.textContent = vnode.text);
			}
		}

		// 属性
	}
}

// 添加属性
function createProps(vnode, oldProps = {}) {
	let newProps = vnode.data || {};
	let el = vnode.el;
	for (let key in newProps) {
		if (key === "style") {
			for (let styleKey in newProps.style) {
				el.style[styleKey] = newProps.style[styleKey];
			}
		} else if (key === "class") {
			el.className = newProps.class;
		} else {
			// 其他属性直接添加
			el.setAttribute(key, newProps[key]);
		}
	}
	console.log(el);
}

// 创建dom   vnode -> dom
export function createEl(vnode) {
	let { tag, children, key, data, text } = vnode;
	// 标签
	if (typeof tag === "string") {
		vnode.el = document.createElement(tag);
		createProps(vnode);
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
