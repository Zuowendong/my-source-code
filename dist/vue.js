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

  /**
   * 重写 数组 方法
   * 1. 获取原来的数组方法
   * 2. 继承
   * 3. 劫持
   */

  // 1
  var oldArrayPortoMethods = Array.prototype;
  // 2
  var ArrayMethods = Object.create(oldArrayPortoMethods);
  // 3
  var methods = ["push", "pop", "unshift", "shift", "splice"];
  methods.forEach(function (item) {
    ArrayMethods[item] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      // console.log("劫持数组", args); // {list: [1,2,3,4]}
      var result = oldArrayPortoMethods[item].apply(this, args); // this -> [1,2,3,4]

      // 对象数组 追加 对象的情况  -> vm._data.arr.push({ name: "lucy" })  name: 'lucy' 未劫持
      var inserted;
      switch (item) {
        case "push":
        case "unshfit":
          inserted = args; // args -> 追加的 参数
          break;
        case "splice":
          // arr.splice(2, 0,{name: 'lucy'})  -> args -> [2,0,{name: 'lucy'}]
          inserted = args.splice(2); // 只取 参数 {name: 'lucy'}
          break;
      }
      // console.log(inserted, this);
      var ob = this.__ob__;
      if (inserted) {
        ob.observerArray(inserted); // 对追加的对象进行劫持
      }

      return result;
    };
  });

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
      // 给每个对象添加一个 __ob__ 属性
      Object.defineProperty(value, "__ob__", {
        enumerable: false,
        //不可枚举,
        value: this // Observer 实例  -> 可以拿到它的observerArray方法
      });

      // 判断数据 是 对象 还是 数组类型
      if (Array.isArray(value)) {
        // console.log("数组"); // list: [1,2,3,4]
        value.__proto__ = ArrayMethods;
        // 对象数组情况  -> [{ name: "jack" }, { name: "tom" }], name 未劫持
        this.observerArray(value); // 处理 数组中对象 劫持
      } else {
        // 对象
        this.walk(value); // 遍历 对 对象一层中每个属性劫持
      }
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
    }, {
      key: "observerArray",
      value: function observerArray(value) {
        for (var i = 0; i < value.length; i++) {
          observer(value[i]);
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

  /**
   * 总结 对象
   * 1. Object.defineProperty 有缺点: 只能对对象中一个属性进行劫持
   * 2. 遍历 data 中每个属性
   * 3. 递归 get set
   */

  /**
   * 数组 [1,2,3,4]  [{name: 'jack'}, {name: 'tom'}]
   * 函数劫持, 重写数组方法
   */

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

    // 将data中所有属性代理到实例上
    for (var key in data) {
      proxy(vm, "_data", key);
    }

    // 对data数据进行劫持
    observer(data);
  }
  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
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
