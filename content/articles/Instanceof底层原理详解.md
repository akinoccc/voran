---
title: Instanceof底层原理详解
date: 2023/03/14 22:38
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/js_instanceof.png
---

## 作用

- 用于判断某个实例是否基于某个构造函数创建

- 在继承关系中用于判断一个实例是否属于它的父类型或者祖先类型的实例

## 实现原理

其实从作用很容易看出来内部是基于什么逻辑去判断

众所周知，js 的 `OOP` 是基于原型链去实现的，而 `instanceof` 就是基于原型链去判断实例是否从目标构造函数创建的。

下面通过重写一步步还原 `instanceof`，以更进一步去理解其原理。

### 示例

> A instanceof B

1. 基本结构：两个参数，实例和要对比的构造函数

```js
function instanceOf(L, R) {}
```

2. 通过实例的`__proto__`沿着原型寻找目标构造函数的`prototype`，直到`null`停止对比

```js
function instanceOf(L, R) {
  L = L.__proto__
  R = R.prototype
  while (L !== null) {
    if (L === R) {
      return true
    }
    L = L.__proto__
  }
  return false
}
```

此时一个原型判断函数已经基本完成

3. 注意点：

当然没有这么简单就完结了，`instanceof`对于基本数据类型以及一些特殊值是无效的，统统输出`false`。

```js
1 instanceof Number // false
'' instanceof String // false
Number instanceof Number // false
null instanceof Object // false
Func instanceof Fun // false, 函数比较
```

但是以下判断是正确的：

```js
new Number(1) instanceof Number // true
```

因为通过`new`关键字实例化出`Number`对象了，而不再是基本数据类型了。

因此因此，还需要加上一些额外的判断。

```js
function instanceOf(L, R) {
  if (L === null || typeof L !== 'object') {
    return false
  }
  L = L.__proto__
  R = R.prototype
  while (L !== null) {
    if (L === R) {
      return true
    }
    L = L.__proto__
  }
  return false
}
```
