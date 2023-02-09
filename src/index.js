import { initGlobalApi } from "./global-api/index";
import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./vnode/index";
import { stateMixin } from "./initState";
import { compileToFunction } from "./compiler/index";
import { createEl, patch } from "./vnode/patch";

function Vue(options) {
	// 初始化
	this._init(options);
}

initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
stateMixin(Vue); // 添加 $nextTick
// 全局的方法 Vue.mixin  Vue.component  Vue.extend
initGlobalApi(Vue);

// 测试：创建两个vnode进行比对，更新
let vm1 = new Vue({ data: { name: "张三" } });
let render1 = compileToFunction(`<div id="a" class="name userName" style="color:blue;font-szie:20px"></div>`);
let vnode1 = render1.call(vm1);
document.body.appendChild(createEl(vnode1));

let vm2 = new Vue({ data: { name: "李四" } });
let render2 = compileToFunction(`<div id="b" style='color:red'>{{name}}</div>`);
let vnode2 = render2.call(vm2);

setTimeout(() => {
	patch(vnode1, vnode2);
}, 2000);

export default Vue;
