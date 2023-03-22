import { ref, createRefs } from "./hooks";
import { render } from "./render";
import { bindEvent } from "./event";

export function createApp(el, { refs, methods }) {
	const $el = document.querySelector(el);
	const allNodes = $el.querySelectorAll("*");

	let refSet = createRefs(refs, allNodes);
	render(refSet);
	bindEvent.apply(refSet, [allNodes, methods]);

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
