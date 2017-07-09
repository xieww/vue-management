import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/viewpage/login'
import Mainpage from '@/viewpage/mainpage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Mainpage',
      name: 'Mainpage',
      component: Mainpage,
        children: [
        {
            path: '/pies',
            component: resolve => require(['@/viewpage/Pies.vue'], resolve)
        },{
            path: '/3Dpies',
            component: resolve => require(['@/viewpage/3DPies.vue'], resolve)
        },{
            path: '/combos',
            component: resolve => require(['@/viewpage/combos.vue'], resolve)
        },{
            path: '/echarts',
            component: resolve => require(['@/viewpage/Highcharts.vue'], resolve)
        }
    ]
    }

    
  ]
})
