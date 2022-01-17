var fs = require("fs");
var express = require("express");
var router = express.Router();

var Filter = require("../utils/file");
// 实例化一个 Filter对象
var configFile = new Filter("public/data/configList.json");

// 返回 一个响应函数(查询)
const responce = (data) =>
  function (req, res, next) {
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

["AddConfig", "DelateConfig", "UpdateConfig"].map((api, type) => router.post("/" + api, handlePost(type)));
//router.post("/AddConfig", handlePost(0));

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
