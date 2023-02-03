// 处理样式属性
function genProps(attrs) {
	let str = "";
	for (let i = 0; i < attrs.length; i++) {
		const attr = attrs[i];
		// console.log(attr); // {name: 'style', value: 'color: red; font-size: 20px'}
		if (attr.name === "style") {
			let obj = {};
			// 'color: red; font-size: 20px'
			attr.value.split(";").forEach((item) => {
				let [key, val] = item.split(":");
				obj[key] = val;
				// console.log(obj); // {color: ' red', " font-size": ' 20px'}
			});
			attr.value = obj;
		}
		// console.log(attr); // {name: "style", value: {color: 'red', "font-size": '20px'}}

		// 拼接
		str += `${attr.name}:${JSON.stringify(attr.value)},`;
	}
	// console.log(str); // id:"app",style:{"color":" red"," font-size":" 20px"},
	return `{${str.slice(0, -1)}}`; // 去除末尾的 ,
}

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{ }}

function genChildren(el) {
	if (el.children) {
		return el.children.map((child) => genChild(child)).join(",");
	}
}
function genChild(node) {
	if (node.type === 1) {
		// 元素标签
		return generate(node);
	} else {
		// 两种文本情况 1. 纯文本 2. 插值表达式 {{}}
		let text = node.text; // 获取文本
		if (defaultTagRE.test(text)) {
			// 2. 含插值表达式 {{}}
			let tokens = [];
			// 正则匹配机制，首次匹配成功之后，再次匹配失效，需要将正则的lastIndex 置为 0
			let lastindex = (defaultTagRE.lastIndex = 0);
			let match;
			while ((match = defaultTagRE.exec(text))) {
				// console.log(match); // ['{{msg}}', 'msg', index: 0, input: '{{msg}}Vue', groups: undefined]
				if (match.index > lastindex) {
					// 添加文本内容
					tokens.push(JSON.stringify(text.slice(lastindex, match.index)));
				}
				// {{}}
				tokens.push(`_s(${match[1].trim()})`); // 取 插值表达式中的 内容
				lastindex = match.index + match[0].length; // 插值表达式 的整体长度 ，解析完的下标
			}
			if (lastindex < text.length) {
				// 插值表达式后面还有文本
				tokens.push(JSON.stringify(text.slice(lastindex)));
			}
			return `_v(${tokens.join("+")})`;
		} else {
			return `_v(${JSON.stringify(text)})`; // 1. 纯文本
		}
	}
}

/**
 * _c 元素标签
 * _v 文本
 * _s 插值表达式
 *
 */

export function generate(ast) {
	// console.log(ast);
	let children = genChildren(ast);
	let code = `_c("${ast.tag}",${ast.attrs.length ? `${genProps(ast.attrs)}` : "null"},${
		children ? `${children}` : "null"
	})`;
	// console.log(code);
	return code;
}
