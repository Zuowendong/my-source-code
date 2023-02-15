import createElm from "./creatElm";
import updateChildren from "./updateChildren";

export default function (oldVnode, newVnode) {
	// 判断新节点有没有children
	if (newVnode.children === undefined) {
		if (newVnode.text !== oldVnode.text) {
			// 文本不一样，直接用新的节点的文本覆写旧节点的文本
			oldVnode.elm.innerText = newVnode.text;
		}
	} else {
		if (oldVnode.children && oldVnode.children.length) {
			// diff核心
			updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
		} else {
			// 把旧节点的内容清空
			oldVnode.elm.innerHTML = "";
			// 遍历新的子节点，创建dom元素添加到页面上
			for (let child of newVnode.children) {
				let childDom = createElm(child);
				oldVnode.elm.appendChild(childDom);
			}
		}
	}
}
