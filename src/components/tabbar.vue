<template>
    <div class="tabbar" style="display: none;height:0px !important">
        <!-- <div class="all" @click="routerlink(0,'/home')">
            <div v-if='index !=0'>
                <div>
                    <img src="../assets/img/tab/tab_1_n.png" alt="">
                </div>
                <p>首页</p>
            </div>
            <div class="active" v-if='index ==0'>
                <div>
                    <img src="../assets/img/tab/tab_1_h.png" alt="">
                </div>
                <p>首页</p>
            </div>
        </div> -->
        <div class="all" @click="routerlink(1,'/classify')">
            <div v-if='index !=1'>
                <div>
                    <span class="iconfont">&#xe612;</span>
                </div>
                <p>分类</p>
            </div>
            <div class="active" v-if='index ==1'>
                <div>
                    <span class="iconfont">&#xe612;</span>
                </div>
                <p>分类</p>
            </div>
        </div>
        <div class="all" @click="routerlink(2,'/favorite')">
            <div v-if='index !=2'>
                <div>
                    <span class="iconfont">&#xe61c;</span>
                </div>
                <p>收藏夹</p>
            </div>
            <div class="active" v-if='index ==2'>
                <div>
                    <span class="iconfont">&#xe61c;</span>
                </div>
                <p>收藏夹</p>
            </div>
        </div>
        <div class="all" @click="routerlink(3,'/mine')">
            <div v-if='index !=3'>
                <div>
                    <span class="iconfont">&#xe61f;</span>
                </div>
                <p>我的</p>
            </div>
            <div class="active" v-if='index ==3'>
                <div>
                    <span class="iconfont">&#xe61f;</span>
                </div>
                <p>我的</p>
            </div>
        </div>
    </div>
</template>
<script>
    import store from "store";
    export default {
        data() {
            return {
                index: 1,
                userinfo: {}
            }
        },
        watch: {
            '$route': 'changerouter'
        },
        methods: {
            routerlink(index, path) {
                if (path != this.$router.path) {
                    this.index = index;
                    this.$router.push({ path: path })
                }
            },
            changerouter() {
                let path = this.$route.fullPath;
                if (path.indexOf('/home') != -1) {
                    this.index = 0;
                } else if (path.indexOf('/classify') != -1) {
                    this.index = 1;
                } else if (path.indexOf('/favorite') != -1) {
                    this.index = 2;
                } else if (path.indexOf('/mine') != -1) {
                    this.index = 3;
                }
            },
        },
        created() {
            this.userinfo = store.get("userinfo");
            // if (this.userinfo &&this.userinfo.is_elme == 1) {
            //     this.index = 1
            // }
            this.changerouter()
        }
    }
</script>
<style lang="scss" scoped>
    @import "../assets/style/global.scss";
    .iconfont{
        font-size:0.48rem;
    }
    .tabbar {
        width: 100%;
        height: 0rem;
        display: flex;
        position: fixed;
        left: 0;
        bottom: 0;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #E7E7E7;
        z-index: 999;
        background-color: #fff;
        .all {
            flex: 1;
            text-align: center;
            color: #BCBABD;

            .active {
                color: $fontColor;
            }
            img {
                height: 0.48rem;
                object-fit: cover;
            }
        }
    }
</style>