## 项目启动

```
安装依赖
npm install
```

```
启动
npm start 或 node bin/www
```

##### 用浏览器访问：localhost:3000

---

#### **目前可访问的接口:**

| api                      | 请求方式 |     描述     |
| :----------------------- | :------: | :----------: |
| /api/YuQing/GetAreList   |   post   | 获取区域列表 |
| /api/YuQing/GetStaList   |   post   | 获取站点列表 |
| /api/YuQing/GetDataQuery |   post   | 获取站点数据 |
|                          |          |
| /api/YuQing/AddConfig    |   get    |   新增配置   |
| /api/YuQing/UpdateConfig |   post   |   修改配置   |
| /api/YuQing/DelateConfig |   post   |   删除配置   |
| /api/YuQing/configList   |   post   | 获取配置列表 |

---

## 项目搭建

- 全局安装 Express 及 express-generator(可省略)

```
npm install  -g express
npm install -g express-generator
```

- 初始化一个 Express 应用

```
express 应用名称
```

## 项目拓展

- 安装 nodemon,

```
npm install nodemon --save
```

-在 package.json 中修改启动命令 node->nodemon

```
 "scripts": {
    "start": "nodemon ./bin/www"
  }
```

- 在文件修改后,即可自动重启服务
