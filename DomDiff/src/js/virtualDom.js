import Element from "./Element";

/**
 * 将虚拟dom对象化
 * @param {*} type 标签名
 * @param {*} props 属性
 * @param {*} children 子节点
 * @returns 
 */
function createElement(type, props, children) {
    return new Element(type, props, children);
}

/**
 * 设置属性
 * @param {*} node 节点
 * @param {*} prop 属性
 * @param {*} value 属性值
 */
function setAttrs(node, prop, value) {
    switch (prop) {
        case 'value':
            if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
                node.value = value;
            } else {
                node.setAttribute(prop, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(prop, value)
            break;
    }
}

/**
 * 虚拟dom转成真实dom
 * @param {*} vDom virtual dom
 * @returns 
 */
function render(vDom) {
    const { type, props, children } = vDom;

    // 创建真实节点
    const el = document.createElement(type);

    /**
     * 遍历属性
     * 普通标签设置setAttribute
     * input, textarea, 设置value
     */
    for (let key in props) {
        setAttrs(el, key, props[key]);
    }

    /**
     * children可能是Element构造出来的
     * 也可能是文本节点
     */
    children.map((c) => {
        c = c instanceof Element ? render(c) : document.createTextNode(c);
        el.appendChild(c);
    })
    return el;
}

/**
 * 塞入根节点
 * @param {*} rDom real dom
 * @param {*} rootEl 根节点
 */
function renderDom(rDom, rootEl) {
    rootEl.appendChild(rDom);
}

export {
    createElement,
    render,
    setAttrs,
    renderDom
}