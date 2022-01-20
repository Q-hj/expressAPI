// 封装返回各种接口数据的方法
var fs = require("fs");
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

// 根据json文件名 ,调用响应函数返回json内容
const responceJson = (path) => {
  let json = fs.readFileSync("public/data/" + path + ".json");
  return responce(JSON.parse(json));
};

/**
 * 对文件增删改的操作
 * name:文件名(默认为 public/data下的json文件)
 * type:执行的操作(0:增 1:删 2:改)
 */
var File = require("./file");
const handleOperate = (name, type) =>
  function (req, res, next) {
    // 调用file对象的"新增", "删除", "修改" 方法
    new File(name)[["insert", "remove", "update"][type]](
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

module.exports = { responce, responceJson, handleOperate };
