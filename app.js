var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// 设置请求头
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // 配置跨域
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Methods", "*"); //"PUT,POST,GET,DELETE,OPTIONS"
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// 配置接受参数形式
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: false,
  })
); //接受浏览器端提交的表单格式数据
app.use(express.json()); //接受浏览器端提交的JSON格式数据
app.use(express.static(path.join(__dirname, "public")));

//引用路由对象
// app.use("/api/YuQing", require("./routes/index"));//雨晴数据json文件被清除
app.use("/user", require("./routes/user"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // res.redirect('/user')
  // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
