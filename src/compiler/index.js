import { parseHTML } from "./parseHTML";
import { generate } from "./generate";

export function compileToFunction(el) {
	// console.log(el);
	// 1. 将 html -> ast语法树
	let ast = parseHTML(el);
	console.log(ast);
	// 2. 将ast语法树 -> render函数  (ast -> 字符串  -> render())
	let code = generate(ast);
	// console.log(code);
	// 3. 将render字符串 变成 函数
	let render = new Function(`with(this){return ${code}}`);
	// console.log(render);

	return render;
	// 4.将render() 变成 vnode  -> init.js
}

// let obj = { a: 1, b: 2 };
// with (obj) {
// 	console.log(a, b);
// }
