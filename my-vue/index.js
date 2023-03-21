import { ref, createRefs } from "./hooks";

export function createApp(el, { refs, methods }) {
	const $el = document.querySelector(el);
	const allNodes = $el.querySelectorAll("*");

	const refSet = createRefs(refs, allNodes);

	// {
	//   title: {
	//     deps: [h1, h1]
	//     _value: defaultValue
	//     _defaultValue: defaultValue
	//     value: set -> _value = newValue (update)
	//            get -> return _value
	//   }
	//   content: {
	//     deps: [p, p]
	//     value: xxx
	//   }
	// }
}

export { ref };
