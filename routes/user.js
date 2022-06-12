var express = require("express");
var router = express.Router();

const { responce, responceJson, handleOperate } = require("../utils/responce");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("welcome!");
});

router.post(
  "/userData",
  responce({
    code: 200,
    data: {
      name: "张三",
      id: 45,
      areaCode: 4210,
      roleId: 5,
    },
    message: "",
    successful: true,
    total: 0,
  })
);
router.post(
  "/Login",
  responce({
    code: 200,
    data: {
      name: "张三",
      id: 45,
      token: 4210,
      roleId: 5,
    },
    message: "",
    successful: true,
    total: 0,
  })
);
module.exports = router;
