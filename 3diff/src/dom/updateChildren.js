import createElm from "./creatElm";
import patchVnode from "./patchVnode";

function isSameVnode(vnode1, vnode2) {
	return vnode1.key == vnode2.key;
}

export default (parentElm, oldChildren, newChildren) => {
	let oldStartIdx = 0; // 旧前的指针
	let oldEndIdx = oldChildren.length - 1; // 旧后的指针
	let newStartIdx = 0; // 新前的指针
	let newEndIdx = newChildren.length - 1; // 新后的指针

	let oldStartVnode = oldChildren[oldStartIdx]; // 旧前的虚拟节点
	let oldEndVnode = oldChildren[oldEndIdx]; // 旧后的虚拟节点
	let newStartVnode = newChildren[newStartIdx]; // 新前的虚拟节点
	let newEndVnode = newChildren[newEndIdx]; // 新后的虚拟节点

	while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
		if (oldStartVnode === undefined) {
			oldStartVnode = oldChildren[++oldStartIdx];
		} else if (oldEndVnode === undefined) {
			oldEndVnode = oldChildren[--oldEndIdx];
		} else if (isSameVnode(oldStartVnode, newStartVnode)) {
			// 1. 旧前 和 新前
			console.log("1");
			patchVnode(oldStartVnode, newStartVnode);
			if (newStartVnode) {
				newStartVnode.elm = oldStartVnode?.elm;
			}
			oldStartVnode = oldChildren[++oldStartIdx];
			newStartVnode = newChildren[++newStartIdx];
		} else if (isSameVnode(oldEndVnode, newEndVnode)) {
			// 2. 旧后 和 新后
			console.log("2");
			patchVnode(oldEndVnode, newEndVnode);
			if (newEndVnode) {
				newEndVnode.elm = oldEndVnode?.elm;
			}
			oldEndVnode = oldChildren[--oldEndIdx];
			newEndVnode = newChildren[--newEndIdx];
		} else if (isSameVnode(oldStartVnode, newEndVnode)) {
			// 3. 旧前 和 新后
			console.log("3");
			patchVnode(oldStartVnode, newEndVnode);
			if (newEndVnode) {
				newEndVnode.elm = oldStartVnode?.elm;
			}
			// 前置, 把旧前的节点 移动到 旧后指向的节点 的后面
			parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);

			oldStartVnode = oldChildren[++oldStartIdx];
			newEndVnode = newChildren[--newEndIdx];
		} else if (isSameVnode(oldEndVnode, newStartVnode)) {
			// 4. 旧后 和 新前
			console.log("4");
			patchVnode(oldEndVnode, newStartVnode);
			if (newStartVnode) {
				newStartVnode.elm = oldEndVnode?.elm;
			}
			// 把旧后的节点 移动到 旧前指向的节点 的前面
			parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm.nextSibling);
			oldEndVnode = oldChildren[--oldEndIdx];
			newStartVnode = newChildren[++newStartIdx];
		} else {
			console.log("5");
			// 5. 以上都不满足 -> 查找
			// 创建一个对象存放虚拟节点，用来判断新旧有没有相同节点
			let keyMap = {};
			for (let i = oldStartIdx; i <= oldEndIdx; i++) {
				let key = oldChildren[i]?.key;
				if (key) keyMap[key] = i;
			}
			// 在旧节点中寻找新前指向的节点
			let idxInOld = keyMap[newStartVnode.key];
			if (idxInOld) {
				// 如果有 说明该数据在新旧虚拟节点中都存在
				const elmMove = oldChildren[idxInOld];
				patchVnode(elmMove, newStartVnode);
				// 处理过的节点，在旧虚拟节点的数组中，设置undefined
				oldChildren[idxInOld] = undefined;
				parentElm.insertBefore(elmMove.elm, oldStartVnode.elm);
			} else {
				// 如果没有找到 -> 说明是一个新节点， 去创建
				parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm);
			}
			// 新的 指针 +1 往下走
			newStartVnode = newChildren[++newStartIdx];
		}
	}

	// 结束循环只有两种情况 ， 新增 和 删除
	if (oldStartIdx > oldEndIdx) {
		// 新增
		const before = newChildren[newEndIdx + 1] ? newChildren[newEndIdx + 1].elm : null;
		for (let i = newStartIdx; i < newEndIdx; i++) {
			parentElm.insertBefore(createElm(newChildren[i], before));
		}
	} else {
		// 进入删除操作
		for (let i = oldStartIdx; i < oldEndIdx; i++) {
			parentElm.removeChild(oldChildren[i].elm);
		}
	}
};
