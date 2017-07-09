<template>
	<div>
	<h-charts :id="id" :option="combos" class="line-demo"></h-charts>
	</div>
</template>

<script>
import HCharts from '../components/Hcharts.vue'
import Highcharts from 'highcharts';
var piesData = [];
var names = '';
var values = 0;
var pdata = [];
var piedata = [];
export default {
	name : 'line-demo',
	data (){
		//let option = options.lines;
		return {
			id:'combos',
			//option:option
			combos:{
		        title: {
		            text: '混合图表'
		        },
		        xAxis: {
		            categories: ['A轮', 'ACQUIRED轮', 'ANGEL(天使轮)', 'A_PLUS', 'B轮','B_PLUS','C','C_PLUS','D轮','E轮','IPO','NONE','PRE_A','PRE_B','SEED','UNKNOWN']
		        },
			    yAxis: {
			        title: {
			            text: '次数'
			        },
			        plotLines: [{
			            value: 0,
			            width: 1,
			            color: '#808080'
			        }]
			    },
		        credits:{
		        	enabled:false//禁用版权信息
		        },
		        plotOptions: {
		            series: {
		                stacking: 'normal'
		            }
		        },
		        labels: {
		            items: [{
		                html: '公司融资轮次',
		                style: {
		                    left: '100px',
		                    top: '18px',
		                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
		                }
		            }]
		        },
		        series: [{
		            type: 'column',
            		colorByPoint: true,
            		showInLegend: false,
		            data: pdata
		        },{
		            type: 'pie',
		            name: '轮次',
		            data: piedata,
		            center: [100, 80],
		            size: 100,
		            showInLegend: false,
		            dataLabels: {
		                enabled: false
		            }
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
	        this.$http.get('/api/queryPhase')
		        .then(res => {
		          	piesData = res.data.data;
		          	var size = piesData.length;
		          	for (var i = 0; i < size; i++) {
		          		names = piesData[i]._id;
		          		values = piesData[i].counts;
		          		//console.log('name='+ name + ' y=' + y);
		          		pdata.push(values);
		          		piedata.push({name:names, y:values});
		          		console.log(values);
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
	max-width: 800px; 
	height: 400px; 
	/* margin: 0 auto */
}
</style>