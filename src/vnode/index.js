export function renderMixin(Vue) {
	// 标签
	Vue.prototype._c = function () {
		return createElement(...arguments);
	};
	// 文本
	Vue.prototype._v = function (text) {
		return createText(text);
	};
	// 变量
	Vue.prototype._s = function (val) {
		let res = "";
		if (val) {
			if (typeof val === "object") {
				res = JSON.stringify(val);
			} else {
				res = val;
			}
		}
		return res;
	};

	Vue.prototype._render = function () {
		let vm = this;
		let render = vm.$options.render;
		let vnode = render.call(this);
		// console.log(vnode);
		return vnode;
	};
}

function createElement(tag, data = {}, ...children) {
	return vnode(tag, data, data.key, children);
}
function createText(text) {
	return vnode(undefined, undefined, undefined, undefined, text);
}

function vnode(tag, data, key, children, text) {
	return { tag, data, key, children, text };
}
