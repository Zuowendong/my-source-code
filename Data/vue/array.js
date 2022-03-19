import { ARR_METHODS } from "./config";
import observeArr from "./observeArr";

// 将数组的所有原型方法存在originArrMethods上，这个是引用
var originArrMethods = Array.prototype;

// 新造一个包含是所有数组原型方法的对象，方便改写
var arrMethods = Object.create(originArrMethods);

ARR_METHODS.map(function (m) {
    // 找到config中定义的方法名进行方法重写
    arrMethods[m] = function () {

        /**
         * 数组方法的参数不定，例如splice可以有三个
         * 转换类数组
         */
        var args = Array.prototype.slice.call(arguments);

        // 这里对数组方法的拦截，需要在原型方法执行后获取值后进行其他逻辑的操作
        var rt = originArrMethods[m].apply(this, args);

        var newArr;

        // 数组新增项可能是数组或对象
        switch (m) {
            case "push":
            case "unshift":
                newArr = args;      // [{a: 1}] / [[1]]
                break;

            case "splice":      // splice(0, 1, {})
                newArr = args.slice(2);     // [{a: 1}, {b: 2}]
                break;
            default:
                break;
        }

        /**
         * newArr存在时， 排除splice第三个参数没写情况
         * 对新增加的值进行观察
         */
        newArr && observeArr(newArr);

        return rt;
    }
});

export {
    arrMethods,
}