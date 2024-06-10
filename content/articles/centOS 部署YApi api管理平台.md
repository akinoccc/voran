---
title: centOS 部署YApi api管理平台
date: 2021/02/21 18:37
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/yapi.png
---

<b>前提：已安装 node.js 7.6+、mongodb 2.6+</b>

## 配置 mongodb

进入 mongodb

<!-- more -->

```bash
mongo
```

创建 yapi 数据库

```bash
use yapi
```

添加用户

```bash
db.createUser({
  user: "用户",
  pwd: "密码",
  roles: [{role: "dbOwner",db: "yapi"}]
})
```

退出 mongodb

```bash
^C 即Ctrl + C
```

创建 yapi 目录

```bash
mkdir yapi
```

切换到 yapi 目录

```bash
cd yapi
```

## 下载 YApi 源码

有两种方式：

方式一：
执行命令 git clone https://github.com/YMFE/yapi.git <存放目录>

```bash
git clone https://github.com/YMFE/yapi.git vendors
```

该方法下载速度可能比较慢

方式二：
从 github 直接下载源码，解压后将源码上传到服务器对应目录，该方法速度较快

配置 YApi

将配置文件复制到 yapi 一级子目录下

```bash
cp vendors/config_example.json ./config.json
```

使用 vim 打开 config.json

```bash
vim ../config.json
```

配置如下：

```json
{
  "port": "3000", // 项目端口号
  "adminAccount": "admin@xxx.com", // 管理员账号
  "timeout": 120000,
  "db": {
    "servername": "127.0.0.1", // mongodb地址
    "DATABASE": "yapi", // 数据库名称
    "port": 27017, // mongodb端口号
    "user": "admin", // 数据库用户名
    "pass": "admin", // 数据库密码
    "authSource": ""
  },
  // 配置邮箱
  "mail": {
    "enable": true,
    "host": "smtp.163.com", // 需在邮箱开启服务器账号
    "port": 465,
    "from": "xxx@163.com",
    "auth": {
      "user": "xxx@163.com",
      "pass": "xxx"
    }
  },
  "closeRegister": true // 禁止用户注册
}
```

## 安装程序

执行以下命令

```bash
npm install --production --registry https://registry.npm.taobao.org
```

安装程序会初始化数据库索引和管理员账号

```bash
npm run install-server
```

若出现一下情况，请检查配置中的数据库账号、密码是否与 mongodb 配置中的账号、密码一致![mongodb认证失败](https://img-blog.csdnimg.cn/20210221013250119.png)

## 启动服务

方式一：
直接启动

```bash
node server/app.js
```

启动服务器后，请访问 127.0.0.1:{config.json 配置的端口}，初次运行会有个编译的过程，请耐心等候

该方式退出进程/终端关闭后服务会自动关闭

方式二：

使用 pm2 管理服务(推荐)

```bash
npm i -g pm2
```

```bash
pm2 start server/app.js
```

该方式会一直开启服务，不受终端是否关闭影响
![](https://img-blog.csdnimg.cn/20210221015254638.png)

具体使用可以直接看文档

[pm2 快速入门指南](http://imweb.io/topic/57c8cbb27f226f687b365636)

[pm2 官方文档](http://pm2.keymetrics.io/docs/usage/quick-start/)
