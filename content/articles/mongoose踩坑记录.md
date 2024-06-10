---
title: mongoose踩坑记录
date: 2021/04/04 14:27
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/mongodb.png
---

在 node.js 项目中使用 mongoose 操作 mongodb，然后就悲剧了，无论怎样查询结果都是 null，弄了好几个小时也没有找到问题

```javascript
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/hexo_admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.set('useFindAndModify', false)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))

const userSchema = mongoose.Schema({
  username: String,
  password: String
})

const Users = mongoose.model('users_admin', userSchema)
```

然后查了很多资料，发现了一个骚操作，mongoose 在创建 model 的时候会自动给表名加 ‘s’，但是 mongodb 不会，这就导致了 mongoose 查询的表名和我预期不一致，故一直查不到数据。

更改如下：

```javascript
const Users = mongoose.model('users_admin', userSchema, users_admin)
```

无语死了。。。。
