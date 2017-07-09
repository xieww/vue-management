<template>
	<div class="x-bar">
		<div :id="id" :option="option"></div>
	</div>
</template>

<script>
import Highcharts from 'highcharts';
// import '../assets/js/highcharts-zh_CN.js'
// require('../assets/js/highcharts-zh_CN.js')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
export default{
	props:{
		id:{
			type:String
		},
		option:{
			type:Object
		}
	},
	mounted(){
		Highcharts.chart(this.id,this.option)
	}
}
</script>

<style scoped>
	
</style>