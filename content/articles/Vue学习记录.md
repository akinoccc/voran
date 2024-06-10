---
title: Vue学习记录
date: 2020/08/17 19:55
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/vue.png
---

## 基本使用

1. 引入 vue.js

2. 创建 vue 对象

   el：指定根 element（选择器）

   data：初始化数据（页面可以访问）

3. 双向数据绑定：v-model

4. 显示数据：{{xxx}}

5. 理解 vue 的 mvvm 实现

   - MVVM：

     - model：模型，数据对象（data）
     - view：视图，模板页面
     - viewModel：视图模型（vue 的实例）

   - DOM Listeners 事件监听
   - Data Bindings 数据绑定

```html
<div id="app">
  <input type="text" />
  <p>hello</p>
</div>

<script
  type="text/javascript"
  src="text/javascript"
  src="vue-master\dist\vue.js"
></script>

<script>
  //创建vue实例
  var vm = new Vue({
    //配置对象
    el: '#app', //element:选择器
    data: {
      //数据（model）
      username: 'ASSSS',
    },
  })
</script>
```

## 模板语法

### 双大括号表达式(( ))

```html
<div id="app">
  <p>{{msg}}</p>
  <p>{{msg.toUpperCase()}}</p>
  <!--全部大写函数-->
  <p v-text>{{msg}}</p>
  <!--解释为文本内容-->
  <p v-html>{{msg}}</p>
  <!--解释为标签-->
</div>
<script type="text/javascript" src="vue-master\dist\vue.js"></script>
<script>
  //创建vue实例
  new Vue({
    //配置对象
    el: '#app', //element:选择器
    data: {
      //数据（model）
      msg: '',
    },
  })
</script>
```

### 指令 1：强制数据绑定

```html
<div id="app">
  <img v-bind:src="imgUrl" />
  <img :src="imgUrl" />
  <!--简洁写法-->
</div>
<script type="text/javascript" src="vue-master\dist\vue.js"></script>
<script>
  //创建vue实例
  new Vue({
    //配置对象
    el: '#app', //element:选择器
    data: {
      //数据（model）
      imgUrl:
        'https://cn.vuejs.orghttps://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/logo.png',
    },
  })
</script>
```

### 指令 2：绑定事件监听

```html
<div id="app">
  <button v-on:click="test">test1</button>
  <button @click="test">test1</button>
  <!--简洁写法-->
  <!--test函数的传参可写可不写-->
</div>
<script type="text/javascript" src="vue-master\dist\vue.js"></script>
<script>
  //创建vue实例
  new Vue({
    //配置对象
    el: '#app', //element:选择器
    ata: {
      //数据（model）
    },
    methods: {
      test() {
        alert('hello')
      },
    },
  })
</script>
```

## 计算属性和监听

### 计算属性

- 在 computed 属性对象中定义计算属性的方法，在页面中使用`{{方法名}}`来显示计算结果

### 监听属性

- 通过 vm 对象的$watch()或 watch 配置来监听指定的属性，当属性变化时，回调函数自动调用，在函数内部进行计算

### 计算属性高级

- 通过 getter/setter 实现对属性数据的显示和监听，计算属性存在缓存，当次读取只执行一次 getter 计算

- getter:属性的 get 方法
- setter:属性的 set 方法

```html
<div id="demo">
  姓：<input type="text" placeholder="fn" v-model="firstName" /><br />
  名：<input type="text" placeholder="ln" v-model="lastName" /><br />
  姓名1(单向)：<input
    type="text"
    placeholder="fullName1"
    v-model="fullName1"
  /><br />
  姓名2(单向)：<input
    type="text"
    placeholder="fullName2"
    v-model="fullName2"
  /><br />
  姓名3(双向)：<input
    type="text"
    placeholder="fullName3"
    v-model="fullName3"
  /><br />
  <p>{{fullName1}}</p>
  <p>{{fullName2}}</p>
  <p>{{fullName3}}</p>
</div>
<script type="text/javascript" src="vue-master\dist\vue.js"></script>
<script>
  new Vue({
    el: '#demo',
    data: {
      firstName: 's',
      lastName: 'a',
      //fullName1: 's a',
      fullName2: 's a',
      //fullName3: 's a'
    },
    computed: {
      //执行条件：初始化显示/相关data属性数据发生改变
      fullName1() {
        //计算属性中的一个方法,方法返回值作为属性值
        return this.firstName + ' ' + this.lastName
      },
      fullName3: {
        //回调函数 当读取当前属性值时回调 根据相关数据计算并返回当前属性值
        get() {
          return this.firstName + ' ' + this.lastName
        },
        //回调函数 监听当前属性值的变化 当属性值发生改变时回调 更新相关的属性数据
        set(value) {
          //value就是fullName的最新属性值
          const names = value.split(' ')
          this.firstName = names[0]
          this.lastName = names[1]
        },
      },
    },
    watch: {
      //配置监听
      firstName: function (value) {
        //firstName发生了变化
        this.fullName2 = value + ' ' + this.lastName
      },
    },
  })
  vm.$watch('lastName', function (value) {
    //更新fullName2
    this.fullName2 = this.firstName + ' ' + value
  })
</script>
```

