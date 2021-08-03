import Vue from 'vue'
import Router from 'vue-router'
import Cookie from 'js-cookie'


Vue.use(Router)

//使用路由懒加载
const scrollBehavior = (to, from, savedPosition) => {
    return { x: 0, y: 0 }
}

export default new Router({
    scrollBehavior,
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: resolve => require(['@/view/index'], resolve),
            redirect: '/home',
            alias: '/home',
            children: [
                {
                    path: 'home',
                    component: resolve => require(['@/view/home/home'], resolve), //首页
                    meta: { title: '首页' }
                }
            ]
        },
        {
            path: '/case',
            component: resolve => require(['@/view/home/case'], resolve)  //案例展示
        },
        {
            path: '/video',
            component: resolve => require(['@/view/home/video'], resolve)  //视频
        },
        {
            path: '/homeCase',
            component: resolve => require(['@/view/home/homeCase'], resolve)  //案例展示
        },
        {
            path: '/homeVideo',
            component: resolve => require(['@/view/home/homeVideo'], resolve)  //视频
        },
        {
            path: '/about',
            component: resolve => require(['@/view/home/about'], resolve)  //关于我们
        },
        {
            path: '/contact',
            component: resolve => require(['@/view/home/contact'], resolve)  //联系我们
        },
        {
            path: '/login',
            component: resolve => require(['@/view/home/login'], resolve)  //登录
        },
        {
            path: '/register',
            component: resolve => require(['@/view/home/register'], resolve)  //注册
        },
        {
            path: '/editPass',
            component: resolve => require(['@/view/home/editPass'], resolve)  //修改密码
        },
        {
            path: '/table',
            component: resolve => require(['@/view/home/table'], resolve)  //提交订单
        },
        {
            path: '/task',
            component: resolve => require(['@/view/home/task'], resolve)  //订单列表
        },
        {
            path: '/user',
            component: resolve => require(['@/view/home/user'], resolve)  //个人中心
        },
        {
            path: '/photographer',
            component: resolve => require(['@/view/home/photographer'], resolve)  //摄影师注册
        },
        {
            path: '/photoTable',
            component: resolve => require(['@/view/home/photoTable'], resolve)  //未接单列表
        },
        {
            path: '/Received',
            component: resolve => require(['@/view/home/Received'], resolve)  //待现场确认列表
        },
    ]
})
