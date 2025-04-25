---
title: "Cannot read private member #u from an object whose class did not declare it"
date: 2025-04-25T08:12:38.788Z
---
## Mark

报错 Cannot read private member #u from an object whose class did not declare it 的根本原因在于 Vue 3 的响应式系统将 WebviewPanel 实例包裹成了 Proxy，从而破坏了 VS Code API 中私有字段（如 #u）的访问约束。

### 错误原因
- JavaScript 私有字段访问限制 
在原生类（如 VS Code 的 WebviewPanel）中，用 # 声明的私有字段只能在该类内部访问，当你试图在非该类或被 Proxy 包裹后的对象上访问时，就会抛出此错误。

- Vue 3 的深度响应式（ref）包装
默认的 ref() 会对值进行 深度 Proxy 包裹，任何方法调用的 this 都会指向这个 Proxy，而不是原始实例，导致私有字段无法在 Proxy 上被读取。

### 具体表现
当你在 render() 中调用 webViewPanel.value.reveal(...) 或访问 webViewPanel.value.webview 时，Vue 的 Proxy 破坏了类内部对私有字段的访问，进而触发该 TypeError