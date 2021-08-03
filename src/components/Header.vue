<template>
    <div>
        <div class="head_fix">

        <div class="header_top" >
            <!--<img class="head_left_img" @click="goNav" src="@/assets/img/home/head_img1.png" alt="">-->
            <div class="mobile_btn" @click="goNav" v-bind:class="{ on:navShow}">
                <span class="line1"></span> <span class="line2"></span> <span class="line3"></span>
            </div>
            <img class="head_logo_img" @click="goHome" src="@/assets/img/home/logo.png" alt="">
        </div>
        </div>
        <transition name='fade'>
        <div  ref="homePage" class="header_nav" v-show="navShow" >
            <transition name='fade2'>
            <div class="nav_box " v-show="navShow" :class="{selected:current == 0}" @click="goHome">
                <div class="nav_box_1" >
                    <span>
                        <!--<i class="iconfont  icon-shouyeshouye" ></i>-->
                        首页</span>
                    <img src="@/assets/img/home/nav-jia.png" alt="">
                        <div class="nav_solid"></div>
                </div>
            </div>
            </transition>
            <transition name='fade1'>
                <div class="nav_box" v-show="navShow" style="height:auto !important;" :class="{selected:current == 3}" @click="goHover1">
                    <div class="nav_box_1">
                    <span>
                        <!--<i class="iconfont  icon-lianxiwomen_huaban1" ></i>-->
                        拍摄</span>
                        <img src="@/assets/img/home/nav-jia.png" alt="">
                        <div class="nav_solid"></div>
                    </div>
                    <transition name='fade'>
                        <div v-show="hoverShow1" style="height:2.6rem;">
                            <transition name='fade3'>
                                <div class="nav_box "  v-show="hoverShow1" @click="goTable"  :class="{selected:current == 1}">
                                    <div class="nav_box_1 nav_box_2">
                    <span>
                        <!--<i class="iconfont  icon-fuwuanli" ></i>-->
                        提交订单</span>
                                        <img style="margin-top: 0.6rem;" src="@/assets/img/home/nav-jian.png" alt="">
                                        <div class="nav_solid"></div>
                                    </div>
                                </div>
                            </transition>
                            <transition name='fade4'>
                                <div class="nav_box "  v-show="hoverShow1"  @click="goTask" :class="{selected:current == 1}">
                                    <div class="nav_box_1 nav_box_2">
                    <span>
                        <!--<i class="iconfont  icon-fuwuanli" ></i>-->
                        我的订单</span>
                                        <img style="margin-top: 0.6rem;" src="@/assets/img/home/nav-jian.png" alt="">
                                        <div class="nav_solid"></div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </transition>
                </div>
            </transition>
            <transition name='fade1'>
            <div class="nav_box " style="height:auto !important;"  v-show="navShow" @click="goHover" >
                <div class="nav_box_1">
                    <span>案例展示</span>
                    <img src="@/assets/img/home/nav-jia.png" alt="">
                    <div class="nav_solid"></div>
                </div>
                <transition name='fade'>
                <div v-show="hoverShow" style="height:2.6rem;">
                <transition name='fade3'>
                <div class="nav_box "  v-show="hoverShow" @click="goCase"  :class="{selected:current == 1}">
                    <div class="nav_box_1 nav_box_2">
                    <span>
                        <!--<i class="iconfont  icon-fuwuanli" ></i>-->
                        图片</span>
                        <img style="margin-top: 0.6rem;" src="@/assets/img/home/nav-jian.png" alt="">
                        <div class="nav_solid"></div>
                    </div>
                </div>
                </transition>
                <transition name='fade4'>
                <div class="nav_box "  v-show="hoverShow"  @click="goVideo" :class="{selected:current == 1}">
                    <div class="nav_box_1 nav_box_2">
                    <span>
                        <!--<i class="iconfont  icon-fuwuanli" ></i>-->
                        视频</span>
                        <img style="margin-top: 0.6rem;" src="@/assets/img/home/nav-jian.png" alt="">
                        <div class="nav_solid"></div>
                    </div>
                </div>
                </transition>
                </div>
            </transition>
            </div>
            </transition>
            <transition name='fade1'>
                <div class="nav_box " style="height:auto !important;"  v-show="navShow" @click="goAboutShow" >
                    <div class="nav_box_1">
                    <span>
                        走进咔嚓鱼</span>
                        <img src="@/assets/img/home/nav-jia.png" alt="">
                        <div class="nav_solid"></div>
                    </div>
                    <transition name='fade'>
                        <div v-show="aboutShow" style="height:2.6rem;">
                            <transition name='fade3'>
                                <div class="nav_box "  v-show="aboutShow" @click="goAbout"  :class="{selected:current == 1}">
                                    <div class="nav_box_1 nav_box_2">
                    <span>关于我们</span>
                                        <img style="margin-top: 0.6rem;" src="@/assets/img/home/nav-jian.png" alt="">
                                        <div class="nav_solid"></div>
                                    </div>
                                </div>
                            </transition>
                            <transition name='fade4'>
                                <div class="nav_box "  v-show="aboutShow"  @click="goContact" :class="{selected:current == 1}">
                                    <div class="nav_box_1 nav_box_2">
                    <span>联系我们</span>
                                        <img style="margin-top: 0.6rem;" src="@/assets/img/home/nav-jian.png" alt="">
                                        <div class="nav_solid"></div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </transition>
                </div>
            </transition>
            <!--<transition name='fade2'>-->
            <!--<div class="nav_box" v-show="navShow" :class="{selected:current == 2}" @click="goAbout">-->
                <!--<div class="nav_box_1">-->
                    <!--<span>-->
                        <!--&lt;!&ndash;<i class="iconfont  icon-guanyuwomen2" ></i>&ndash;&gt;-->
                        <!--关于我们</span>-->
                    <!--<img src="@/assets/img/home/nav-jia.png" alt="">-->
                    <!--<div class="nav_solid"></div>-->
                <!--</div>-->
            <!--</div>-->
            <!--</transition>-->
            <!--<transition name='fade1'>-->
            <!--<div class="nav_box" v-show="navShow" :class="{selected:current == 3}" @click="goContact">-->
                <!--<div class="nav_box_1">-->
                    <!--<span>-->
                        <!--&lt;!&ndash;<i class="iconfont  icon-lianxiwomen_huaban1" ></i>&ndash;&gt;-->
                        <!--联系我们</span>-->
                    <!--<img src="@/assets/img/home/nav-jia.png" alt="">-->
                    <!--<div class="nav_solid"></div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</transition>-->
            <transition name='fade1'>
                <div class="nav_box" v-show="loginShow" :class="{selected:current == 3}" @click="goLogin">
                    <div class="nav_box_1">
                    <span>
                        <!--<i class="iconfont  icon-lianxiwomen_huaban1" ></i>-->
                        登录</span>
                        <img src="@/assets/img/home/nav-jia.png" alt="">
                        <div class="nav_solid"></div>
                    </div>
                </div>
            </transition>

            <transition name='fade1'>
                <div class="nav_box" v-show="receiveShow" style="height:auto !important;" :class="{selected:current == 3}" @click="goHover1">
                    <div class="nav_box_1">
                    <span>
                        <!--<i class="iconfont  icon-lianxiwomen_huaban1" ></i>-->
                        订单</span>
                        <img src="@/assets/img/home/nav-jia.png" alt="">
                        <div class="nav_solid"></div>
                    </div>
                    <transition name='fade'>
                        <div v-show="hoverShow1" style="height:2.6rem;">
                            <transition name='fade3'>
                                <div class="nav_box "  v-show="hoverShow1" @click="goPhotoTable"  :class="{selected:current == 1}">
                                    <div class="nav_box_1 nav_box_2">
                    <span>
                        <!--<i class="iconfont  icon-fuwuanli" ></i>-->
                        订单列表</span>
                                        <img style="margin-top: 0.6rem;" src="@/assets/img/home/nav-jian.png" alt="">
                                        <div class="nav_solid"></div>
                                    </div>
                                </div>
                            </transition>
                            <transition name='fade4'>
                                <div class="nav_box "  v-show="hoverShow1"  @click="goReceived" :class="{selected:current == 1}">
                                    <div class="nav_box_1 nav_box_2">
                    <span>
                        <!--<i class="iconfont  icon-fuwuanli" ></i>-->
                        已接列表</span>
                                        <img style="margin-top: 0.6rem;" src="@/assets/img/home/nav-jian.png" alt="">
                                        <div class="nav_solid"></div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </transition>
                </div>
            </transition>
            <transition name='fade1'>
                <div class="nav_box" v-show="outShow" :class="{selected:current == 3}" @click="goLoginOut">
                    <div class="nav_box_1">
                    <span>
                        <!--<i class="iconfont  icon-lianxiwomen_huaban1" ></i>-->
                        退出登录</span>
                        <img src="@/assets/img/home/nav-jia.png" alt="">
                        <div class="nav_solid"></div>
                    </div>
                </div>
            </transition>
        </div>

        </transition>
        <div style="height:1.5rem;"></div>
    </div>
