<template>
    <div ref="homePage" :style='backRight' class="login">
        <div class="welcome">
            <img src="@/assets/img/login/welcome.png" @click="goHome" alt="">
        </div>
        <div class="login-form">
            <div class="login-inp"><label>账号</label><input v-model="account" type="text" placeholder=""></div>
            <div class="login-inp"><label>密码</label><input v-model="password" type="password" placeholder=""></div>
            <div class="login-inp"><a @click="login" href="#">立即登录</a></div>
        </div>
        <div class="login-txt"><a @click="goRegister" href="#">立即注册</a>|<a @click="goEditPass" href="#">忘记密码？</a></div>
    </div>
</template>
<script>
    import store from "store";
    import { login } from '../../http/api.js'
    export default {
        data() {
            return {
                account:'',
                password:'',
                clientHeight:'',
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
            goHome(){
                this.$router.push({ path: "/home" });
            },
            goEditPass(){
                this.$router.push({ path: "/editPass" });
            },
            login(){
                login({
                    account:this.account,
                    password:this.password
                }).then((res)=>{
                    console.log(res)
                    if(res.status==1){
                        this.$vux.toast.text('登录成功', 'middle')
                        store.set("userinfo",res.data)
                            this.$router.replace({path:'/home'})
                    }else{
                        this.$vux.toast.text(res.msg, 'middle')
                    }
                })
            },
            goRegister(){
                this.$router.push({ path: "/register" });
            }
        }
    }
</script>
