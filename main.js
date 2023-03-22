import { reactive } from "./my-vue";

const oButtonA = document.querySelector("#aBtn");
const oButtonC = document.querySelector("#cBtn");

let data = reactive({
	a: 1,
	b: {
		c: 2,
	},
});

oButtonA.addEventListener(
	"click",
	() => {
		data.a = 100;
		console.log(data); // proxy { Target: {a:100, b: {c:2}} }
		// proxy中的对象和data是同一个引用
		// 但proxy 和 data 不是同一个引用
	},
	false
);

oButtonC.addEventListener(
	"click",
	() => {
		data.b.c = 200;
	},
	false
);
