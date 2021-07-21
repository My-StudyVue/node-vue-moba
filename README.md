# node-vue-moba
> node.js+vue.js 全栈开发手机端官网和管理后台

## 一、入门

### 1.项目介绍

### 2.工具安装和环境搭建(nodejs,npm,mongodb)

- 安装nodejs 

  - 官网 http://nodejs.cn/ 下载最新版

- npm 的淘宝镜像

  - 查看原本镜像

    ```sh
    $ npm config registry //https://registry.npmjs.org
    ```

  - 设置成淘宝镜像

    - 临时

      ```sh
      $ npm --registry https://registry.npm.taobao.org
      ```

    - 永久

      ```sh
      $ npm config set registry https://registry.npm.taobao.org
      ```

      

    - 配置后验证是否成功

      ```sh
      $ npm config get registry
      ```

      或

      ```sh
      $ npm info
      ```

    - 恢复npm原镜像

      ```sh
      $ npm config set registry https://registry.npmjs.org
      ```

- 安装mongodb

  - 下载地址https://www.mongodb.com/try/download/community 下载最新版

- vscode 安装

### 3.初始化项目

----------

## 二、管理后台

### 1.基于Element UI后台管理基础界面搭建

### 2.创建分类(多层级)

### 3.分类列表

### 4.修改分类

### 5.删除分类

### 6.通用CRUD接口

### 7.装备管理

### 8.图片上传和文件管理

### 9.英雄管理

### 10.编辑英雄

### 11.装备的多选

### 12.技能的编辑

### 13.文章管理

### 14.富文本编辑器(quill)

### 15.首页广告管理

### 16.管理员账号管理(bcrypt)

### 17.登录接口

### 18.登录接口(jwt,jsonwebtoken)

### 19.服务端登录校验

### 20.客户端路由限制(beforeEach,meta)

-------

## 三、移动端网站

### 1.开发服务端接口

### 2.考虑整体样式

### 3.使用字体图标(iconfont)

### 4.首页顶部轮播图(swiper)

### 5.考虑通用组件(SFC)

### 6.卡片组件

### 7.菜单组件

### 8.首页新闻资讯

### 9.新闻详情页

### 10.首页英雄列表

### 11.英雄详情页

--------

## 四、发布和部署(阿里云)

### 1.生产环境编译

### 2.购买域名和服务器

### 3.域名解析

### 4.Nginx 安装和配置

### 5.MongoDB数据库的安装和配置

### 6.git 安装、配置ssh-key

### 7.Node.js安装、配置淘宝路径

### 8.拉去代码，安装pm2并启动项目

### 9.配置Nginx 的反向代理

-------

## 五、进阶

### 1.使用免费SSL证书启用HTTPS安全连接

### 2.使用阿里云OSS云存储存放上传文件

