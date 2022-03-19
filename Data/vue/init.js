import proxyData from "./proxy";
import observe from "./observe";

/**
 * 初始化处理
 * @param {*} vm 实例对象
 */
function initState(vm) {
    // 取实例对象上挂载的参数配置项
    var options = vm.$options;

    /**
     * 分模块处理
     * 这里只有data作为例子操作
     * vue中实际顺序：prop > methods > data > computed > watch
     */
    if (options.data) {
        initData(vm);
    }
}

// 处理data响应式逻辑
function initData(vm) {
    // 获取挂载在实例对象上参数配置项里的data数据
    var data = vm.$options.data;

    /**
     * 实例上挂载一个_data存放data中数据作为备份
     * data一般是写成函数形式，直接获取其中return的值，用call
     * data如果不是函数形式，就直接返回或者返回空对象
     */
    vm._data = data = typeof data === "function" ? data.call(vm) : data || {}
    
    /**
     * 此时data里存放的是data()中return值
     * _data中是备份，方便实例直接获取
     */
    for(var key in data) {
        // 数据拦截
        proxyData(vm, "_data", key);
    }

    // 观察者模式，响应式处理核心
    observe(vm._data);
}

export {
    initState,
}