<template>
    <div style="background-color: #ffffff;">
        <Header />
        <div class="home_content">
            <!--<div class="title1">-->
            <!--案例展示-->
            <!--</div>-->
            <div class="video_box" v-for="(item,index) in videoUrl" :key="index">
                    <video-player  class="video-player vjs-custom-skin"
                                   ref="videoPlayer"
                                   :playsinline="true"
                                   :options="videoUrl[index]"
                    ></video-player>
            </div>

        </div>
        <Footer />
    </div>
</template>
<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import { Toast } from 'vant';
    import { logoList, homeVideo} from "../../http/api.js";
    export default {
        components: {
            Header,
            Footer,
            Toast
        },
        data(){
            return{
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
                    }),
                    homeVideo({
                        list_row:this.list_row,
                        page:this.page,
                        cate_id:this.cateId,
                    })
                        .then(res => {
                            if(res.status == 1){
                            this.videoList = res.data.list
                                this.playerOptions.poster = this.videoList.pic
                                for(let i of  this.videoList){
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
                            } else {
                                Toast(res.msg);
                            }
                        })
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
