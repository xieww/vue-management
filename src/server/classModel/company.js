/*
* @Author: lenovo
* @Date:   2017-07-06 22:00:16
* @Last Modified by:   lenovo
* @Last Modified time: 2017-07-06 22:13:39
*/

'use strict';

var mongoose = require('mongoose');
var db = require("../model/db.js");

mongoose.Promise = global.Promise;
var ReptileSchema = new mongoose.Schema({
	id:Number,
	projectName:String,
	industryStr:String,
	phase:String,
	cityStr:String,
	startDate:Number,
	investParts:Array
});

var vueAdmin = mongoose.model('vueadmin',ReptileSchema);

var vueKr = new vueAdmin();

//向外暴露
module.exports = vueAdmin;