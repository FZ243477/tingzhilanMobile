<template>
    <div style="background-color: #ffffff;">
        <Header />
        <div class="home_content">
            <!--<div class="title1">-->
            <!--案例展示-->
            <!--</div>-->
            <div data-v-24bd6e66="" class="home_nav">
                <van-tabs v-model="active" title-active-color="#fccc28" color="#fccc28" @click="goHomeCase">

                        <van-tab :title="item.name" v-for="(item,index) in cate" :key="index"
                                  :id="item.id" :name="item.id">
                        </van-tab>

                    <van-tab title="视频" name="999" ></van-tab>
                </van-tabs>
                    <!--<ul data-v-24bd6e66="" style="padding: 0px;">-->
                        <!--<li data-v-24bd6e66="" v-for="(item,index) in cate" :key="index"-->
                            <!--:class="{select:item.id == selectCurrent}"-->
                            <!--@click="goHomeCase(item.id)">-->
                            <!--<div data-v-24bd6e66="" class="home_nav_left"></div>-->
                            <!--<div data-v-24bd6e66="" class="home_nav_span">{{item.name}}</div>-->
                            <!--<div data-v-24bd6e66="" class="home_nav_right"></div>-->
                        <!--</li>-->
                        <!--<li data-v-24bd6e66="" class="" @click="goHomeVideo()" :class="{select:videoStatus}">-->
                            <!--<div data-v-24bd6e66="" class="home_nav_left"></div>-->
                            <!--<div data-v-24bd6e66="" class="home_nav_span">视频</div>-->
                            <!--<div data-v-24bd6e66="" class="home_nav_right"></div>-->
                        <!--</li>-->
                        <!--<div data-v-24bd6e66="" style="clear: both;"></div>-->
                    <!--</ul>-->
                <div data-v-24bd6e66="" style="clear: both;"></div>
            </div>
            <div class="home_box" v-show="imgStatus">
                <div class="home_ab" style="overflow: hidden;" align="center" v-for="(item,index) in imgList"  :key="index">
                    <div class="home_ab_idv" >
                        <img  @click="showToImg(item.id)" style="" :src="item.url" alt="">
                      {{item.title}}

                    </div>

                    <div style="clear: both;"></div>
                </div>
            </div>

            <div class="video_box" v-for="(item,index) in videoUrl" :key="index" v-show="videoStatus">
                <video-player  class="video-player vjs-custom-skin"
                               ref="videoPlayer"
                               :playsinline="true"
                               :options="videoUrl[index]"
                ></video-player>
            </div>
        </div>
        <!--<div class="page">-->
        <!--<div class="page_prep " :class="{page_none:pagePrepNone}" @click="goPrep">上一页</div>-->
        <!--<div class="page_mid">{{page}}/{{totalPage}}</div>-->
        <!--<div class="page_prep page_next" @click="goNext" :class="{page_none:pageNextNone}">下一页</div>-->
        <!--</div>-->
        <div class="show_img" ref="homePage" v-show="showImg"
             align="center">
            <img class="back_prep" @click="closeBig" src="@/assets/img/home/back.png" alt="">
            <div class="show_span">{{bigCount}}/{{totalCount}}</div>
            <v-touch v-on:swipeleft="leftChangeImg" style="width: 100%;" v-on:swiperight="rightChangeImg">
                <div v-for="(item,index) in allList" :key="index">
                    <img :src="item.url" :class="{displayShow:bigCount == index+1}"  class="big_show_img" alt="">
                </div>
            </v-touch>
        </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in moreList"
          :key="item"
          :title="item"
        />
      </van-list>
        <Footer />
    </div>
