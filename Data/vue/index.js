import { initState } from "./init";

function Vue(options) {
    this._init(options);
}

/**
 * Vue原型上挂载一个init初始化方法
 * @param {*} options Vue构造函数的参数配置项
 */
Vue.prototype._init = function(options) {
    // 将this实例保存到vm上，避免this混乱
    var vm = this;
    
    // 在实例上挂载一个$options，存放参数配置项
    vm.$options = options;

    // 初始化的逻辑操作，单独一个文件处理
    initState(vm);
}

export default Vue;