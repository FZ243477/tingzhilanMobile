<template>
        <div>
            <div class="backTop"  @click="backtop">
                <!--<i class="iconfont  icon-jiantou  backTopIconfont" ></i>-->
                拍摄
            </div>

            <div style="width: 90%;border-top: 0.01rem solid #000;margin: 0 auto;"></div>
            <p style="text-align: center;font-size: 14px;margin-bottom: 0.2rem;margin-top: 0.5rem;">COPYRIGHT @ 2018 . ALL RIGHTS RESERVED.</p>
            <p style="text-align: center;font-size: 14px;margin-bottom: 0.2rem;">
                <a style="text-align: center;font-size: 14px;color: #000000" href="https://beian.miit.gov.cn">浙ICP备18042593号-1</a>
            </p>
            <p style="text-align: center;font-size: 14px;margin-bottom:0.5rem;">版权所有 @ 杭州汀知兰文化创意有限公司</p>
        </div>
</template>
<script>
    export default {
        data(){
            return{
                phone:18891948754
            }
        },
        mounted() {
            window.addEventListener("scroll",this.showbtn,true);
        },
        methods:{
            showbtn(){
                let that = this;
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                that.scrollTop = scrollTop
            },
            // backtop(){
            //     var timer = setInterval(function(){
            //         let osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //         let ispeed = Math.floor(-osTop / 5);
            //         document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
            //         this.isTop = true;
            //         if(osTop === 0){
            //             clearInterval(timer);
            //         }
            //     },30)
            // },
            backtop(){
                this.$router.push("/table?id=" + 4);
            }
        }
    }
</script>
