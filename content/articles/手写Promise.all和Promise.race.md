---
title: 手写Promise.all和Promise.race
date: 2021/11/03 17:58
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/js_promise.png
---

## Promise.all 和 Promise.race 的运行机制

当我们想要实现其功能时，首先得先了解其运行机制，什么条件达到什么结果。

::: tips Promise.all
当所有的 promise 都成功执行时才返回 resolve，只要任意一个失败都返回 reject，且后面的 promise 停止执行。
resolve 返回的是一个结果数组，而 reject 则是直接返回。
:::

::: tips Promise.race
`race`与`all`相比，更像是比谁执行更快，其返回结果只与第一个成功执行的状态有关，但是无论是 reslove 还是 reject 都不会取消后面的 promise 执行。
resolve 和 reject 都是直接返回。
:::

了解了它们内部的运行机制后就可以逐步实现其原理了。

## 实现

### Promise.all

```js
Promise._all = function (promise) {
  const result = []
  let succCount = 0
  return new Promise((resolve, reject) => {
    promise.forEach((p) => {
      // 先resolve(p)是因为防止传进来的参数不是promise，从而报错（`then undefined`）
      Promise.resolve(p).then(
        (res) => {
          succCount++
          result.push(res)
          if (succCount === promise.length) {
            // 当全部成功是resolve
            resolve(result)
          }
        },
        err => reject(err) // 有一个报错则直接reject
      )
    })
  })
}
```

### Promise.race

```js
Promise._race = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(
        // 无论成功与否都直接返回
        (res) => resolve(res);,
        (err) => reject(err);
      );
    });
  });
};
```

### 测试

```js
let p1 = new Promise((resolve, reject) => {
  resolve("成功了");
});

let p2 = new Promise((resolve, reject) => {
  resolve("success");
});

let p3 = Promise.reject("失败");

Promise._all([p1, p2])
  .then((res) => console.log(res))  // output: ['成功了', 'success']
  .catch((err) => console.log(err));

Promise._all([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));  // output: '失败'

Promise._race([p1, p2, p3])
  .then((res) => console.log(res));  // output: '成功了'
  .catch((err) => console.log(err));
```

## 应用场景

::: tips Promise.all
最常见的场景就是 api 的串行请求，当后一个请求依赖于前一个请求的返回结果时，此时使用 Promise.all 比较适合。
:::

::: tips Promise.race
将异步操作与定时器结合，限制异步操作的执行时间(不是终止操作)，当异步操作执行时间超过定时器设置的时间后，那么定时器触发，reject 一个超时错误。
:::
