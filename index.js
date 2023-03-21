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
	},
});
