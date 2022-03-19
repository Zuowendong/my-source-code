import { arrMethods } from "./array";
import observeArr from "./observeArr";
import defineReactiveData from "./reactive";

function Observer(data) {
    /**
     * Object.defineProperty只作用对象
     * 数组是重写原生操作方法
     */
    if (Array.isArray(data)) {

        /**
         * 数组的重写处理
         * 在原型链上新增自己写的方法，优先取这些方法处理数组
         * 数组中还有数组调用observeArr递归观察
         */
        data.__proto__ = arrMethods;
        observeArr(data);
    } else {

        // 对象的拦截处理
        this.walk(data);
    }
}

/**
 * 构造函数原型上挂载的方法
 * @param {*} data 实例对象中data的返回值
 */
Observer.prototype.walk = function (data) {
    var keys = Object.keys(data);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = data[key];

        defineReactiveData(data, key, value);
    }
}

export default Observer;