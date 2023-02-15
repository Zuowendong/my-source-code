/**
 * 虚拟节点
 * @param {标签名} sel
 * @param {属性} data
 * @param {子节点} children
 * @param {innerText} text
 * @param {真实dom} elm
 * @returns
 */
export default function (sel, data, children, text, elm) {
	return {
		sel,
		data,
		children,
		text,
		elm,
		key: data.key,
	};
}
