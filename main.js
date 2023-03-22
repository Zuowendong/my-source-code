/**
 * 考点
 *
 * 1. vue Options API
 * 2. vue Composition API
 * 3. this指向
 * 4. .value怎么做
 * 5. 响应式怎么做 -> 一对多 -> 依赖收集
 */

import { createApp, ref } from "./my-vue";

createApp("#app", {
	refs: {
		title: ref("this is title"),
		content: ref("this is content"),
	},
	methods: {
		setTitle() {
			this.title.value = "这是标题";
		},
		setContent() {
			this.content.value = "这是内容";
		},
		reset() {
			this.title.$reset();
			this.content.$reset();
		},
	},
});
