export const HOOKS = [
	"beforeCreate",
	"created",
	"beforeMount",
	"mounted",
	"beforeUpdate",
	"updated",
	"beforeDestory",
	"destoryed",
];

// 策略模式  -> 姐姐判断语句很多情况
let starts = {};
// 合并data
starts.data = function () {};
// 合并computed
starts.computed = function () {};
// 合并watch
starts.watch = function () {};
// 合并methods
starts.methods = function () {};
// 合并生命周期
HOOKS.forEach((hooks) => {
	starts[hooks] = mergeHook;
});
function mergeHook(parentVal, childVal) {
	// {created: [a,b,c]}
	if (childVal) {
		if (parentVal) {
			return parentVal.concat(childVal);
		} else {
			return [childVal];
		}
	} else {
		return parentVal;
	}
}

export function mergeOptions(parent, child) {
	console.log(parent, child);
	// Vue.options = {created: [a,b,c], watch: [a,b,c]}
	let options = {};
	for (const key in parent) {
		mergeField(key);
	}
	for (const key in child) {
		mergeField(key);
	}

	function mergeField(key) {
		// 策略模式
		if (starts[key]) {
			options[key] = starts[key](parent[key], child[key]);
		} else {
			options[key] = child[key];
		}
	}

	// console.log(options);
	return options;
}
