---
title: mvvm原理实践
date: 2021/10/06 12:03
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/vue.png
---

## 前言

原理部分不在叙述，网上很多博客都有提，我是在掘金看了别的博主的文章([不好意思！耽误你的十分钟，让 MVVM 原理还给你](https://juejin.cn/post/6844903586103558158))，然后按自己的理解模仿着实现了基础的 demo，在此基础上又添加了 methods、v-show 和@click 的实现。

由于自己还没彻底消化，所以叙述会有点烂 😢，当成一个菜鸟的学习记录吧！下面提到的东西可能是有错误的 😓

完整代码：[github 传送门](https://github.com/vkm0303/mvvm)

demo 演示：[demo 传送门](https://vkm0303.github.io/mvvm/demo.html)

## 具体实现

### 数据代理

这里主要是 data 和 methods 的代理，代理的目的很简单，在 Vue 中，我们可以直接使用 this.xxx 来访问数据，而数据代理就是达到该目的的实现之一。

另外，如果 methods 里面的方法也能使用 this.xxx 来访问数据，那么还需要改变 method 的 this 指向，这里我写了个`_bind()`方法来实现

```js
class MVVM {
  constructor(options = {}) {
    this.$options = options
    this._proxy(options.data)
    this._proxy(options.methods)
    this._bind(options.methods)
  }

  // 将数据挂载到实例上，this代理options.data/methods，即可以直接使用this.key访问data的数据/methods的方法
  _proxy(data) {
    if (typeof data === 'object') {
      for (const key in data) {
        Object.defineProperty(this, key, {
          enumerable: true, // 可被枚举
          set(newVal) {
            data[key] = newVal
          },
          get() {
            return data[key]
          }
        })
      }
    }
  }

  // 改变methods里面的方法this指向
  _bind(methods) {
    for (const key in methods) {
      methods[key] = methods[key].bind(this)
    }
  }
}
```

### 数据劫持 + 订阅发布

数据劫持是通过`Object.defineProperty()`方法来实现，用 ES6 的`Proxy`来实现也可，有时间再更新。

这个模式好像是观察者+发布订阅的结合使用，不知道对不对，感觉是这样。

关于这两个设计模式可以看一下我的另外两篇文章：[手撕观察者模式](https://www.amschen.cn/articles/2021-10-04/%E6%89%8B%E6%92%95%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F/)、[手撕发布-订阅模式](https://www.amschen.cn/articles/2021-10-04/%E6%89%8B%E6%92%95%E5%8F%91%E5%B8%83-%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F/)

#### Dep

通过这个类是发布-订阅的具体实现

```js
class Dep {
  constructor() {
    this.subscribeObj = {}
  }

  subscribe(key, sub) {
    this.subscribeObj[key] = sub
  }

  notify(key) {
    this.subscribeObj[key].update()
  }
}
```

#### Observer

这个类的作用主要是作为一个拦截器(数据劫持)，订阅数据，发布通知，数据的获取和修改都需要经过这里(不出意外的话

```js
class Observer {
  constructor(data) {
    for (const key in data) {
      let val = data[key]
      const dep = new Dep() // 发布订阅类实例
      this._traverse(val) // 递归遍历，深度劫持
      Object.defineProperty(data, key, {
        enumerable: true, // 可被枚举
        set(newVal) {
          if (val !== newVal) {
            val = newVal
            dep.notify(key) // 数据更新，通知订阅者
            return newVal
          }
        },
        get() {
          Dep.target && dep.subscribe(key, Dep.target) // 增加订阅者，监听数据
          return val
        }
      })
    }
  }

  _traverse(data) {
    if (data && typeof data === 'object') {
      return new Observer(data)
    }
  }
}
```

#### Watcher

监听者，`update`函数就是用来更新数据的

```js
class Watcher {
  constructor(vm, exp, cb) {
    // 实例本身，模板键值(如v-model="obj.key"的obj.key)，回调函数
    this.vm = vm
    this.exp = exp
    this.cb = cb
    Dep.target = this
    let val = vm
    exp.split('.').forEach((key) => {
      val = val[key]
    })
  }

  update() {
    let val = this.vm
    this.exp.split('.').forEach((key) => {
      val = val[key]
    })
    this.vm.vShow.forEach((obj) => {
      // 检查vShow数组里面存储的v-show指令绑定值的状态
      obj.node.style.display = this.vm[obj.key] ? '' : 'none'
    })
    this.cb(val)
  }
}
```

### 数据编译

数据的更新啥的都弄好了，下面就得进行最后一步数据渲染了！

下面节点的更新有用到`DocumentFragment`，这里稍微偏一下题，使用`DocumentFragment`来来临时存储节点是有性能优化的作用的，比如下面的节点更新，如果一个一个节点的插入到 DOM 树中，就会有大量的 DOM 操作，引起多次的重绘和重排，从而影响到渲染的性能，将需要更新的节点存放到`DocumentFragment`中，最后再一次性更新，只有一次 DOM 操作，因此这里使用`DocumentFragment`是有原因滴~

```js
class Compile {
  constructor(el, vm) {
    vm.$el = document.querySelector(el)
    const fragment = document.createDocumentFragment()
    let child
    while ((child = vm.$el.firstChild)) {
      fragment.appendChild(child)
    }
    this._replace(fragment, vm)
    // 再将文档碎片放入el中
    vm.$el.appendChild(fragment)
  }

  _replace(fragment, vm) {
    Array.from(fragment.childNodes).forEach((node) => {
      const text = node.textContent
      const reg = /\{\{(.*?)\}\}/g // 匹配{{}}的内容
      /*
       * nodeType: 1 元素节点，3 文本节点
       */
      if (node.nodeType === 3 && reg.test(text)) {
        function _replaceText() {
          // 替换节点文本
          node.textContent = text.replace(reg, (matched, placeholder) => {
            console.log(matched, placeholder)
            new Watcher(vm, placeholder, _replaceText)
            return placeholder.split('.').reduce((val, key) => {
              return val[key]
            }, vm)
          })
        }
        _replaceText()
      }
      if (node.nodeType === 1) {
        const attrs = node.attributes // 获取dom节点的属性
        Array.from(attrs).forEach((attr) => {
          console.log(attr)
          const name = attr.name
          const exp = attr.value
          if (name.includes('v-model')) {
            // v-model
            node.value = vm[exp]
          }
          else if (name.includes('@click')) {
            // 绑定点击事件
            node.addEventListener('click', vm[exp])
          }
          else if (name.includes('v-show')) {
            // v-show指令处理
            vm.vShow.push({
              node,
              type: 'v-show',
              key: exp
            })
            node.style.display = vm[exp] ? '' : 'none'
            console.log(vm)
          }
          new Watcher(vm, exp, (newVal) => {
            node.value = newVal // 当watcher触发时会自动将内容放进输入框中
          })
          node.addEventListener('input', (e) => {
            // 监听input事件，输入时更新数据
            const newVal = e.target.value
            vm[exp] = newVal
          })
        })
      }
      if (node.childNodes && node.childNodes.length) {
        this._replace(node, vm) // 递归遍历节点
      }
    })
  }
}
```

## 总结

目前还需要一段时间去消化这些知识，这篇就当作学习记录吧！不敢说是技术分享，讲的实在太烂了呜呜呜…
