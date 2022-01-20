var express = require("express");
var router = express.Router();

const { responce, responceJson, handleOperate } = require("../utils/responce");

// 返回json
router.post("/GetAreList", responceJson("AreaList"));
router.post("/GetStaList", responceJson("StationList"));
router.post("/GetDataQuery", responceJson("TableData"));
router.get("/configList", responceJson("configList"));
// router.get("/configList", responce(configFile.content));

["AddConfig", "DelateConfig", "UpdateConfig"].map((api, type) => {
  router.post("/" + api, handleOperate("configList", type));
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" }); //跳转到views/index.jade
});
module.exports = router;
