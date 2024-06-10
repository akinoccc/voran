---
title: git常用命令
date: 2021/10/04 22:56
hero_image: https://blog-1302037900.cos.ap-guangzhou.myqcloud.com/images/covers/git.png
---

### 初始化

```bash
git init
```

### 添加文件

文件须在当前目录下

#### 添加单个/多个文件

```bash
git add [文件名] [文件名] [文件名]
```

#### 添加当前目录所有文件

```bash
git add *
```

### 修改提交到仓库

```bash
git commit -m [提交描述]
```

### 关联远端仓库

```bash
git remote add [远端仓库地址名称(orgin)] [仓库地址]
```

### 克隆远端仓库

```bash
git clone [仓库地址]
```

### 本地修改同步到远端仓库

#### 首次提交

```bash
git push -u [远端仓库地址名称(orgin)] [分支名]
```

#### 后续提交

```bash
git push
```

### 查看仓库状态

```bash
git status
```

### 查看当前版本各个提交情况

```bash
git log
```

```bash
git log --pretty=online
```

### 版本回退

```bash
git reset --hard HEAD^
```

```bash
git reset --hard HEAD~n
```

```bash
git reset --hard ID
```

- HEAD 表示当前版本
- `^`表示上一个版本
- `~n`表示回退 n 个版本
- 通过 ID 回退到特定版本，通过 log 可以查看版本 ID

### 本地仓库同步远端仓库

```bash
git pull
```

### 查看当前分支

```bash
git branch
```

### 创建并切换分支

```bash
git checkout -b [分支名]
```

### 切换分支

```bash
git checkout [分支名]
```

### 删除分支

```bash
git checkout -d [分支名]
```

### 撤销更改

文件在`add`后`commit`前使用改命令才能生效，一定要加`--`

```bash
git checkout --[文件名]
```

### 合并分支

```bash
git merge [分支名]
```
