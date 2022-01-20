/***
 * 封装对文件的读写,方便实现增删改查
 * json文件格式:  [{},{}]
 */
const fs = require("fs");
// const Path = require("path");
function Filter(fileName) {
  var path = `public/data/${fileName}.json`;
  // 在require一个模块的时候（除了系统模块）， 都是从文件自己的相对路径去找。 当使用fs等模块时， 是根据cmd光标盘符去找。
  let content = fs.readFileSync(path); //同步方式读取内容

  //toString:读取的数据格式为buffer类型, 将buffer对象转为字符串类型
  //JSON.parse:将字符串还原为js数据类型(Object|Array)
  this.content = JSON.parse(content.toString());

  // 封装写入 api
  this.write = function (success, error) {
    //转为字符串并格式化内容
    let _content = JSON.stringify(this.content, null, "\t");
    // 文件路径,内容,回调
    fs.writeFile(path, _content, function (err) {
      if (err) error();
      else success();
    });
  };
  // 新增实例--push实例 写入
  this.insert = function (obj, success, error) {
    console.log(JSON.stringify(obj));
    if (!this.content) this.content = [];
    let flag = this.content.some((e) => e.Title == obj.Title);
    if (flag) return error("已存在!");
    // 从列表中筛选所有id
    let ids = this.content.filter((e) => e.id).map((e) => +e.id); //+: 转为int类型
    let maxId = ids.length ? Math.max(...ids) : 0;
    obj.id = ++maxId; //id递增
    this.content.push(obj);
    this.write(success, error);
  };

  // 更新实例--查找实例并替换 写入
  this.update = function (obj, success, error) {
    if (!obj.id) return error("未传入id!");
    const _id = parseInt(obj.id);
    let current = this.content.filter((e) => e.id == _id);
    if (!current.length) return error("id不存在!");

    const index = this.content.map((e) => parseInt(e.id)).indexOf(_id);
    this.content.splice(index, 1, obj);
    this.write(success, error);
  };

  // 删除实例--查找实例并移除 写入
  this.remove = function (obj, success, error) {
    if (!obj.id) return error("未传入id!");
    const _id = parseInt(obj.id);
    let current = this.content.filter((e) => e.id == _id);
    if (!current.length) return error("id不存在!");

    const index = this.content.map((e) => parseInt(e.id)).indexOf(_id);
    if (index < 0) console.log(index);
    this.content.splice(index, 1);
    this.write(success, error);
  };
}
module.exports = Filter;
