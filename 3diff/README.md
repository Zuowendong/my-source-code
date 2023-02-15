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
  
**注意**: 如果要提升性能，一定要加入key，key是唯一标识，在更改前后确认是不是同一个
