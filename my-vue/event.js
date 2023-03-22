export function bindEvent(nodes, methods) {
	// console.log(this); // {content: {deps: Set(2), _value: 'this is content', _defaultValue: 'this is content'}, title: {deps: Set(2), _value: 'this is title', _defaultValue: 'this is title'}}
	nodes.forEach((el) => {
		const handlerName = el.getAttribute("@click");
		if (handlerName) {
			el.addEventListener("click", methods[handlerName].bind(this), false);
		}
	});
}
