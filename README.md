# node-vue-moba
> node.js+vue.js 全栈开发手机端官网和管理后台

## 一、入门

### 1.项目介绍

### 2.工具安装和环境搭建(nodejs,npm,VUE CLI,mongodb,nodemon)

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

- 安装VUE CLI

  ```sh
  $ npm install -g @vue/cli
  ```

- 安装mongodb

  - 下载地址https://www.mongodb.com/try/download/community 下载最新版

- 安装nodemon

  ```sh
  $ npm i -g nodemon
  ```

- vscode 安装

### 3.初始化项目

- 新建server文件夹

  >表示服务端项目，nodejs 所有的东西，包括给后台管理admin界面和前台web界面提供接口
  
  ```sh
  $ mkdir server
  ```
  
- 创建web端的项目

  ```sh
  $ vue create web
  ```

  >选择 默认 安装

- 创建后台管理界面项目

  ```sh
  $ vue create admin
  ```

  > 选择 默认 安装

- 初始化后台的服务端 server

  - 进入server 文件夹

    ```sh
    $ cd server
    ```

  - 初始化 node 项目

    > 会生成 package.json

    ```sh
    $ npm init -y
    ```
  
  - 新建入口文件 index.js
  
  - 自定义脚本运行文件
  
    > 在package.json 里面 的 scripts中新建
  
    ```json
    "scripts": {
      "serve": "nodemon index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```

----------

## 二、管理后台

### 1.基于Element UI后台管理基础界面搭建

- 进入到后台admin文件夹

  ```sh
  $ cd admin
  ```

- 安装 Element UI 的插件

  ```sh
  $ vue add element
  ```

  >安装 提示全按 回车 即可

- 

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

