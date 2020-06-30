import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/index'
import '@/assets/css/base.css'
import http from '@/network/index'




// 格式化 时间
Vue.filter('dateFormt', function(originValue) {
    const dt = new Date(originValue);

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '')
    const d = (dt.getDate() + '').padStart(2, '')

    const hh = (dt.getHours() + '').padStart(2, '')
    const mm = (dt.getMinutes() + '').padStart(2, '')
    const ss = (dt.getSeconds() + '').padStart(2, '')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

})

// 引入echarts 图表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')