/**
 * Created by shangri-la on 25/05/2017.
 */
// 引用模板
import home from '../components/home.vue'
import nav from '../components/frame/nav.vue'
import cp from '../components/frame/first-comment.vue'
import gz from '../components/frame/gongzheng.vue'
import pd from '../components/frame/pidai.vue'
import bdlb from '../components/frame/baodanliebiao.vue'
import loanpre from '../components/loanpre.vue'
import bdjs from '../components/frame/dingdanjiesuo.vue'
import xdygl from '../components/frame/loan-user.vue'
import xhms from '../components/frame/face-trial.vue'
import dy from '../components/frame/mortgage.vue'
import fk from '../components/frame/fangkuan.vue'
import fd from '../components/frame/fandian.vue'
import jsgngl from '../components/frame/juesegongnengguanli.vue'
import jsgl from '../components/frame/manage-role.vue'
import zzyggl from '../components/frame/manage-organization.vue'


// 配置路由
export default [
    {
        path: '/',
        component: home
    },
    {
        path: '/nav',
        component: nav,
        children: [
            {
                path: '/nav/bdlb',
                component: bdlb
            },
            {
                path: '/',
                component: bdlb
            },
            {
                path: '/nav/cp',
                component: cp
            },
            {
                path: '/nav/pd',
                component: pd
            },
            {
                path: '/nav/gz',
                component: gz
            },
            {
                path: '/nav/bdjs',
                component: bdjs
            },
            {
                path: '/nav/xdygl',
                component: xdygl
            },
            {
                path: '/nav/xhms',
                component: xhms
            },
            {
                path: '/nav/dy',
                component: dy
            },
            {
                path: '/nav/fk',
                component: fk
            },
            {
                path: '/nav/fd',
                component: fd
            },
            {
                path: '/nav/jsgngl',
                component: jsgngl
            },
            {
                path: '/nav/jsgl',
                component: jsgl
            },
            {
                path: '/nav/zzyggl',
                component: zzyggl
            }
        ]
    },
    {
        path: '/nav/loanpre',
        component: loanpre
    },



]
