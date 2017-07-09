/*
* @Author: lenovo
* @Date:   2017-07-06 22:18:01
* @Last Modified by:   lenovo
* @Last Modified time: 2017-07-09 15:59:25
*/

'use strict';

const companys = require('../classModel/company');
const express = require('express');
const async = require('async');
const requestGarp = require('../Reptile/controlRequest');

const app = express();

var city = '河南省';

// companys.find({cityStr:city})
// .sort({ _id : 1})
// .then(result => {
//  //res.json(vueadmins);
//  console.log(result);
// })
// .catch(err => {
//  //res.json(err);
// });

app.get('/api/queryAllCompany', function (req, res) {
	companys.find({})
		.sort({ phase : 1})
		.then(result => {
		 res.send(result);
		})
		.catch(err => {
		 res.json(err);
	});
});

//按照业务范围进行分组统计
app.get('/api/queryAllIndustryStr', function (req, res) {
	companys.aggregate([
			{
				$group: {
					_id:{'industryStr':'$industryStr','phase':'$phase'},
					counts:{$sum:1}
				}
			},{
				$sort: {_id:1}
			}
	],function (err, rescount){
		if (err) {
			console.log(err);
		}else{
			//res.send(rescount);
			res.send({
			  code: 1,
              msg: '处理成功',
              data: rescount
			})
		};
	});
});

app.get('/api/queryIndustryStr', function (req, res) {
	companys.aggregate([
			{
				$group: {
					_id:"$industryStr",//业务分类
					counts:{$sum:1}
				}
			},{
				$sort: {_id:1}
			}
	],function (err, rescount){
		if (err) {
			console.log(err);
		}else{
			//res.send(rescount);
			res.send({
			  code: 1,
              msg: '处理成功',
              data: rescount
			})
		};
	});
});

//按照融资轮次进行分组统计
app.get('/api/queryAllPhase', function (req, res) {
	companys.aggregate([
			{
				$group: {
					//_id:"$phase",//按照融资轮次分类
					_id:{'phase':'$phase','industryStr':'$industryStr'},
					counts:{$sum:1}
				}
			},{
				$sort: {_id:1}
			}
	],function (err, rescount){
		if (err) {
			console.log(err);
		}else{
			// res.send(rescount);
			res.send({
			  code: 1,
              msg: '处理成功',
              data: rescount
			})
		};
	});
});

app.get('/api/queryPhase', function (req, res) {
	companys.aggregate([
			{
				$group: {
					_id:"$phase",//按照融资轮次分类
					counts:{$sum:1}
				}
			},{
				$sort: {_id:1}
			}
	],function (err, rescount){
		if (err) {
			console.log(err);
		}else{
			// res.send(rescount);
			res.send({
			  code: 1,
              msg: '处理成功',
              data: rescount
			})
		};
	});
});

//按照企业省份进行分组统计
app.get('/api/queryCityStr', function (req, res) {
	companys.aggregate([
			{
				$group: {
					_id:"$cityStr",//按照省份分类
					counts:{$sum:1}
				}
			},{
				$sort: {_id:1}
			}
	],function (err, rescount){
		if (err) {
			console.log(err);
		}else{
			//res.send(rescount);
			res.send({
			  code: 1,
              msg: '处理成功',
              data: rescount
			})
		};
	});
});

//爬虫程序入口
app.get('/api/ruquestGrap', function (req, res) {
    console.log('准备开始请求36kr的最新获投信息');
    requestGarp.controlRequest();
});

module.exports = app