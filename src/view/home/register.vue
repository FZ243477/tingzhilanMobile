<template>
    <div ref="homePage" :style='backRight' class="login">
        <div class="welcome">
            <img src="@/assets/img/login/welcome.png" @click="goHome" alt="">
        </div>
        <div class="login-form">
            <div class="login-inp"><label>手机号码</label><input type="text" v-model="mobile" placeholder=""></div>
            <div class="login-inp"><label>密码</label><input type="password" v-model="password" placeholder=""></div>
            <div class="login-inp">
                <label>验证码</label>
                <input type="text" v-model="captcha" style="width: 28%;" placeholder="">
                <label style="float: right;line-height: 1rem;margin-right: 0.5rem;width: 7em;" @click="sms_send">{{codeTips}}</label></div>
            <div class="login-inp"><a @click="register" href="#">立即注册</a></div>
        </div>
        <div class="login-txt"><a @click="goLogin" href="#">立即登录</a>|<a @click="goEditPass" href="#">忘记密码？</a></div>
    </div>
</template>
<script>
    import store from "store";
    import {register,smsSend} from '../../http/api.js'
    export default {
        data() {
            return {
                clientHeight:'',
                captcha:'',
                userinfo:{},
                mobile:'',
                password:'',
                timer:1,
                codeTips:'获取验证码',
                backRight:{
                    backgroundImage:
                        "url(" + require("@/assets/img/login/login.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    backgroundPosition:"0 67%"
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
            goEditPass(){
                this.$router.push({ path: "/editPass" });
            },
            sms_send(){ //获取验证码
                let data={
                    mobile:this.mobile,
                    event:'register'
                }
                smsSend(data).then((res)=>{
                     console.log(res)
                    if(res.status==1){
                        if(this.timer==1){
                            var time=60;
                            var inter=window.setInterval(()=>{
                                this.codeTips="重新获取("+time+"s)";
                                this.timer=0;
                                time--;
                                if(time<0){
                                    window.clearInterval(inter)
                                    this.timer=1;
                                    this.codeTips="获取验证码"
                                }
                            },1000)
                        }
                    }else{
                        this.$vux.toast.text(res.msg, 'middle')
                    }
                })
            },
            goLogin(){
                this.$router.push({ path: "/login" });
            },
            goHome(){
                this.$router.push({ path: "/home" });
            },
            register(){ //注册
                let params={
                    password:this.password,
                    mobile:this.mobile,
                    captcha:this.captcha,
                }
                register(params).then((res)=>{
                    // console.log(res)
                    if(res.status==1){
                        this.$vux.toast.text('注册成功', 'middle')
                        store.set("userinfo",res.data)
                        this.$router.push({ path: "/login" });

                    }else{
                        this.$vux.toast.text(res.msg, 'middle')
                    }
                })
            },
        }
    }
</script>
