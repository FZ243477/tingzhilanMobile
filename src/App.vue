<template>
  <div id="app">
    <!-- <Tabbar></Tabbar> -->
        <router-view v-if="isReloadAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components:{

  },
  provide(){
    return{
      reload:this.reload,
    };
  },
  data(){
    return {
      isReloadAlive:true,
    }
  },

  methods:{
      GetUrlParam(paraName) {
          var url = document.location.toString();
          var arrObj = url.split("?");
          if (arrObj.length > 1) {
              var arrPara = arrObj[1].split("&");
              var arr;
              for (var i = 0; i < arrPara.length; i++) {
                  arr = arrPara[i].split("=");
                  if (arr != null && arr[0] == paraName) {
                      return arr[1];
                  }
              }
              return "";
          }
          else {
              return "";
          }
      },
      _isMobile() {
          let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
          return flag;
      },
    reload(){
      this.isReloadAlive = false;
      this.$nextTick(function () {
        this.isReloadAlive = true;
      })
    },
  }
}
</script>

<style lang="less">

</style>
