export function bindEvent(nodes, methods) {
	// console.log(this); // {content: {deps: Set(2), _value: 'this is content', _defaultValue: 'this is content'}, title: {deps: Set(2), _value: 'this is title', _defaultValue: 'this is title'}}

	console.log(nodes);
	nodes.forEach((el) => {
		const handlerName = el.getAttribute("@click");
		console.log(handlerName);
		if (handlerName) {
			el.addEventListener("click", methods[handlerName].bind(this), false);
		}
	});
}
