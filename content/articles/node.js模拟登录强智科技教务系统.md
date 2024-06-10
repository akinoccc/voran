---
title: Node.js模拟登录强智科技教务系统
date: 2020/11/16 15:24
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/nodejs.png
---

## 一、抓包、分析登录请求

首先从首页正常登录教务系统，成功登入教务系统后，F12 打开检查，然后点击“Network"/"网络"，可以看到一下界面

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-1.png)

在这里可以看到一共有四个请求，不出意外的话，应该是按前后顺序发起请求的，不放心的话可以点击第一个请求，然后点击“Initiator”查看请求链

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-2.png)

确定请求顺序之后，开始分析第一个请求的 headers

在这里可以得到请求的 url、请求方法和响应类型

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-3.png)

然后再观察 Response Headers 和 Form Data

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-6.png)

通过这两个框起来的数据和 302 状态码可以知道请求和响应的过程

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-4.png)

我们需要向“https://isea.sztu.edu.cn/Logon.do?method=logon”发送一个验证码encoded，然后返回一个重定向的链接Location.

那么问题来了，怎么得到验证码？因为 form data 中没有账号密码的信息，因此可以推断该验证码是把账号和密码加密后的结果，这时候我们就要从源代码中找加密函数了

刚开始找到下面这个比较可疑的文件，但是大致看了一下没有出现 account/password 等名称就放弃了（其实是太复杂了 qaq）

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-5.png)

后来想想不太对劲，我是在登陆后的源文件找加密函数，但是这个验证码应该是在登录前就应该处理完成的

于是又返回首页的源文件查找，只有应该 index 的文件可能有加密方法

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-7.png)

然后还真发现了，在 onSubmit()事件里面，并且发现了一个可疑 url，我猜 request hearders 里面的 cookie 值会从这个 url 获取，这个后面写代码时在细说。

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-8.png)

既然我们拿到来加密方法，那么我们直接拿来用就行，不过有些地方需要改一下，如请求和获取账号密码那一段。

首先访问一下 https://isea.sztu.edu.cn/Logon.do?method=logon&flag=sess，看一下请求头和返回值之类的。

确实返回了一个 cookie（注意：这个在浏览器的调试工具看不到，要借助其它工具）

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-9.png)

我们要先保存一下这个 cookie，用于登录请求

**改写代码如下：**

```javascript
let Cookie = ''
let encoded = ''
// 封装请求头
const postOption1 = {
  url: 'https://isea.sztu.edu.cn/Logon.do?method=logon&flag=sess',
  method: 'POST',
  json: true,
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({})
}
try {
  await request(postOption1, (err, response, body) => {
    Cookie = response.headers['set-cookie'][0].substr(0, 44) // 保存cookie
  }).then((dataStr) => {
    // 将请求返回的字符串和账号密码进行加密
    if (dataStr == 'no') {
      return false
    }
    else {
      let scode = dataStr.split('#')[0]
      const sxh = dataStr.split('#')[1]
      const code = `${account}%%%${password}`
      for (let i = 0; i < code.length; i++) {
        if (i < 20) {
          encoded
            = encoded
            + code.substring(i, i + 1)
            + scode.substring(0, Number.parseInt(sxh.substring(i, i + 1)))
          scode = scode.substring(
            Number.parseInt(sxh.substring(i, i + 1)),
            scode.length
          )
        }
        else {
          encoded = encoded + code.substring(i, code.length)
          i = code.length
        }
      }
    }
  })
}
catch {}
```

成功拿到 encoded

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-10.png)

那么继续分析请求

点击第二个请求，和第一个请求差不多，不过是 get 方法，没什么特别注意的，继续下一个

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-11.png)

这里可以发现又返回了一个 cookie，而下一步请求就就是登陆后的页面了，所以可以断定这个 cookie 是登录成功的标志

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-12.png)

最后就是能否登录成功的关键了，最后一个请求的 headers 中的 cookie 有两个参数，应该就是开始保存的 cookie 和上一步返回的 cookie 拼接起来了。

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-13.png)

基本的分析已经完成了，那么可以开始动手写代码了

## 二、模拟登录

加密这一部在上面已经说过了，这里就不重复了

直接开始登录请求

```javascript
// 封装请求头
const getOption = {
  url: '',
  method: 'GET',
  json: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': Cookie
  }
}
const postOption2 = {
  url: 'https://isea.sztu.edu.cn/Logon.do?method=logon',
  method: 'POST',
  json: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': Cookie,
    'Host': 'isea.sztu.edu.cn'
  },
  form: {
    view: '1',
    useDogCode: '',
    encoded
  }
}
try {
  // 请求https://isea.sztu.edu.cn/Logon.do?method=logon
  await request(postOption2, async (err, response, body) => {
    // 用于302会自动重定向，因此需要在这里截取数据
    if (response.statusCode === 302) {
      getOption.url = response.headers.location
      try {
        // 请求返回的location中url地址
        await request(getOption, async (err, response, body) => {
          Cookie += response.headers['set-cookie'][0].substr(0, 44) // 拼接cookie
          getOption.headers.Cookie = Cookie
          try {
            // 请求返回的location中url地址，由于地址一样，不再重新赋值
            // 最后一个请求如果成功登录，那么body的值就是登录成功的首页html
            await request(getOption, (err, response, body) => {
              const nameIdx = body.indexOf('姓')
              const noIdx = body.indexOf('号')
              userInfo.name = body.substring(nameIdx + 3, nameIdx + 7)
              userInfo.no = body.substring(noIdx + 2, noIdx + 14)
              userInfo.name = userInfo.name.replace(/[^\u4E00-\u9FA5|,]+/, '')
            })
          }
          catch {}
        })
      }
      catch {}
    }
  })
  return userInfo
}
catch {
  return userInfo
}
```

代码用的嵌套比较多，有回调地狱的感觉，有机会再调整。

登录成功的结果

![avatar](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/pasted-14.png)
