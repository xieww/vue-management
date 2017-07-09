<template>
	<div>
	<h-charts :id="id" :option="pies" class="line-demo"></h-charts>
	<Button class="reset-button" type="info" @click="queryPiesData()">刷新</Button>
	</div>
</template>

<script>
import Highcharts from 'highcharts';

require('highcharts/highcharts-3d')(Highcharts);

import HCharts from '../components/Hcharts.vue'
// import options from './options.js'
var piesData = new Array();
var names = '';
var values = 0;
var pdata = [];
export default {
	name : 'line-demo',
	data (){
		//let option = options.lines;
		return {
			pieData:[],
			id:'line',
			//option:option
			pies:{
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false,
					options3d:{
						enabled:true,
						alpha:45
					}
		        },
				// lang: {
				// 	contextButtonTitle: '图表导出菜单',
				// 	decimalPoint: '.',
				// 	downloadJPEG: "下载JPEG图片",
				// 	downloadPDF: "下载PDF文件",
				// 	downloadPNG: "下载PNG文件",
				// 	downloadSVG: "下载SVG文件"
				// },
		        legend: {
		            align: 'left',
		            //x: -30,
		            verticalAlign: 'bottom',
		            //y: 25,
		            floating: false,
		            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
		            borderColor: '#CCC',
		            borderWidth: 1,
		            shadow: false
		        },
		        credits:{
		        	enabled:false//禁用版权信息
		        },
		        title: {
		            text: '统计36Kr网站每个省份所占公司比例情况'
		        },
		        tooltip: {
		            headerFormat: '{series.name}<br>',
		            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true
		                },
		                showInLegend: true,
		                innerSize:100,
		                depth:45
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: '公司数量占比',
		            data: pdata
		        }]
			}
		}
	},
	components:{
		HCharts
	},
	mounted(){
		this.queryPiesData();
	},
	created(){
		
	},
	methods:{
		queryPiesData(){
	        this.$http.get('/api/queryIndustryStr')
		        .then(res => {
		          	piesData = res.data.data;
		          	var size = piesData.length;
		          	for (var i = 0; i < size; i++) {
		          		names = piesData[i]._id;
		          		values = piesData[i].counts;
		          		//console.log('name='+ name + ' y=' + y);
		          		pdata.push({name:names, y:values});
		          	};
		        })
		        .catch(err => {
		          console.log(err);
		        });
		}
	}
}
</script>

<style scoped>
.line-demo{
	min-width: 310px; 
	max-width: 800px; 
	height: 400px; 
	/* margin: 0 auto */
}
</style>