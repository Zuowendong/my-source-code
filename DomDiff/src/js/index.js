import { createElement, render, renderDom } from "./virtualDom";

const vDom = createElement('ul', {
    class: 'list',
    style: 'width: 300px; height: 500px; background: #ccc;'
}, [
    createElement('li', {
        class: 'item',
        'data-index': 0
    }, [
        createElement('p', {
            class: 'text',
        }, [
            '第1个列表项'
        ])
    ]),
    createElement('li', {
        class: 'item',
        'data-index': 1
    }, [
        createElement('p', {
            class: 'text'
        }, [
            createElement('span', {
                class: 'title'
            }, [
                '第2个列表项'
            ])
        ])
    ]),
    createElement('li', {
        class: 'item',
        'data-index': 2
    }, [
        '第3个列表项'
    ])
])

const rDOm = render(vDom);
renderDom(rDOm, document.getElementById("app"));
console.log(rDOm);
console.log(vDom);