---
title: JS实现DeepClone
date: 2022/07/28 20:16
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/js_deepclone.png
---

## DeepClone 原理

这里简单叙述一下，通过 DFS 深度优先遍历重新构建整个`数据树`(暂且这么叫吧~)，分两种情况

- 基本数据类型，直接`key = value`赋值就行
- 复杂数据类型，如`Date`, `RegExp`等，通过`new`关键字重新创建实例

## 简单实现

逻辑很简单

::: info

- 若判断入参为 `null` 或`基本数据类型`或`Function`，直接返回；
- 若为数组，则创建新数组，遍历原数组的元素，使用 `deepClone`递归得到新元素；
- 若为`Object`，则区分`复杂对象`和`简单对象`即可，简单对象和数组流程一样。

:::

```js
function deepClone(data) {
  if (data === null || typeof data !== 'object' || typeof data === 'function') {
    return data
  }
  if (Array.isArray(data)) {
    const newArr = []
    data.forEach((el) => {
      newArr.push(deepClone(el))
    })
    return newArr
  }
  if (typeof data === 'object') {
    if (data instanceof Date) {
      return new Date(data.getTime())
    }
    if (data instanceof RegExp) {
      return new RegExp(data.source)
    }
    const keys = Object.keys(data)
    const newObj = {}
    keys.forEach((key) => {
      newObj[key] = deepClone(data[key])
    })
    return newObj
  }
}
```
