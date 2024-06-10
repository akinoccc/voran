---
title: phpMyAdmin无法登录MySql8的问题
date: 2021/10/16 15:46
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/mysql.png
---

数据库系统的实验课需要用到 phpMyAdmin，正常安装和设置后尝试使用 phpMyAdmin 登录 mysql，然后就出问题了 😅

如图

![image](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/1.png)

通过 github 看到某个 php 相关项目的 issue 里面有提到这个问题，然后得知原因是 php 不支持`caching_sha2_password`的密码验证方式，所以得把 mysql 的验证方式改为老版本的--`mysql_native_password`

windows 下使用管理员运行 cmd，登录 mysql 后运行下面的命令修改密码验证方式即可

```bash
alter user 'username'@'localhost' identified with mysql_native_password by 'password';
```

![image](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/2.png)