</template>
<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import Vue from 'vue';
    import { Tab, Tabs } from 'vant';
    import { logoList,homeImg,logoCate,homeVideo } from "../../http/api.js";
    export default {
        components: {
            Header,
            Footer,
        },
        data(){
            return{
              moreList: [],
              loading: false,
              finished: false,
              pageNum:1,
              pageSize:8,
              loadTag:1, //标记是否触发onLoad函数
                active: 2,
                logoList:{},
                list_row:8,
                page:1,
                totalPage:1,
                totalCount:1,
                cateId:1,
                pagePrepNone:false,
                pageNextNone:false,
                clientHeight:'',
                showImg:false,
                bigImg:'',
                bigCount:1,
                allList:{},
                cate:{},
                selectCurrent:1,
                imgStatus:true,
                videoStatus:false,
                imgList:[],
                videoUrl:[],
                videoList:[],
                playerOptions : {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: "http://admin.kacayu.net//uploads/video/20201109/561a9a7b5efc569c5465c935ccebdf1c.mp4" //url地址
                    }],
                    poster: "http://admin.kacayu.net//uploads/picture/20201109/60b222a550821e4e1ba922ffba956698.png", //你的封面地址
                    // width: document.documentElement.clientWidth, //播放器宽度
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                }
            }
        },
        mounted(){
            window.addEventListener("scroll", this.handleScroll, true);
            // 获取浏览器可视区域高度
            this.clientHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;
            //console.log(self.clientHeight);
            window.onresize = function temp() {
                this.clientHeight = `${document.documentElement.clientHeight}`;
            };
        },
        watch: {
            // 如果 `clientHeight` 发生改变，这个函数就会运行
            clientHeight: function () {
                this.changeFixed(this.clientHeight)
            },
        },
        methods: {
          onLoad() {
            if(this.loadTag==1){
              //请求接口得到数据给list数组
              this. getMoreData()
              this.loadTag=0;
              setTimeout(() => {
                // 加载状态结束
                this.loading = false;
              }, 500);
            }
          },
          getMoreData(){
            let params={
              page:this.pageNum,
              list_row:this.pageSize,
              cate_id:this.selectCurrent,
            }
            if(this.imgStatus == true){
            homeImg(params)
              .then(res => {
                if (res.status == 1) {
                  let data=res.data.list;
                  for(let i=0;i<data.length;i++){
                    this.imgList.push(data[i]);
                  }
                  let total=res.data.totalCount;
                  let end=this.imgList.length;
                  // 数据全部加载完成
                  if (end>=total) {
                    this.finished = true;
                    this.loadTag=0;
                    return;
                  }
                  this.pageNum++;
                  this.loadTag=1;
                } else {
                  this.$toast(res.data.msg);
                  this.finished = true;
                  this.loadTag=0;
                }
              });
            }else{
              this.getVideoList()
            }
          },
            goHomeCase(title,id){
                this.imgStatus=true;
                this.videoStatus=false;
                this.selectCurrent = title;
                if(this.selectCurrent == 999){
                    this.imgStatus=false;
                    this.videoStatus=true;
                    this.selectCurrent = 999
                    this.pageNum = 1
                    this.videoUrl = []
                    this.getMoreData()
                }else{
                  this.pageNum = 1
                  this.imgList = []
                  this.finished = false
                  this.loadTag=1;
                  this.getMoreData()
                }
            },
            goHomeVideo(){
                this.imgStatus=false;
                this.videoStatus=true;
                this.selectCurrent = 999
            },
          getVideoList(){
            homeVideo({
              page:this.pageNum,
              list_row:this.pageSize,
            })
              .then(res => {
                if(res.status == 1){
                  let data=res.data.list;
                  // for(let i=0;i<data.length;i++){
                  //   this.videoUrl.push(data[i]);
                  // }
                  for(let i of  data){
                    let arrStr = {
                      playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
                      autoplay: false, //如果true,浏览器准备好时开始回放。
                      muted: false, // 默认情况下将会消除任何音频。
                      loop: false, // 导致视频一结束就重新开始。
                      preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                      language: 'zh-CN',
                      aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                      fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                      poster: i.pic,
                      sources: [{
                        type: "",
                        src: i.water_video
                      }],
                      // sources: [{
                      //   type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                      //   src: "http://admin.kacayu.net//uploads/video/20201109/561a9a7b5efc569c5465c935ccebdf1c.mp4" //url地址
                      // }],
                      // poster: "http://admin.kacayu.net//uploads/picture/20201109/60b222a550821e4e1ba922ffba956698.png", //你的封面地址
                      // width: document.documentElement.clientWidth, //播放器宽度
                      notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                      controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                      }
                    }
                    this.videoUrl.push(arrStr)
                  }
                  let total=res.data.totalCount;
                  let end=this.videoUrl.length;

                  this.playerOptions.poster = this.videoUrl.pic

                  // 数据全部加载完成
                  if (end>=total) {
                    this.finished = true;
                    this.loadTag=0;
                    return;
                  }
                  this.pageNum++;
                  this.loadTag=1;
                } else {
                  this.$toast(res.data.msg);
                  this.$toast(res.data.msg);
                  this.finished = true;
                  this.loadTag=0;
                }
              })
          },
            showToImg(a){
                this.showImg = true
                logoList({
                    key_index:a,
                })
                    .then(res => {
                        if (res.status == 1) {
                            this.bigCount = res.data.biglist.count
                            this.bigImg = res.data.biglist.url
                        } else {
                            Toast(res.msg);
                        }
                    })
            },
            changeFixed(clientHeight){
                this.$refs.homePage.style.height = clientHeight+'px';
            },

            leftChangeImg(){
                if(this.bigCount + 1 <= this.totalCount){
                    this.bigCount = this.bigCount + 1
                }else{
                    return
                }
            },
            rightChangeImg(){
                if(this.bigCount - 1 > 0){
                    this.bigCount = this.bigCount -1
                }else{
                    return
                }
            },
            closeBig(){
                this.showImg = false
            },
            goPrep(){
                if(this.page -1 <= 0){
                    return
                }else{
                    this.page = this.page - 1
                }
                logoList({
                    list_row:this.list_row,
                    page:this.page,
                })
                    .then(res => {
                        if (res.status == 1) {
                            this.logoList = res.data.list
                            this.totalPage = res.data.pageCount
                            if(this.page == 1){
                                this.pagePrepNone = true
                            }
                            if(this.page == this.totalPage){
                                this.pageNextNone = true
                            }else{
                                this.pageNextNone = false
                            }
                        } else {
                            Toast(res.msg);
                        }
                    })
            },
            goNext(){
                if(this.page +1 >this.totalPage){
                    return
                }else{
                    this.page = this.page + 1
                }
                logoList({
                    list_row:this.list_row,
                    page:this.page,
                })
                    .then(res => {
                        if (res.status == 1) {
                            this.logoList = res.data.list
                            this.totalPage = res.data.pageCount
                            if(this.page != 1){
                                this.pagePrepNone = false
                            }
                            if(this.page == this.totalPage){
                                this.pageNextNone = true
                            }
                        } else {
                            Toast(res.msg);
                        }
                    })
            },
            getData() {
                logoList({
                    list_row:this.list_row,
                    page:this.page,
                    cate_id:this.cateId,
                })
                    .then(res => {
                        if (res.status == 1) {
                            this.logoList = res.data.list
                            this.totalPage = res.data.pageCount
                            this.totalCount = res.data.totalCount
                            this.allList = res.data.alllist
                            this.bigCount = res.data.biglist.count
                            this.bigImg = res.data.biglist.url
                            if(this.page == this.totalPage){
                                this.pageNextNone = true
                            }
                        } else {
                            Toast(res.msg);
                        }
                    });
                homeImg().then(res => {
                    if (res.status == 1) {
                        this.imgList = res.data.list
                    } else {
                        Toast(res.msg);
                    }
                });
                logoCate().then(res => {
                        if (res.status == 1) {
                            this.cate = res.data.list
                        } else {
                            Toast(res.msg);
                        }
                    });
            },
        },
        created(){
            this.getData();
            if(this.page == 1){
                this.pagePrepNone = true
            }
        }
    }
</script>
