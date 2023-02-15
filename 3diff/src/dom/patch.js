import vnode from "./vnode";
import creatElm from "./creatElm";
import patchVnode from "./patchVnode";

/**
 * @param {旧的虚拟节点} oldVnode
 * @param {新的虚拟节点} newVnode
 */
export default function (oldVnode, newVnode) {
	// 如果 oldVnode 没有sel, 就证明不是虚拟节点，让它变成虚拟节点
	if (oldVnode.sel === undefined) {
		oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
	}
	// 判断 旧的虚拟节点 和 新的虚拟节点 是不是同一个节点
	if (oldVnode.sel === newVnode.sel) {
		// 判断条件很多了
		patchVnode(oldVnode, newVnode);
	} else {
		// 不是同一个节点，暴力删除节点，创建插入新的节点
		// 1. 创建新节点
		let newVnodeElm = creatElm(newVnode);
		// 2. 获取旧的虚拟节点的elm, 就是真实dom
		let oldVnodeElm = oldVnode.elm;
		// 3. 插入新节点
		oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm);
		// 4. 删除旧的节点
		oldVnodeElm.parentNode.removeChild(oldVnodeElm);
	}
}
