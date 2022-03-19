import defineReactiveData from "./reactive";

function Observer(data) {
    /**
     * Object.defineProperty只作用对象
     * 数组是重写原生操作方法
     */
    if (Array.isArray(data)) {
        console.log(1111, data);
    } else {
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