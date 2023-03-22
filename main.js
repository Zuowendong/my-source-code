import { reactive, watchEffect, watch, computed } from "./my-vue";

const oButtonA = document.querySelector("#aBtn");
const oButtonC = document.querySelector("#cBtn");

let state = reactive({
	a: 1,
	b: {
		c: 2,
	},
});

const sum = computed(() => state.a + state.b.c);

oButtonA.addEventListener(
	"click",
	() => {
		state.a = 100;
		// console.log(state); // proxy { Target: {a:100, b: {c:2}} }
		// proxy中的对象和state是同一个引用
		// 但proxy 和 state 不是同一个引用

		console.log("computed => ", sum.value);
	},
	false
);

oButtonC.addEventListener(
	"click",
	() => {
		state.b.c = 200;
		console.log("computed => ", sum.value);
	},
	false
);

watchEffect(() => {
	console.log("watchEffect => state.a", state.a);
});
watchEffect(() => {
	console.log("watchEffect => state.b.c", state.b.c);
});

watch(
	() => state.a,
	(curr, pre) => {
		console.log(curr, pre);
		console.log("watch => state.a", state.a);
	}
);

watch(
	() => state.b.c,
	(curr, pre) => {
		console.log(curr, pre);
		console.log("watch => state.b.c", state.b.c);
	}
);