## class 和 style 绑定

- 在应用界面中，某个元素的元素时变化的
- style/class 绑定就是专门用来实现动态样式效果的技术

##### class 绑定

```bash
:class = 'xxx'
```

- xxx 是字符串
- xxx 是对象
- xxx 是数组

##### style 绑定

```bash
:style = "{color:activeColor, fontSize:fontSize + 'px'}"
```

- activeColor/fontSize 是 data 属性

```html
<div id="demo">
  <h3>class绑定</h3>
  <p :class="a">xxx是字符串</p>
  <p :class="{aClass:isA, bClass:isB}">xxx是对象</p>
  <p :class="cssArr">xxx是数组</p>

  <h3>style绑定</h3>
  <p :style="{color:activeColor, fontSize:fontSize + 'px'}">style</p>

  <button @click="update">更新</button>
</div>
<script type="text/javascript" src="vue-master/dist/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#demo',
    data: {
      a: 'aClass',

      isA: true,
      isB: false,

      cssArr: ['aClass', 'bClass'],

      activeColor: 'green',
      fontSize: 20,
    },
    methods: {
      update() {
        this.a = 'bClass'

        this.isA = false
        this.isB = true

        this.cssArr = ['aClass']

        this.activeColor = 'blue'
        this.fontSize = 12
      },
    },
  })
</script>
```

## 条件渲染

### 渲染指令

- v-if
- v-else
- v-show

```html
<div id="demo">
  <p v-if="ok">成功了</p>
  <p v-else>失败了</p>
  <p v-show="ok">表白成功</p>
  <p v-show="!ok">表白失败</p>
  <button @click="ok=!ok">切换</button>
</div>

<script type="text/javascript" src="vue-master/dist/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#demo',
    data: {
      ok: false,
    },
  })
</script>
```

### v-if/else 和 v-show 的区别

- v-if/else 渲染时会把需要隐藏的标签直接去除

- v-show 渲染时只是给需要隐藏的标签加上隐藏的内联样式属性

![](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/vue-test.png)

## 列表渲染

```html
<div id="demo">
  <h3>测试：v-for 遍历数组</h3>
  <ul>
    <li v-for="(p, index) in persons" :key="index">
      {{index}}----{{p.name}}----{{p.age}} ----<button
        @click="deletePerson(index)"
      >
        删除
      </button>
      ----<button @click="updatePerson(index,					{name:'cat',age:10})">更新</button>
    </li>
  </ul>

  <h3>测试：v-for 遍历对象</h3>
  <ul>
    <li v-for="(value, key) in persons" :key="key">{{key}}----{{value}}</li>
  </ul>
  <ul>
    <li v-for="(value, key) in persons[0]" :key="key">{{key}}----{{value}}</li>
  </ul>
</div>

<script type="text/javascript" src="vue-master/dist/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#demo',
    data: {
      //vue只是监听了persons的改变，没有监听数组内部的变化
      //vue重写了数组中的一系列改变数组内部数据的方法(先调用原			  生，再更新界面)
      persons: [
        { name: 'Tom', age: 18 },
        { name: 'Jack', age: 19 },
        { name: 'Bobe', age: 15 },
        { name: 'Rose', age: 20 },
      ],
    },
    methods: {
      deletePerson(index) {
        this.persons.splice(index, 1)
      },
      updatePerson(index, newPerson) {
        //没有改变persons本身,数组内部数据改变，但是没有调用变异方法，因此界面没有发生改变
        //this.persons[index] = newPerson
        this.persons.splice(index, 1, newPerson)
      },
    },
  })
</script>
```

## 列表的搜索和排序
