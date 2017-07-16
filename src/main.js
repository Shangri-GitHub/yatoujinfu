import './theme/default/index.css'
import './theme/default/css/main.css'
import 'font-awesome/css/font-awesome.min.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import util from './utils'
import qs from 'qs'
import search from './components/common/search.vue'
import stage1 from './components/common/stage1.vue'
import stage2 from './components/common/stage2.vue'
import stage3 from './components/common/stage3.vue'
import stage4 from './components/common/stage4.vue'
import stage5 from './components/common/stage5.vue'
import stage6 from './components/common/stage6.vue'
import stage7 from './components/common/stage7.vue'


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(util);
Vue.use(qs);
Vue.component('search', search)
Vue.component('stage1', stage1)
Vue.component('stage2', stage2)
Vue.component('stage3', stage3)
Vue.component('stage4', stage4)
Vue.component('stage5', stage5)
Vue.component('stage6', stage6)
Vue.component('stage7', stage7)
require('es6-promise').polyfill()

axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
// axios.defaults.baseURL = 'http://192.168.0.104:8080/yatou/';   //xue
// axios.defaults.baseURL = 'http://192.168.0.106:8080/yatou/';    //lei
// axios.defaults.baseURL = 'http://192.168.0.107:8084/yatou/';   //lu
// axios.defaults.baseURL = 'http://192.168.0.108:8080/yatou/';   //jia
// axios.defaults.baseURL = 'http://192.168.0.109:8088/yatou/';   //
// axios.defaults.baseURL = 'http://192.168.0.138:8084/yatou/';	  //lu
// axios.defaults.baseURL = 'http://192.168.0.177:8080/yatou/';
//    axios.defaults.baseURL = 'http://wx.bokedata.com/yatou/';
//axios.defaults.baseURL = 'http://yatoujinfu.com/yatou/';


axios.defaults.baseURL = 'http://wx.bokedata.com/yatou/';
// axios.defaults.baseURL = 'http://yatoujinfu.com/yatou/';



//设置携带session，解决跨域
axios.defaults.withCredentials = true;
const router = new VueRouter({
    routes
})
axios.interceptors.response.use(function (response) {
    // 处理响应数据
    if(response.config.url.indexOf('queryOrderListDealCount')!=-1){
    	return
    }
    if (response.data.respCode == '000001') {
        // ElementUI.Message.error('服务器异常')
        ElementUI.MessageBox('此登录信息已过期，请重新登录', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
        }).then(() => {
            router.replace({
                path: '/',
            })
        });
    }
    return response;
}, function (error) {
    // 处理响应失败
    if (error.response.status == 500) {
        ElementUI.Message.error('服务器异常')
    } else if (error.response.status == 404) {
        ElementUI.Message.error('资源不存在')
    } else if (error.response.status == 405) {
        ElementUI.Message.error('请求方法错误')
    }
});
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    config.url+='?timestamp='+new Date().getTime()
    return config;
}, (error) => {
    return Promise.reject(error);
})
Vue.prototype.$http = axios;
new Vue({
    router,
    el: '#app',
    render: h => h(App)
})

