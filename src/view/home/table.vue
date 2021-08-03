<template>
    <div style="background-color: #ffffff;">
        <Header />
        <form style="margin: 0.5rem 0">
            <div class="sub_z">
                <!--<select class="select_1">-->
                    <!--<option value="" style="display: none;" disabled="" selected="">请选择</option>-->
                    <!--<option value="1">1</option>-->
                    <!--<option value="2">2</option>-->
                    <!--<option value="3">3</option>-->
                    <!--<option value="4">4</option>-->
                <!--</select>-->
                <input v-model="name" type="text" placeholder="请输入公司名称" class="input_1">
                <input v-model="content" type="text" placeholder="请输入拍摄内容" class="input_1">
                <input v-model="bookingPrice" type="number" placeholder="预订价格" class="input_1">
                <input v-model="num" type="number" placeholder="请输入拍摄数量" class="input_1">
                <div class="list-item input_1" >
                    <div class="area_left">地区</div>
                    <div class="area_area">
                        <div @click="showPopup" class="area_area_text">{{areaDetail}}</div>
                        <div class=" area-shadow" style="z-index: 99999;" ref="homePage" :id="dis_requ" @click="ToRequirements">
                            <van-area
                                    title=""
                                    class="requirements_user"
                                    :area-list="areaList"
                                    :columns-placeholder="['请选择', '请选择', '请选择']"
                                    @confirm="onConfirm"
                                    @cancel="onCancel"
                                    onClick="event.cancelBubble = true"
                            />
                        </div>
                    </div>
                </div>
                <input v-model="detail" type="text" placeholder="请输入详细地址" class="input_1">
                <input v-model="phone" type="number" placeholder="请输入手机号" class="input_1">
                <!--<div class="select_2" style="margin: 15px auto;">-->
                    <!--<input type="text" placeholder="请输入验证码" class="input_2">-->
                    <!--<div class="yanzheng">获取验证码</div>-->
                <!--</div>-->
                <div class="submit" @click="create">提交</div>
            </div>
        </form>
        <Footer />
    </div>
</template>
<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import areaList from '../../http/area.js'
    import {createOrder} from '../../http/api.js'
    import store from "store";
    export default {
        components: {
            Header,
            Footer,
        },
        data() {
            return {
                areaList,
                areaDetail:'请选择',
                dis_requ:'dis_requ',
                clientHeight:'',
                name:'',
                content:'',
                bookingPrice:'',
                num:'',
                phone:'',
                detail:''
            }
        },
        mounted(){
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
            }
        },
        methods:{
            changeFixed(clientHeight){                        //动态修改样式
                //console.log(clientHeight);
                this.$refs.homePage.style.height = clientHeight+'px';
            },
            ToRequirements(){
                if(!this.userinfo.id){
                    this.$vux.toast.text("请先登录账号", "middle");
                    this.$router.push({ path: "/login" });
                }
                if(this.requirements ==false){
                    this.dis_requ = "dis_requ_show";
                    this.requirements =true
                }else{
                    this.dis_requ = "dis_requ";
                    this.requirements =false
                }
            },
            showPopup() {
                this.show = true;
                this.tabClick = 1;
                if(!this.userinfo.id){
                    this.$vux.toast.text("请先登录账号", "middle");
                    this.$router.push({ path: "/login" });
                }
                if(this.requirements ==false){
                    this.dis_requ = "dis_requ_show";
                    this.requirements =true
                }else{
                    this.dis_requ = "dis_requ";
                    this.requirements =false
                }
            },
            //确定选择城市
            onConfirm(val){
                this.dis_requ = "dis_requ";
                this.requirements =false
                this.tabClick = 0;
                let areaName = ''
                for (var i = 0; i < val.length; i++) {
                    areaName = areaName+(i==0?'':'/')+val[i].name
                }
                this.areaDetail = areaName
            },
            //取消选中城市
            onCancel(){
                this.dis_requ = "dis_requ";
                this.requirements =false
                this.tabClick = 0;
            },
            create(){
                let params={
                    id:this.userinfo.id,
                    name:this.name,
                    content:this.content,
                    bookingPrice:this.bookingPrice,
                    num:this.num,
                    address:this.areaDetail,
                    phone:this.phone,
                    detail:this.detail,
                }
                console.log(params)
                createOrder(params).then((res)=>{
                    // console.log(res)
                    if(res.status==1){
                        this.$vux.toast.text(res.msg, 'middle')
                        this.$router.push({ path: "/task" });
                    }else{
                        this.$vux.toast.text(res.msg, 'middle')
                    }
                })
            }
        },
        created(){
            this.userinfo = store.get("userinfo");
            console.log(this.userinfo)
        }
    }
</script>
