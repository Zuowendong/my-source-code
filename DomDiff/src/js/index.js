import { createElement, render, renderDom } from "./virtualDom";
import domDiff from "./domDiff";
import doPatch from "./doPatch";

const vDom1 = createElement('ul', {
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
]);

const vDom2 = createElement('ul', {
    class: 'list-wrap',
    style: 'width: 300px; height: 500px; background: #ccc;'
}, [
    createElement('li', {
        class: 'item',
        style: 'color: red',
        'data-index': 0
    }, [
        createElement('p', {
            class: 'title',
        }, [
            '特殊列表项'
        ])
    ]),
    createElement('li', {
        class: 'item',
        'data-index': 1
    }, [
        createElement('p', {
            class: 'text'
        }, [])
    ]),
    createElement('div', {
        class: 'item',
        'data-index': 2
    }, [
        '第3个列表项'
    ])
]);

const rDOm = render(vDom1);
renderDom(rDOm, document.getElementById("app"));

const patches = domDiff(vDom1, vDom2);
doPatch(rDOm, patches);
console.log(patches)

