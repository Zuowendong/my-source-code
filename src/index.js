import { initGlobalApi } from "./global-api/index";
import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./vnode/index";

function Vue(options) {
	// 初始化
	this._init(options);
}

initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

// 全局的方法 Vue.mixin  Vue.component  Vue.extend
initGlobalApi(Vue);
export default Vue;
