/**
 * 重写 数组 方法
 * 1. 获取原来的数组方法
 * 2. 继承
 * 3. 劫持
 */

// 1
let oldArrayPortoMethods = Array.prototype;
// 2
export let ArrayMethods = Object.create(oldArrayPortoMethods);
// 3
let methods = ["push", "pop", "unshift", "shift", "splice"];

methods.forEach((item) => {
	ArrayMethods[item] = function (...args) {
		// console.log("劫持数组", args); // {list: [1,2,3,4]}
		let result = oldArrayPortoMethods[item].apply(this, args); // this -> [1,2,3,4]

		// 对象数组 追加 对象的情况  -> vm._data.arr.push({ name: "lucy" })  name: 'lucy' 未劫持
		let inserted;
		switch (item) {
			case "push":
			case "unshfit":
				inserted = args; // args -> 追加的 参数
				break;
			case "splice":
				// arr.splice(2, 0,{name: 'lucy'})  -> args -> [2,0,{name: 'lucy'}]
				inserted = args.splice(2); // 只取 参数 {name: 'lucy'}
				break;

			default:
				break;
		}
		// console.log(inserted, this);
		let ob = this.__ob__;
		if (inserted) {
			ob.observerArray(inserted); // 对追加的对象进行劫持
		}

		return result;
	};
});