</template>
<script>
    import store from "store";
    export default {
        data() {
            return {
                clientHeight:'',
                navShow:false,
                aboutShow:false,
                hoverShow:false,
                hoverShow1:false,
                loginShow:true,
                outShow:false,
                tableShow:false,
                tableShow1:false,
                receiveShow:false,
                userinfo:{},
                current:0,
                params: {
                    id:"",
                },
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
            '$route' (to, from) {
                location.reload();
                // 对路由变化作出响应...
            },
        },
        methods: {
            changeFixed(clientHeight){
                this.$refs.homePage.style.height = clientHeight+'px';
            },
            goNav(){
                if(this.navShow == false){
                    this.navShow = true
                }else{
                    this.navShow = false
                }
            },
            goContact(){
                this.$router.push("/contact?id=" + 3);
                this.navShow = false
            },
            goAbout(){
                this.$router.push("/home?id=" + 2);
                this.navShow = false
            },
            goCase(){
                this.$router.push("/homeCase?id=" + 0);
                this.navShow = false
            },
            goUser(){
                this.$router.push("/user?id=" + 1);
            },
            goVideo(){
                this.$router.push("/homeVideo?id=" + 1);
                this.navShow = false
            },
            goHome(){
                this.$router.push("/homeCase?id=" + 0);
                this.navShow = false
            },
            goLogin(){
                this.$router.push("/login");
                this.navShow = false
            },
            goLoginOut(){
              this.$vux.toast.text('退出登录成功', 'middle')
                store.remove("userinfo")
                this.tableShow = false
                this.loginShow = true
                this.$router.push("/home?id=" + 0);
                location.reload();
            },
            goTable(){
                this.$router.push("/table?id=" + 4);
                this.navShow = false
            },
            goTask(){
                if(this.userinfo == null) {
                    this.$vux.toast.text('请先登录', 'middle')
                    this.$router.push("/login");
                    this.navShow = false
                }else{
                    this.$router.push("/task?id=" + 4);
                    this.navShow = false
                }

            },
            goPhotoTable(){
                if(this.userinfo == null) {
                    this.$vux.toast.text('请先登录', 'middle')
                    this.$router.push("/login");
                    this.navShow = false
                }else{

                    this.$router.push("/PhotoTable");
                    this.navShow = false
                }
            },
            goReceived(){
                this.$router.push("/Received");
                this.navShow = false
            },
            goHover(){
                if( this.current == 1){
                    this.current = 0
                    this.hoverShow = false
                }else{
                    this.current = 1
                    this.hoverShow = true
                }
            },
            goAboutShow(){
                if( this.current == 1){
                    this.current = 0
                    this.aboutShow = false
                }else{
                    this.current = 1
                    this.aboutShow = true
                }
            },
            goHover1(){
                if( this.current == 4){
                    this.current = 0
                    this.hoverShow1 = false
                }else{
                    this.current = 4
                    this.hoverShow1 = true
                }

                // this.$router.push("/case?id=" + 1);
            }
        },
        created:function () {
            this.userinfo = store.get("userinfo");
        if(this.userinfo === undefined){
                this.tableShow = false
                this.receiveShow = false
                this.loginShow = true
                this.outShow = false
            }else if(this.userinfo.length != 0 && this.userinfo.state == 1){
                this.tableShow = true
                this.receiveShow = false
                this.loginShow = false
                this.outShow = true

            }else if(this.userinfo.length != 0 && this.userinfo.state == 2){
                this.loginShow = false
                this.tableShow = false
                this.receiveShow = true
                this.outShow = true
            }
            let query = this.$route.query;
            this.params.id = query.id;
            if(this.params.id){
                this.current = this.params.id
                if(this.current == 1){
                    this.hoverShow = true
                }
            }
        }
    }
</script>
