import { parseHTML } from "./parseHTML";
import { generate } from "./generate";

export function compileToFunction(el) {
  // console.log(el);

  // 1. 将 html -> ast语法树
  let ast = parseHTML(el);
  // console.log(ast);

  // 2. 将ast语法树 -> render函数  (ast -> 字符串  -> render())
  let code = generate(ast);
  console.log(code);
}

/**
 * <div id="app">{{ msg }} Vue</div>
 *
 * render() {
 *  return  _c('div', {id: 'app'}), _s(msg), _v('Vue')
 * }
 */
