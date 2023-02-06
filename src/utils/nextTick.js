let callback = [];
let pending = false;

function flush() {
	callback.forEach((cb) => cb());
	pending = false;
}

let timerFunc;
// 处理兼容问题
if (Promise) {
	timerFunc = () => {
		Promise.resolve().then(flush); // 异步处理
	};
} else if (MutationObserver) {
	// h5 异步方法，监听dom变化之后再来异步更新
	let observe = new MutationObserver(flush);
	let textNode = document.createTextNode(1);
	observe.observe(textNode, { characterData: true });
	timerFunc = () => {
		textNode.textContent = 2;
	};
} else if (setImmediate) {
	// ie
	timerFunc = () => {
		setImmediate(flush);
	};
}
export function nextTick(cb) {
	console.log(cb); // 列队 [cb1, cb2]  -> cb1 是 vue自己的 更新数据的方法   cb2 用户自己写的方法
	callback.push(cb);
	// console.log(callback);
	if (!pending) {
		timerFunc(); // 列队处理，异步方法执行  -> Promise.then()  但是需要处理兼容问题
		pending = true;
	}
}
