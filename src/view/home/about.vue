<template>
    <div style="background-color: #ffffff;">
        <Header />
        <div class="home_content">
            <!--<div class="title1" style="margin-bottom: 0.4rem">-->
                <!--关于我们-->
            <!--</div>-->
            <br>
            <p class="zt " style="color:#333333;text-align:left;">关于我们</p>
            <br>
            <img class="about_img" src="@/assets/img/home/1.jpg" alt="">
            <!--<div class="about_title">关于我们</div>-->

            <div class="d mt20">
                <p class="disTit" style="text-align: justify; text-indent: 0.7rem;">  咔嚓鱼视觉创意是汀知兰旗下品牌，
                    企业创办于2011年专注策划编剧、创意拍摄、灵感设计、平面设计团队特别擅长美食领域视觉创意，
                    持续为众多知名品牌餐饮、食品企业提供服务国内美食摄影行业10强品牌。
                </p>
            </div>
            <br>
            <br>

            <p class="zt " style="color:#333333;text-align:left;margin-bottom: 0.2rem;">合作品牌</p>
        </div>
            <img class="about_img" src="@/assets/img/home/partner(1).jpg" alt="">

        <Footer />
    </div>
</template>
<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    export default {
        components: {
            Header,
            Footer,
        },
    }
</script>
