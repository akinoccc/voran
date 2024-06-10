---
title: react配置setupProxy之后页面无法打开
date: 2022/01/25 19:52
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/react.png
---

## react 配置 setupProxy 之后页面无法打开

我`setupProxy.js`的配置如下

```js
const { proxy } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api/v1', {
      target: 'http://127.0.0.1:5000/',
      changeOrigin: true
    })
  )
}
```

然后重新编译项目，页面打不开了，显示拒绝连接，去除这个配置后又恢复正常，所以断定是这个配置有问题

百度之后，发现上面的`proxy`语法是旧的，`http-proxy-middleware`大于`1.x`版本应该使用以下函数: `createProxyMiddleware`

```js
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/v1', {
      target: 'http://127.0.0.1:5000/',
      changeOrigin: true
    })
  )
}
```

心累。。。
