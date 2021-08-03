<template>
    <div style="background-color: #ffffff;">
        <Header />
            <div class="task_list">
                <div class="task_box" v-for="(item,index) in orderList" :key="index">
                    <p style="margin-bottom: 0.5rem;">
                        <span class="task_name">{{item.name}}</span>
                        <span class="task_name">{{item.state}}</span>
                    </p>
                    <table class="task_table">
                        <tr>
                            <td>拍摄内容:</td>
                            <td>{{item.content}}</td>
                        </tr>
                        <tr>
                            <td>预订价格:</td>
                            <td>{{item.booking_price}}</td>
                        </tr>
                        <tr>
                            <td>拍摄数量:</td>
                            <td>{{item.num}}</td>
                        </tr>
                        <tr>
                            <td>地址:</td>
                            <td>{{item.address}}</td>
                        </tr>
                        <tr>
                            <td>详细地址:</td>
                            <td>{{item.detail}}</td>
                        </tr>
                        <tr>
                            <td>手机号码:</td>
                            <td>{{item.phone}}</td>
                        </tr>
                        <div class="task_button" v-if="item.state == '现场已确认' ? true : false" @click="getTask(item.id)">
                            确认完单
                        </div>
                        <div style="clear: both;"></div>
                    </table>
                </div>
                <div v-if="orderList.length == 0" class="noneOrder" ref="homePage" >
                    <p>没有订单</p>
                </div>
            </div>
        <Footer />
    </div>
</template>
<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import {orderList,getEndShoot} from '../../http/api.js'
    import store from "store";
    export default {
        components: {
            Header,
            Footer,
        },
        data() {
            return {
                userinfo:{},
                orderList:{},
                clientHeight:'',
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
        methods:{
            changeFixed(clientHeight){
                clientHeight = clientHeight - 360;
                this.$refs.homePage.style.height = clientHeight+'px';
            },
            getData() {
                let params={
                    id:this.userinfo.id
                }
                orderList(params).then(res => {
                    if (res.status == 1) {
                        this.orderList = res.data
                        console.log(this.orderList)
                    } else {
                        this.$vux.toast.text(res.msg, 'middle')
                        this.$router.push({ path: "/table" });
                    }
                });
            },
            getTask(id){
                let params={
                    id:id,
                    user_id:this.userinfo.id
                }
                getEndShoot(params).then(res => {
                    if (res.status == 1) {
                        this.$vux.toast.text(res.msg, 'middle')
                        location.reload();
                    } else {
                        this.$vux.toast.text(res.msg, 'middle')
                    }
                });
            }
        },
        created(){
            this.userinfo = store.get("userinfo");
            console.log(this.userinfo)
            this.getData();
        }
    }
</script>
