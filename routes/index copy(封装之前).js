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

router.post("/AddConfig", function (req, res, next) {
  configFile.insert(
    req.body,
    (success) => {
      res.send({
        code: 200,
        msg: success || "success"
      });
    },
    (err) => {
      res.send({
        code: 400,
        msg: err || "新增失败"
      });
    }
  );
});

router.post("/UpdateConfig", function (req, res, next) {
  configFile.update(
    req.body,
    (success) => {
      res.send({
        code: 200,
        msg: success || "success"
      });
    },
    (err) => {
      res.send({
        code: 400,
        msg: err || "修改失败"
      });
    }
  );
});

router.post("/DelateConfig", function (req, res, next) {
  configFile.remove(
    req.body,
    (success) => {
      res.send({
        code: 200,
        msg: success || "success"
      });
    },
    (err) => {
      res.send({
        code: 400,
        msg: err || "删除失败"
      });
    }
  );
});

router.get(
  "/userData",
  responce({
    name: "张三",
    id: 45,
    areaCode: 4210,
    roleId: 5
  })
);
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// router.get("/configList", function (req, res, next) {
//   res.send("ree");
// });

module.exports = router;
