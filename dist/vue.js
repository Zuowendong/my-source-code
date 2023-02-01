(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  function observer(data) {
    // console.log(data);
    if (_typeof(data) != "object" || data == null) return data;
    // 对象
    return new Observer(data);
  }

  // vue2 对 对象 劫持 使用 Object.defineProperty  -> 缺点: 只能对 对象中一个属性 进行劫持
  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);
      this.walk(value); // 遍历 对 对象一层中每个属性劫持
    }
    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // { msg: 'Hello', info: {name: 'jack'}}
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i]; // msg
          var value = data[key]; // Hello
          defineReactive(data, key, value);
        }
      }
    }]);
    return Observer;
  }(); // 对 对象中的属性 进行劫持
  function defineReactive(data, key, value) {
    observer(value); // 深度代理 -> 递归处理当前属性的值 (如果还是个对象的话) -> {name: 'jack'}
    Object.defineProperty(data, key, {
      get: function get() {
        console.log("获取");
        return value;
      },
      set: function set(newValue) {
        console.log("设置");
        if (newValue === value) return;
        observer(newValue); // 处理 对象赋的 新值不响应 问题  -> vm._data.info = { name: "tom" } name属性不响应
        value = newValue;
      }
    });
  }

  function initState(vm) {
    var opts = vm.$options;
    console.log(opts);
    // 各配置项初始化
    if (opts.props) ;
    if (opts.data) {
      initData(vm);
    }
    if (opts.watch) ;
    if (opts.computed) ;
    if (opts.methods) ;
  }

  // 对 vue2 data 进行初始化
  function initData(vm) {
    // console.log("data初始化", vm); // data两种类型情况 : 1.对象 2.函数(执行函数返回对象)
    var data = vm.$options.data;
    data = vm._data = typeof data === "function" ? data.call(vm) : data; // this指向问题  -> 指向vm实例

    // 对data数据进行劫持
    observer(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // console.log("vue", options);
      var vm = this; // vue实例
      vm.$options = options; // 挂载options方便后续使用
      // 初始化状态
      initState(vm);
    };
  }

  function Vue(options) {
    // 初始化
    this._init(options);
  }
  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
