import Vue from 'vue'
import App from './App'
import router from './router'
import Navigation from 'vue-navigation'

import store from "store"
import axios from "axios"
import { ToastPlugin } from 'vux';
import { LoadingPlugin } from 'vux';

import Vant from 'vant';
import { Dialog } from 'vant';
import { Area, Popup } from 'vant'
import 'vant/lib/index.css';
import '@/assets/icon/iconfont.css';
import '@/assets/style/common.scss';
import '@/assets/style/home.css';


import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

Vue.use(Vant)
Vue.use(Dialog)
Vue.use(Area)
Vue.use(Popup)
Vue.use(Navigation, { router })
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: require('@/assets/img/home/4.jpg'),
  loading: require('@/assets/img/home/4.jpg')
})

// import VueLazyLoad from 'vue-lazyload'; // 懒加载
// Vue.use(VueLazyLoad,{
//   error:'@/assets/img/home/4.jpg', // 加载错误的图片
//   loading:'@/assets/img/home/logo1.png' // 加载时的图片
// });
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)


Vue.prototype.$axios = axios;

Vue.config.productionTip = false

// 设置私有页面(需要登录访问)
const routerPrivate = ['/mine']

router.beforeEach((to, from, next) => {
  let token;
  if (store.get('userinfo') && store.get('userinfo').token) {
    token = store.get('userinfo').token;
  }
  if (routerPrivate.indexOf(to.fullPath) != -1) {
    if (token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
function ismobile(test) {    //0:iPhone    1:Android
  var u = navigator.userAgent, app = navigator.appVersion;
  if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
    if (window.location.href.indexOf("?mobile") < 0) {
      try {
        if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
          return '0';
        } else {
          return '1';
        }
      } catch (e) { }
    }
  } else if (u.indexOf('iPad') > -1) {
    return '0';
  } else {
    return '1';
  }
}

function test() {
  var u = navigator.userAgent, app = navigator.appVersion;
  // return u;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  // var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("iPhone") > -1 || u.indexOf("Apple") > -1;
  if (isAndroid) {
    return 1;
  }
  if (isIOS) {
    return 0;
  }
}
var pla = test();
// var pla=ismobile(1)
store.set("mobileType", pla);

if (store.get("alertStatus") === true || store.get("alertStatus") === false) {

} else {
  store.set("alertStatus", true);
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
