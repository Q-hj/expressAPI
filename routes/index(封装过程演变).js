var fs = require("fs");
var express = require("express");
var router = express.Router();

var Filter = require("../utils/file");
// 实例化一个 Filter对象
var configFile = new Filter("public/data/configList.json");

let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); //接受浏览器端提交的表单格式数据
app.use(bodyParser.json()); //接受浏览器端提交的JSON格式数据
// 返回 一个响应函数(查询)
const responce = (data) =>
  function (req, res, next) {
    // req.params
    // < 由读取文件返回json内容,到封装Filter实例(通过对文件的读写)来实现增删改查 >
    // fs.readFIle("/public/data/test.json", function (err, data) {
    //   if (err) console.log(err);
    //   else console.log(data.toString());
    // });
    res.json({
      code: 200,
      msg: "success",
      result: data,
      count: data.length
    });
  };

router.get("/configList", responce(configFile.content));

// 1.默认写法,在post方法回调中返回接口数据
// router.post("/AddConfig", function (req, res, next) {
//   configFile.update(
//     req.body,
//     (success) => {
//       res.send({
//         code: 200,
//         msg: success || "success"
//       });
//     },
//     (err) => {
//       res.send({
//         code: 400,
//         msg: err || "新增失败"
//       });
//     }
//   );
// });

//2.回调内需要声明处理成功和错误的函数,导致每个功能(增删改)存在重复声明,把post回调封装为同一个函数,0,1,2区别功能类型
//router.post("/AddConfig", handlePost(0));

//0:增 1:删 2:查
const handlePost = (type) =>
  function (req, res, next) {
    configFile[["insert", "remove", "update"][type]](
      req.body,
      (success) => {
        res.send({
          code: 200,
          msg: success || ["新增", "删除", "修改"][type] + "成功"
        });
      },
      (err) => {
        res.send({
          code: 400,
          msg: err || ["新增", "删除", "修改"][type] + "失败"
        });
      }
    );
  };

// 3.通过遍历将每个功能的 api添加到 router中
["AddConfig", "DelateConfig", "UpdateConfig"].map((api, type) => router.post("/" + api, handlePost(type)));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// router.get("/configList", function (req, res, next) {
//   res.send("hallo world");
// });

module.exports = router;
