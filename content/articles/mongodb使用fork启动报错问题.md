---
title: mongodb使用fork启动报错问题
date: 2021/03/08 13:56
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/mongodb.png
---

在我使用以下命令启动 mongodb 时，报以下错误。

```
mongod --dbpath /usr/local/bin/mongodb/data/db --logpath /usr/local/bin/mongodb/log  --fork
```

<!-- more -->

```bash
ERROR: child process failed, exited with error code 1
To see additional information in this output, start without the "--fork" option.
```

原因一般是配置目录错误，我这里是 log 的路径配置错误，在 log 目录下新建空白文件“logs.log”，然后执行以下命令即可

```bash
mongod --dbpath /usr/local/bin/mongodb/data/db --logpath /usr/local/bin/mongodb/log/logs  --fork
```

```bash
about to fork child process, waiting until server is ready for connections.
forked process: 7930
child process started successfully, parent exiting
```
