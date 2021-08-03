<template>
    <div style="background-color: #ffffff;">
        <Header />
        <img src="@/assets/img/home/6.jpg" style="width: 100%;" alt="">
        <div class="home_content">
            <div class="title1">
                留言板
            </div>
            <div class="message">
                <div class="message_box">
                    <i class="iconfont  icon-xingming" ></i>
                    <input type="text" v-model="name" placeholder="姓名(必填)">
                </div>
                <div class="message_box">
                    <i class="iconfont  icon-youxiang" ></i>
                    <input type="text" v-model="email"  placeholder="邮箱">
                </div>
                <div class="message_box">
                    <i class="iconfont  icon-dianhua1" style="font-size: 20px;" ></i>
                    <input type="text" v-model="phone"  placeholder="电话">
                </div>
                <div class="message_box2" >
                    <i class="iconfont  icon-neirong2" style="padding-top: 0.1rem;"></i>
                    <textarea type="text" v-model="content"  placeholder="内容">
                    </textarea>
                </div>

                <div @click="submit" class="submit_message">
                    提交
                </div>
            </div>
            <div class="qrCodeBox" >
                <img src="@/assets/img/home/qrCode.jpg" style="width: 40%;" alt="">
                <img src="@/assets/img/home/qrCode.jpg" style="width: 40%;" alt="">
            </div>        <div style="clear: both;margin-bottom: 0.4rem;"></div>

        </div>
        <Footer />
    </div>
</template>
<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import { message } from "../../http/api.js";
    export default {
        components: {
            Header,
            Footer,
        },
        data() {
            return {
                name:'',
                email:'',
                phone:'',
                content:'',
            }
        },
        methods:{
            submit() {
                var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if(this.email != '' && !regEmail.test(this.email)){
                    this.$toast('邮箱格式不正确')
                    return
                }
                var reg = /^1[0-9]{10}$/
                if(this.phone != '' && !reg.test(this.phone)){
                    this.$toast('请输入正确的手机号')
                    return
                }
                message({
                    name:this.name,
                    email:this.email,
                    phone:this.phone,
                    content:this.content
                }).then(res => {
                    if(res.status ==1){
                        this.$vux.toast.text(res.msg, "middle");
                    }else{
                        this.$vux.toast.text(res.msg, "middle");
                    }
                    })
            },
        }
    }
</script>
