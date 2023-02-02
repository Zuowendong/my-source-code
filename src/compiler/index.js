/**
 * <div id="app">hello {{msg}} <h1>world</h1></div>
 *
 * ast
 * {
 * 		tag: 'div',
 * 		attrs: [{id: 'app'}],
 *    children: [
 * 			{
 * 				tag: null,
 * 				text: 'hello'
 * 			},
 * 			{tag: 'h1', text: 'world'}
 * 		]
 * }
 *
 */

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // 作用域 <span:xx
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 开头标签 <span
const startTagClose = /^\s*(\/?)>/; // >
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 结束标签 </span>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{ }}

function start(tag, attrs) {
	console.log(tag, attrs); // 开始标签
}
function charts(text) {
	console.log(text); // 获取文本
}
function end(tag) {
	console.log(tag); // 结束标签
}

// 解析 Html -> ast 对象
function parseHTML(html) {
	while (html) {
		// 判断标签
		let textEnd = html.indexOf("<");
		if (textEnd === 0) {
			// 开始标签
			const startTagMatch = parseStartTag();
			if (startTagMatch) {
				start(startTagMatch.tagName, startTagMatch.attrs);
				continue;
			}
			// 结束标签
			let endTagMatch = html.match(endTag);
			if (endTagMatch) {
				// console.log(endTagMatch);
				advance(endTagMatch[0].length);
				end(endTagMatch[1]);
				continue;
			}
		}
		// 文本
		if (textEnd > 0) {
			// console.log(textEnd); // 获取文本内容
			let text = html.substring(0, textEnd);
			// console.log(text); // {{ msg }} Vue
			if (text) {
				advance(text.length);
				charts(text);
				// console.log(html);
			}
		}
	}

	// 解析开始标签
	function parseStartTag() {
		const start = html.match(startTagOpen); // 1. 结果  2. false
		// console.log(start);
		if (!start) return;

		let match = {
			tagName: start[1],
			attrs: [],
		};

		// 匹配上的 开始标签内容 放入 match 之后 删除
		advance(start[0].length);

		// 属性 遍历 -> 多个情况
		let attr;
		let end;
		// 没匹配到 开始标签的结束>  并且  匹配到属性
		while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
			// console.log(attr);
			match.attrs.push({
				name: attr[1],
				value: attr[3] || attr[4] || attr[5],
			});
			advance(attr[0].length);
		}
		if (end) {
			// console.log(end); // ['>', '', index: 0, input: '>{{ msg }} Vue</div>', groups: undefined]
			advance(end[0].length);
		}
		return match;
	}
	function advance(n) {
		html = html.substring(n); // 截取 <div
		// console.log(html); //  id="app">{{ msg }} Vue</div>
	}
}

export function compileToFunction(el) {
	// console.log(el);
	let ast = parseHTML(el);
}
