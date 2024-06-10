---
title: v-key的作用
date: 2021/10/22 08:17
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/vue.png
---

无论开发小程序还是 Vue 应用，都经常会使用到列表渲染，在使用过程中，如果不绑定 `key` 值，ide 经常警告需要绑定 `key` 值。但是一直都没有去深究为什么需要绑定一个 `key` 值，现在终于有时间了，所以去关注一下这些底层的东西。

## 举个栗子

```vue
<head>
  <title>v-key</title>
</head>

<body>
  <div id="app">
    <div>
      <input type="text" v-model="username">
      <button @click="addUser">添加用户</button>
    </div>
    <div v-for="user in users">  //:key="user.id"
      <input type="checkbox">{{user.username}}
    </div>
  </div>
</body>

<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>

<script>
var app = new Vue({
  el: '#app',
  data: {
    curId: 3,
    username: '',
    users: [
      {
        id: 1,
        username: '小红'
      },
      {
        id: 2,
        username: '小明'
      },
      {
        id: 3,
        username: '小天'
      }
    ]
  },
  methods: {
    addUser() {
      this.users.unshift({
        id: ++this.curId,
        username: this.username
      });
      this.username = '';
    }
  }
});
</script>
```

不绑定 `key` 的情况，从数组头部添加元素时，checkbox 选中的永远是第二条数据。

![](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/v-key-1.png)
![](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/v-key-2.png)

当将 `key` 绑定为 user 的 id 时，checkbox 选中的元素即可不受新增元素影响。

![](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/v-key-3.png)

## 怎么如此？🤔

这就要从 Vue 的 diff 算法说起了，算了，不扯这么远(菜狗

先上图，下面是没有 `key` 和有 `key`的比较过程。

这是**未绑定** `key` 时的比较过程：

![](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/v-key-4.png)

这是**绑定** `key` 时的比较过程：

![](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/v-key-5.png)

通过上面两幅图可以看出，当绑定 `key` 之后，节点更新时，节点的比较只会和 `key` 相同的节点进行对比，从而节省的 DOM 操作的开销，除了避免例子里面的情况，同时还会提高渲染效率。

然后绑定 key 时建议是选择静态不变的唯一值，不要绑定数组的索引，我以前就是一知半解，一直绑定的是数组的索引...

最后，算是把这个 `key` 值给搞明白了！
