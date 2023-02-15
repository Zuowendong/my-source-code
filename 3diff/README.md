# diff算法

功能: 提升性能

实际上就是  虚拟dom --> 其实就是数据（把dom数据化）

主流： [snabbdom](https://www.npmjs.com/package/snabbdom) vue2借鉴, virtual-dom

## 搭建环境

`npm init -y`

`npm install webpack@5 webpack-cli webpack-dev-server -S`

配置webpack.config.js

````js
module.exports = {
 entry: {
  index: "./src/index.js",
 },
 output: {
  path: __dirname + "/public",
  filename: "./js/[name].js",
 },
 devServer: {
  static: "./public",
  open: true,
 },
};
````

## 虚拟节点和真实节点

虚拟节点

````js
{
  children: undefined   // 子节点
  data: {}  // 属性
  elm: h1 // 真实dom
  key: undefined 
  sel: "h1" // tagName
  text: "新节点" // innerText
}
````

真实节点

````html
  <div id="container">旧节点</div>
````

## 新旧节点更新策略

1. 如果新老节点不是同一个节点名称，那么就暴力删除旧的节点，创建插入新的节点
2. 是能同级比较，不能跨层级。如果跨层就暴力删除旧的节点，创建插入新的节点
3. 如果是相同节点，分很多情况
   1. 新节点没有children, 证明新节点是文本，把旧的替换成新的
   2. 新的节点有children
      1. 新的有children, 旧的有children (diff核心)
      2. 新的有children， 旧的没有children, 那就创建元素添加，把旧的内容删除清空掉新增新的

diff核心（双指针）

1. 旧前 和 新前

   匹配：旧前的指针++， 新前的指针++
2. 旧后 和 新后

   匹配：旧后的指针--， 新后的指针--
3. 旧前 和 新后

   匹配：旧前的指针++， 新后的指针--
4. 旧后 和 新前

   匹配：旧后的指针--， 新前的指针++
5. 以上都不满足  ->  查找

    新的指针++，新的添加到页面，并在旧的中查找存在的话，就给旧的赋值undefined

6. 创建或删除
  
**注意**: 如果要提升性能，一定要加入key，key是唯一标识，在更改前后确认是不是同一个
