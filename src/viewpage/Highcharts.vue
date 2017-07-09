<template>
	<div>
	<h-charts :id="id" :option="options" class="line-demo"></h-charts>
	<Button class="reset-button" type="info" @click="setPlain()">刷新</Button>
	</div>
</template>

<script>
import Highcharts from 'highcharts';

require('highcharts/highcharts-3d')(Highcharts);

import HCharts from '../components/Hcharts.vue'
// import options from './options.js'
var piesData = [];
var names = '';
var values = 0;
var pdata = [];
export default {
	name : 'line-demo',
	data (){
		//let option = options.lines;
		return {
			id:'line',
			//option:option
			options:{
				chart: {
					options3d:{
						enabled:true,
						alpha:15,
						beta:15,
						depth:50,
						viewDistance:25
					}
				},
			    title: {
			        text: '不同业务分类的公司情况',
			        x: -20
			    },
			    subtitle: {
			        text: '数据来源: rong.36kr.com',
			        x: -20
			    },
			    xAxis: {
			        categories: ['VR·AR', '人工智能', '企业服务', '体育', '农业', '医疗健康', '工具', '房产家居', '教育', '文娱传媒', '旅游', '无人机','机器人','汽车交通','消费生活','物流','电商','硬件','社交','金融','非TMT']
			    },
			    yAxis: {
			        title: {
			            text: '个数'
			        },
			        plotLines: [{
			            value: 0,
			            width: 1,
			            color: '#808080'
			        }]
			    },
			    tooltip: {
			        valueSuffix: '个'
			    },
		        credits:{
		        	enabled:false//禁用版权信息
		        },
			    legend: {
			        layout: 'vertical',
			        align: 'right',
			        verticalAlign: 'middle',
			        borderWidth: 0
			    },
		        plotOptions: {
		            column: {
		                depth: 25
		            }
		        },
			    series: [{
                    // type: 'bar',
                    type: 'column',
            		colorByPoint: true,
            		showInLegend: false,
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
		          		//names = piesData[i]._id;
		          		values = piesData[i].counts;
		          		pdata.push(values);
		          		//console.log(values);
		          	};
		        })
		        .catch(err => {
		          console.log(err);
		        });
		},
		setPlain(){
			this.queryPiesData();
		}
	}
}
</script>

<style scoped>
.line-demo{
/* 	min-width:400px;
	max-height:400px; */
	min-width: 310px; 
	max-width: 700px; 
	height: 400px; 
	/* margin: 0 auto */
}
</style>