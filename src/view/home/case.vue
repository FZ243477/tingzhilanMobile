<template>
    <div style="background-color: #ffffff;">
        <Header />
        <div class="home_content">
            <!--<div class="title1">-->
                <!--案例展示-->
            <!--</div>-->
            <div class="home_box">
                <div class="home_ab" style="overflow: hidden;" align="center" v-for="(item,index) in logoList"  :key="index">
                    <div style="width: 100%;height: 6.4rem;overflow: hidden;">
                    <img  @click="showToImg(item.id)" style="width:100%;height:auto;" :src="item.url" alt="">
                    </div>
                    <div style="clear: both;"></div>
                    <div class="anli-1-2 zt" style="font-size:13px;text-align: left;margin-top: 0.2rem;">
                        <span style="">{{item.title}}</span><br>
                        {{item.en_title}}
                    </div>
                    <div style="clear: both;"></div>
                </div>
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
        <Footer />
    </div>
</template>
<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import { logoList } from "../../http/api.js";
    export default {
        components: {
            Header,
            Footer,
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
                allList:{}
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
