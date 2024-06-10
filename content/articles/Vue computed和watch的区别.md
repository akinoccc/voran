---
title: Vue computed和watch的区别
date: 2021/10/22 09:12
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/vue.png
---

`computed` 和 `watch` 的用法比较相似，由于其作用相近，经常搞不懂它俩的区别，所以这几天专门花了点事件去“研究”了一下。

## computed 和 watch 的区别

### 用法上的区别

#### computed

- 不允许异步操作。
- 计算属性的函数必须 `return` ，否则属性不会更新。
- 可以设置 `getter` 和 `setter` 。
- 具有缓存机制，页面重新渲染时，当属性依赖的其它属性不发生变化时，不会触发计算函数，而是从上一次计算的结果缓存中获取数据，当依赖属性更新时，将会在下一次调用 `getter` 时重新计算，并将结果存到缓存中，减小了内存开销。

![pre](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/presentation.gif)

#### watch

- 允许异步操作，比如 http 请求。
- 每次页面重新渲染都会执行相应的函数。

### demo

话不多说，直接上 demo，这里价格计算为例。

#### Html 部分

```html
<!doctype html>
<html>
  <body>
    <div id="app">
      <div>
        <h3>总价格:{{totalPrice}}</h3>
      </div>
      <div>
        <span>单价:</span>
        <input v-model="price" type="text" />
        <span>数量:</span>
        <input v-model="num" type="text" />
        <button @click="getTotalPrice">获取总价格</button>
      </div>
    </div>
  </body>
</html>
```

#### javascript

同样的行为可以对比一下使用 `watch` 和 `computed` 的区别

```vue
// watch
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>

<script>
var app = new Vue({
  el: '#app',
  data: {
    num: 0,
    price: 12,
    totalPrice: 0,
  },
  watch: {
    'num': function(newV, oldV) {
      this.totalPrice = this.price * newV;
    },
    'price': function(newV, oldV) {
      this.totalPrice = this.num * newV;
    }
  }
  methods: {
    getTotalPrice() {
      this.num = 1;
      alert(this.totalPrice);
    }
  },
})
</script>
```

```vue
// computed
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>

<script>
var app = new Vue({
  el: '#app',
  data: {
    num: 0,
    price: 12
  },
  computed: {
    totalPrice: {
      get: function () {
        console.log('触发computed');
        return this.num * this.price;
      }
    }
  },
  methods: {
    getTotalPrice() {
      this.num = 1;
      alert(this.totalPrice);
    }
  }
});
</script>
```

从上面的代码来看，`computed` 显然比 `watch` 要简洁，而且维护性更好，使用 `computed` 只需要监听 `totalPrice` 这个属性即可，当该属性所依赖的其它属性发生变化时，则会在下一次调用 `getter` 时重新对该属性进行计算，而 `watch` 则需要监听其所依赖的属性。

### 适用场景

#### computed

适用于多对一关系的场景，即一个属性依赖于多个属性。比如购物车，当商品的数量/价格发生变化时都需要重新计算总价格，和上面的例子类似。

#### watch

适用于一对多关系的场景，即当一个属性发生变化时，其它关联的属性也需要随之发生相应的变化。比如路由的变化，当监听到`route`发生变化时，页面的数据也需要发生相应的改变，那么使用 `watch` 更好一点。

```vue
<script>
const app = new Vue({
  el: '#app',
  data() {
    return {
      title: '',
      tableData: []
    }
  },
  watch: {
    $router(n, o) {
      if (xxx) {
        // 更新title
        // 更新tableDate
      }
    }
  }
})
</script>
```
