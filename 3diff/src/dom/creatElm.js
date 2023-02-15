/**
 * 创建新节点
 * @param {新节点} vnode
 */
export default function createElm(vnode) {
	let vnodeDom = document.createElement(vnode.sel);
	// 判断 vnode.children 存不存在
	if (vnode.children === undefined) {
		// 不存在说明只有文本
		vnodeDom.innerText = vnode.text;
	} else if (Array.isArray(vnode.children)) {
		// 存在子节点，需要递归创建节点
		for (let child of vnode.children) {
			let childDom = createElm(child);
			vnodeDom.appendChild(childDom);
		}
	}
	// 补充elm属性
	vnode.elm = vnodeDom;
	return vnodeDom;
}
