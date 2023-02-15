import vnode from "./vnode";

export default function (sel, data, params) {
	// h函数的第三个参数是字符串类型，意味着它没有子元素
	if (typeof params == "string") {
		return vnode(sel, data, undefined, params, undefined);
	} else if (Array.isArray(params)) {
		// h函数的第三个参数是数组类型，意味着它有子元素
		let children = [];
		for (let item of params) {
			children.push(item);
		}
		return vnode(sel, data, children, undefined, undefined);
	}
}
