import wx from 'weixin-js-sdk'			//微信sdk依赖

const jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ','onMenuShareWeibo']
										//要用到微信API
import axios from 'axios'
// 
 
//     var getMsg = res.data.data;
function getJSSDK(url, dataForWeixin) {
  console.log(1212121)
    // axios.get('').then(function(res) {    encodeURIComponent(url)
    axios.get(' ' ).then(res => {
      console.log(res)
      window.wx.config({
       
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //下面这里不用管  让后台看一下  让他返给你 
        appId:'wxc98ef19e61e6b789' , // 必填，公众号的唯一标识
        timestamp:'1596437679' ,// 必填，生成签名的时间戳
        nonceStr: 'Wm3WZYTPz0wzccnN', // 必填，生成签名的随机串
        signature: 'b06367121c668c690fe43886f4d866fd832b7f04',// 必填，签名
        jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareQQ'
        ] // 必填，需要使用的JS接口列表
      })
      console.log(res) //打印测试
      window.wx.ready(function () {
        window.wx.onMenuShareAppMessage({
          title: dataForWeixin.title,
          desc: dataForWeixin.desc,
          link: dataForWeixin.linkurl,
          imgUrl: dataForWeixin.img,
          trigger: function trigger(res) { },
          success: function success(res) {
            console.log('已分享');
          },
          cancel: function cancel(res) {
            console.log('已取消');
          },
          fail: function fail(res) {
            alert(JSON.stringify(res));
          }
        });
        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        window.wx.onMenuShareTimeline({
          title: dataForWeixin.title,
          link: dataForWeixin.linkurl,
          imgUrl: dataForWeixin.img,
          trigger: function trigger(res) {
            // alert('用户点击分享到朋友圈');
          },
          success: function success(res) {
            //alert('已分享');
          },
          cancel: function cancel(res) {
            //alert('已取消');
          },
          fail: function fail(res) {
            alert(JSON.stringify(res));
          }
        });
      // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
      window.wx.onMenuShareQQ({
          title: dataForWeixin.title,
          desc: dataForWeixin.desc,
          link: dataForWeixin.linkurl,
          imgUrl: dataForWeixin.img,
          trigger: function trigger(res) {
            //alert('用户点击分享到QQ');
          },
          complete: function complete(res) {
            alert(JSON.stringify(res));
          },
          success: function success(res) {
            //alert('已分享');
          },
          cancel: function cancel(res) {
            //alert('已取消');
          },
          fail: function fail(res) {
            //alert(JSON.stringify(res));
          }
        });
        // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
        window.wx.onMenuShareWeibo({
          title: dataForWeixin.title,
          desc: dataForWeixin.desc,
          link: dataForWeixin.linkurl,
          imgUrl: dataForWeixin.img,
          trigger: function trigger(res) {
            alert('用户点击分享到微博');
          },
          complete: function complete(res) {
            alert(JSON.stringify(res));
          },
          success: function success(res) {
            alert('已分享');
          },
          cancel: function cancel(res) {
            alert('已取消');
          },
          fail: function fail(res) {
          alert(JSON.stringify(res));
          }
        });
      })
      window.wx.error(function (res) {
        alert("微信验证失败");
      });
    })
  }
  export default {
    // 获取JSSDK
    getJSSDK: getJSSDK
  }
