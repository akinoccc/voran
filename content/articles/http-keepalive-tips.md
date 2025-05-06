---
title: HTTP keepalive tips
description: ""
date: 2025-05-06T04:01:04.684Z
---
HTTP 开启 keep alive 时，body 的大小是有限制的，64k？如果 body 中的数据大小超过限制，浏览器会抛弃该请求，一直处于待处理的状态（pending）。