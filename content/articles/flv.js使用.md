---
title: flv.js的使用
date: 2021/04/03 19:23
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/flvjs.png
---

## 1. 引入 flv.js

### 1.1 script 标签引入

#### 原生 html 引入

```javascript
<script type="text/javascript" src="https://unpkg.com/video.js/dist/video.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/flv.js/dist/flv.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/videojs-flvjs/dist/videojs-flvjs.min.js"></script>
```

#### Vue 引入

理论上 Vue 也可以使用什么方式引入 flv.js，我尝试了一下，发现并没有发起请求，及 script 标签并没有被执行，可能和生命周期有关。

于是我选择采用另一种方式，在组件构建时向 DOM 添加 script 节点

```javascript
mounted() {
  // 引入flv.js
  const extendJs = [
    'https://unpkg.com/video.js/dist/video.min.js',
    'https://unpkg.com/flv.js/dist/flv.min.js',
    'https://unpkg.com/videojs-flvjs/dist/videojs-flvjs.min.js'
  ];
  for(let url of extendJs) {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = url;
    document.body.appendChild(s);
  }
},
```

### 1.2 通过 npm 包引入

```bash
npm install --save flv.js
npm install          # 安装包依赖
npm install -g gulp  # 安装构建工具
gulp release         # 打包并使包最小化，存储在dist文件夹
```

## 2. 基本使用方法

### 2.1.基本配置说明

#### MediaDataSource

| 属性            | 类型                                   | 说明                            |
| :-------------- | :------------------------------------- | :------------------------------ |
| type            | String                                 | 视频流格式，参数 flv/mp4        |
| isLive          | Boolean (非必选)                       | 是否为直播，即是否为实时推流    |
| cors            | Boolean (非必选)                       | 拉流是否跨域                    |
| withCredentials | Boolean (非必选)                       | 是否携带 cookies                |
| hasAudio        | Boolean (非必选)                       | 是否开启声音                    |
| hasVideo        | Boolean (非必选)                       | 是否开启图像                    |
| duration        | Number (非必选)                        | 视频流总时间长度（ms）          |
| filesize        | Number (非必选)                        | 文件大小                        |
| url             | String (非必选)                        | 视频流地址，支持 http(s)、ws(s) |
| segments        | Array[duration, filesize, url](非必选) | 视频列表                        |

**注：segments 存在时，则将播放器列为多源媒体播放，duration、filesize、url 会失效**

**更多内容可以看官方文档 => [flv.js api 文档](https://github.com/bilibili/flv.js/blob/master/docs/api.md)**

### 2.2. 实例

这里以 Vue 为例

#### 页面部分

```html
<template>
  <div>
    <div class="video-player" v-if="radio">
      <!-- 播放器控制按钮 -->
      <div class="controls">
        <button @click="flv_load()">加载</button>
        <button @click="flv_start()">开始</button>
        <button @click="flv_pause()">暂停</button>
        <button @click="flv_destroy()">停止</button>
        <input
          style="width:100px"
          type="text"
          name="seekpoint"
          placeholder="输入跳转时间(s)"
        />
        <button @click="flv_seekto()">跳转</button>
      </div>
      <!-- 播放器 -->
      <div class="mainContainer" @click="play">
        <video
          id="videoElement"
          class="centeredVideo"
          controls
          autoplay
          width="1024"
          height="576"
        ></video>
      </div>
    </div>
    <!-- 拉流日志 -->
    <div class="logs-box">
      <b>日志</b>
      <span class="clear-btn" @click="clear">清空日志</span>
      <textarea id="logs" class="logs" :value="logs" readonly></textarea>
    </div>
  </div>
</template>
```

#### js 部分

```javascript
<script>
export default {
  data(){
    return {
      player: {}, //dom对象
      logs: 'tips: hls视频流播放无日志输出',
    }
  },
  mounted() {
    // 引入flv.js
    const extendJs = [
      'https://unpkg.com/video.js/dist/video.min.js',
      'https://unpkg.com/flv.js/dist/flv.min.js',
      'https://unpkg.com/videojs-flvjs/dist/videojs-flvjs.min.js'
    ];
    for(let url of extendJs) {
      let s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = url;
      document.body.appendChild(s);
    }
  },
  methods: {
    play() {
      var flvUrl = "https://mister-ben.github.io/videojs-flvjs/bbb.flv";  //flv测试视频流
      this.player = document.getElementById('videoElement');  //获取 video Dom 节点
      if (flvjs.isSupported()) {
        flvjs.LoggingControl.forceGlobalTag = true;  //设置日志打印
        var flvPlayer = flvjs.createPlayer({
          type: 'flv',  //商品类型
          "isLive": true,  //是否实时流
          "hasAudio": false,  //是否包含音频
          url: this.url  //视频流地址
        });

        flvPlayer.attachMediaElement(videoElement);  //添加配置进Dom节点
        flvPlayer.load(); //加载
        this.flv_start(); //开始播放

        //打印日志
        flvjs.LoggingControl.addLogListener((type, log)=>{
          this.logs += log + '\n';
          document.getElementById('logs').scrollTop = document.getElementById('logs').scrollHeight;
        });
      }
    },
    //播放
    flv_start() {
      this.player.play();
    },
	//暂停
    flv_pause() {
      this.player.pause();
    },
	//停止
    flv_destroy() {
      this.player.pause();
      this.player.unload();
      this.player.detachMediaElement();
      this.player.destroy();
      this.player = null;
    },
	//进度跳转
    flv_seekto() {
      this.player.currentTime = parseFloat(document.getElementsByName('seekpoint')[0].value);
    },
	//清除日志
    clear() {
      this.logs = '';
    }
  },
}
</script>
```

#### css 部分

```css
<style rel="stylesheet/scss" lang="scss" scoped>
  button:hover {
    cursor: pointer;
  }
  .video-player {
    width: 70%;
    margin-top: 10px;
    margin-left: 60%;
    transform: translateX(-50%);
  }
  .logs-box {
    position: absolute;
    top: 4px;
    left: 20px;
    width: 300px;
    height: 750px;
    margin-top: 10px;
    .clear-btn {
      margin-left: 210px;
      margin-bottom: 2px;
      padding: 4px 6px;
      background-color: #efefef;
      border: 1px solid #999;
      border-radius: 2px;
    }
    .clear-btn:hover {
      cursor: pointer;
    }
    .logs {
      width: 100%;
      height: 94%;
      margin-top: 6px;
      padding-top: 4px;
      padding-left: 2px;
      resize: none;
    }
  }
</style>
```
