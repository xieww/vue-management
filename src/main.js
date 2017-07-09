// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import axios from 'axios'
import 'iview/dist/styles/iview.css';    // 使用 CSS
// import Highcharts from 'highcharts';
//import HighchartsNoData from 'no-data-to-display';

// require('highcharts/modules/exporting')(Highcharts);
//HighchartsNodata(highcharts);


Vue.use(iView);
Vue.config.productionTip = false

Vue.prototype.$http = axios;

// router.beforeEach((to, from, next) => {
//     iView.LoadingBar.start();

//     next();
// });

// router.afterEach((to, from, next) => {
//     iView.LoadingBar.finish();
//     window.scrollTo(0, 0);
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
