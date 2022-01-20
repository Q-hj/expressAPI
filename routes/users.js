var express = require("express");
var router = express.Router();

const { responce, responceJson, handleOperate } = require("../utils/responce");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("welcome!");
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
module.exports = router;
