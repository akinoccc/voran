---
title: Electron 踩坑专题
date: 2023/03/10 11:06
---

## Electron-React

> 本文章主要记录开发`Electron(React)`应用中遇到的问题及解决方法。

### Dev环境，页面不能正常渲染

源码只有index.html文件，具体如下：

![request](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/electron-bugs-1.png)

原因：在`/electron/main/index.js`文件中，加载页面使用的是`loadFile`的API，开发环境访问不到本地域的其他文件。

解决：切换为`loadURL`即可解决。

![request](https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/electron-bugs-2.png)

### 构建包的index.html文件不正确

运行Electron构建包，`index.html`引用的资源(css, js...)路径仍然是原始路径。

原因：打包配置files中没有把原始index.html去除，导致打包后该文件仍然存在并被electron加载

### Electron构建报错入口文件不存在

Error："`Application entry file "build\electron.js" in the "app.asar" does not exist. Seems like a wrong configuration`"

原因：electron-builder在dependencies发现了 含react的依赖，main配置无效

### Electron构建包资源加载错误

运行Electron构建包，报错"`Not allowed to load local resource xxxx`"

原因：`mainWindow.loadFile`中的路径不对

### Electron构建包页面空白

运行Electron构建包，页面空白，devtool没有任何报错

原因：router使用了`history`模式，`history`模式需要从服务端请求资源，然而项目中并没有相关的服务端配合，所以导致页面不渲染。

解决：修改为`hash`模式恢复正常。

### Index router问题

React-router_v6子路由设置`index: true`，当访问父路由路径时不渲染`index router`，配置如下:

```tsx
const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/home',
        element: <h1>A react template for electron</h1>,
        index: true,
        meta: {
          name: 'Home',
        },
      },
    ],
  },
]
```

原因：误解了`index router`的用法，`index router`不提供自动导航，仅当访问父路由路径时且`index router`的`path`属性不存在时，渲染`index router`视图。

如需自动导航可以按以下配置：

```tsx
const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        element: <Navigate replace to="/home" />,
        index: true,
      },
      {
        path: '/home',
        element: <h1>A react template for electron</h1>,
        meta: {
          name: 'Home',
        },
      },
    ],
  },
]
```

### 懒加载路由问题

React-router v6版本使用懒加载组件，报错

```tsx
{
  ... ...
  element: lazy(() => import('@renderer/layout/AppLayout')) // 无效，报错
}
```

原因：v6版本去除了`component`配置，改为了`element`，`element`只能接受组件，不可以`component object`形式

解决：修改为以下配置即可：

```tsx
const AppLayout = lazy(() => import('@renderer/layout/AppLayout'));
{
  ... ...
  element: <AppLayout /> // 无效，报错
}
```

### 使用懒加载组件报错

Devtool报错："`Error:The above error occurred in one of your React components`"

原因：使用了懒加载组件，页面渲染时，组件还没加载完成。

解决：使用React提供的`<Suspend feedback={} />`组件包裹路由组件即可。

```tsx
<Suspense fallback={<Spin tip="Loading..." />}>
  { useRoutes(routes) }
</Suspense>
```
