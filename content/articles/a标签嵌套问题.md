---
title: a标签嵌套问题
date: 2021/04/01 09:12
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/html.png
---

## 问题描述

在魔改 hexo 主题的时候，有这么一个需求：在首页点击文章的大盒子时，通过 a 标签跳转到文章内容页面，点击盒子里面的“阅读全文”也可以跳转到文章。

![](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-15.png)

于是按照正常逻辑修改----在大盒子外面套一个 a 标签。
![](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-17.png)
但是事与愿违，生成的时候并没有预期效果，如下：
![](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-16.png)
a 标签被独立出来了，并没有把内容嵌套，经查阅资料，a 标签内不能再嵌套 a 标签

下图红框两处是已经有 a 标签了，故在外层套 a 标签不能达到预期效果
![](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-18.png)

## 解决方法

1. 舍弃内部 a 标签跳转（不能达到预期效果）

2. 利用 H5-article 标签的属性添加跳转链接即可

```html
<article onclick="location.href='#'"></article>
```
