/*
* @Author: lenovo
* @Date:   2017-07-06 21:32:56
* @Last Modified by:   lenovo
* @Last Modified time: 2017-07-06 21:54:33
*/

'use strict';

var mongoose = require('mongoose');

var mongodUrl = 'mongodb://127.0.0.1:27017/company';

var db = mongoose.connect(mongodUrl);

//监听数据库连接状态
db.connection.on("error", function (error) {
    console.log("数据库连接失败,失败原因：" + error)
})
db.connection.on("open", function () {
    console.log("------ 数据库连接成功！------")
})

//向外暴露这个db对象
module.exports = db;