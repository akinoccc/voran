---
title: Github Action 中使用默认 GITHUB_TOKEN 权限问题
date: 2023/06/07
---

## Problem

在发布 [hexo-theme-alog](https://github.com/FE-Alog/hexo-theme-alog) 新版本时，由于在 `feature` 分支进行新功能开发，合并回 `master` 是需要提个 `PR`, 我使用 `Github Action` 进行 `Issue` 和 `PR` 的自动回复，结果报错了, 如下:

```bash
HttpError: Resource not accessible by integration
```

## Reason

我猜测是权限问题导致的，但是又有些疑惑，疑问 workflow 的配置是从另一个仓库复制过来的，那个仓库运行是正常的。

经过查阅 Github 文档，找到了答案, `Github_Token` 的默认权限如下：

|        Scope        | Default access(permissive) | Default access(restricted) | Maximum access for pull requests from public forked repositories |
| :-----------------: | :------------------------: | :------------------------: | :--------------------------------------------------------------: |
|       actions       |         read/write         |            none            |                               read                               |
|       checks        |         read/write         |            none            |                               read                               |
|      contents       |         read/write         |            read            |                               read                               |
|     deployments     |         read/write         |            none            |                               read                               |
|      id-token       |            none            |            none            |                               read                               |
|       issues        |         read/write         |            none            |                               read                               |
|      metadata       |            read            |            read            |                               read                               |
|      packages       |         read/write         |            read            |                               read                               |
|        pages        |         read/write         |            none            |                               read                               |
|    pull-requests    |         read/write         |            none            |                               read                               |
| repository-projects |         read/write         |            none            |                               read                               |
|   security-events   |         read/write         |            none            |                               read                               |
|      statuses       |         read/write         |            none            |                               read                               |

可以看到, `GITHUB_TOKEN` 的 `Issue` 和 `PR` 的默认权限是 `read`, 所以当 `Github Action` 使用这个 `Token` 调用评论接口时会报上面的错误。

## Solutions

- 单文件设置权限

在 workflow 配置文件单独设置权限:

```yml
jobs:
  auto-reply:
    # 权限设置
    permissions:
      contents: write
      id-token: write
      issues: write
      pull-requests: write
```

- 仓库整体权限设置:

设置路径: `Respository setting` => `Action` => `General` => `Workflow permissions`
