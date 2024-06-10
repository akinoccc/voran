---
title: uniapp获取不到video组件ref问题
date: 2022/09/02 20:27
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/uniapp.png
---

### 起因

在编写 video-swiper 的 nvue 组件时，通过 v-for 渲染 swiper-item，然后发现无论怎样通过`uni.createVideoContext(id, thisArg)`和`this.$refs[refName]`都获取不到可控制视频的对象。

```vue
<swiper-item v-for="(video, i) in videoList">
    <video :id="'video' + i" ref="'video' + i" :src="video" />
</swiper-item>
```

### 解决历程

实验了一下把视频放到一级页面都是正常的，但是在 nvue 子组件中就是不行，很自然地以为是 nvue 子组件的限制，然后无意间把渲染方式改了一下，结果就一切正常了！！

```vue
<swiper>
      <swiper-item>
          <video id="video0" ref="video0" :src="videoList[0]" />
      </swiper-item>
      <swiper-item>
          <video id="video1" ref="video1" :src="videoList[1]" />
      </swiper-item>
      <swiper-item>
          <video id="video2" ref="video2" :src="videoList[2]" />
      </swiper-item>
</swiper>
```

那么真相只有一个），v-for 的问题，目前还没深究其背后原因，之后在更新~
