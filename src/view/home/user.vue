<template>
    <div style="background-color: #ffffff;">
        <Header />

        <Footer />
    </div>
</template>
<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import {orderList} from '../../http/api.js'
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
            }
        },
        methods:{
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
            }
        },
        created(){
            this.userinfo = store.get("userinfo");
            console.log(this.userinfo)
            this.getData();
        }
    }
</script>
