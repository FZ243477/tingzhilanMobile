<template>
    <div style="background-color: #ffffff;">
        <Header />
        <!--<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">-->
            <!--&lt;!&ndash;<van-swipe-item v-for="(image, index) in images" :key="index">&ndash;&gt;-->
                <!--&lt;!&ndash;<img style="max-height: 12rem;min-width: 100%;width: 100%;height: auto;" v-lazy="image" />&ndash;&gt;-->
            <!--&lt;!&ndash;</van-swipe-item>&ndash;&gt;-->
            <!--<van-swipe-item v-for="(item,index) in bannerList" :key="index">-->
            <!--<img style="max-height: 12rem;min-width: 100%;width: 100%;height: auto;" :src="item.banner_pic" />-->
         <!--</van-swipe-item>-->
        <!--</van-swipe>-->
        <div class="home_content">

            <div class="logo_value" :style='backLogo'></div>
            <p class="zt bt" style="color:#333333;text-align:center;">了解咔嚓鱼</p>
            <div class="d mt20">
                <p class="disTit">咔嚓鱼视觉创意是汀知兰旗下品牌，企业创办于2011年专注策划编剧、创意拍摄、灵感设计、平面设计。
                    <br>
                    <img style="width: 100%;margin-top: 0.2rem;margin-bottom: 0.2rem;" src="@/assets/img/home/home1.jpg" alt="">
                      <br>
                    团队特别擅长美食领域视觉创意，持续为众多 <br>知名品牌餐饮、食品企业提供服务，国内美食摄影行业10强品牌；源源不断为项目方输出优质创意，累计服务品牌800+，帮助转化成交额破20亿。</p>
            </div>
            <br>
            <br>
            <br>
            <p class="zt bt" style="color:#333333;text-align:center;">一站式服务体系</p>
            <br>
            <br>
            <div class="zf fwyuan zt" style="font-weight:700;">
                <p style="height:40px;"></p>
                <p style="line-height: 1.4;">
                    菜品营销<br>
                </p>
                <p class="ztyx" style="font-size:0.2rem;color:#595757;">
                    Brand marketing
                </p>
            </div>
            <div style="float: left;width:0.6rem;height:1rem; "></div>
            <div class="zf fwyuan zt" style="font-weight:700;">
                <p style="height:40px;"></p>
                <p style="line-height: 1.4;">
                    品牌策划<br>
                </p>
                <p class="ztyx" style="font-size:0.2rem;color:#595757;">
                    Brand planning
                </p>
            </div>
            <div style="float: left;width:0.6rem;height:1rem; "></div>
            <div class="zf fwyuan zt" style="font-weight:700;">
                <p style="height:40px;"></p>
                <p style="line-height: 1.4;">
                    视觉设计<br>
                </p>
                <p class="ztyx" style="font-size:0.2rem;color:#595757;">
                    Visual design
                </p>
            </div>
            <br>  <br>
            <div style="clear: both;height:0.5rem;"></div>
            <div class="zf fwyuan zt" style="font-weight:700;">
                <p style="height:40px;"></p>
                <p style="line-height: 1.4;">
                    策划编剧<br>
                </p>
                <p class="ztyx" style="font-size:0.2rem;color:#595757;">
                    Plan writing
                </p>
            </div>
            <div style="float: left;width:0.6rem;height:1rem; "></div>
            <div class="zf fwyuan zt" style="font-weight:700;">
                <p style="height:40px;"></p>
                <p style="line-height: 1.4;">
                    创意拍摄<br>
                </p>
                <p class="ztyx" style="font-size:0.2rem;color:#595757;">
                    Creative
                </p>
            </div>
            <div style="float: left;width:0.6rem;height:1rem; "></div>
            <div class="zf fwyuan zt" style="font-weight:700;">
                <p style="height:40px;"></p>
                <p style="line-height: 1.4;">
                    美食摄影<br>
                </p>
                <p class="ztyx" style="font-size:0.2rem;color:#595757;">
                   photography
                </p>
            </div>
            <div style="clear: both;height:0.5rem;"></div>
            <div class="d mt20">
                <p class="disTit" style="text-align: justify; text-indent: 0.7rem;">咔嚓鱼为生意塑造品牌，通过全方位服务体系，让小生意成为大品牌、强品牌。
                    我们通过菜品营销、品牌策划、视觉设计、策划编剧、创意拍摄、美食摄影六大板块，为企业延伸品牌思想，
                    定位品牌精神，输出品牌视觉，打造品牌空间，从理论到落地，从入市到营销，为企业提供全案一站式服务体系。
                </p>
            </div>
            <br>
            <br>
            </div>
            <div class="team_value" :style='backRight'>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <p class="zt bt" style="text-align:left;color:#ffffff;font-weight: 700;font-size: 30px;">我们的团队</p>
                <p class="zt bt" style="text-align:left;color:#ffffff;font-weight: 700;margin-top: 0.1rem;">50名精英创意师与你</p>
                <p class="zt bt" style="text-align:left;color:#ffffff;font-weight: 700;">一起创造成功</p>
                <div class="d " style="width: 90%;margin: 0 auto;margin-top: 0.1rem;">
                    <p class="disTit" style="color: #ffffff;   text-align: justify; font-size: 14px;
    line-height: 1.8;">咔嚓鱼的核心优势，
                        以优质的服务专业化标准和流程管控，一流的摄影师、设计团队。始终坚持品牌就要为企业创造更多收益的原则，
                        我们的精英创意团队立足于市场实际情况，从高处布局，从落地着手，为品牌创造最有差异化的独特核心价值，
                        为企业策划实施全案一站式品牌服务。
                    </p>
                </div>
            </div>
        <div style="width: 100%;background-color:#fdcc27; ">
        <div class="d " style="width: 90%;margin: 0 auto;">
            <br>
            <br>
            <br>
            <p class="zt " style="text-align:left;color:#000;font-weight: 700;font-size: 30px;">我们的理念</p>
            <p class="zt " style="text-align:left;color:#000;font-weight: 700;margin-top: 0.1rem;">有种信仰叫专注，</p>
            <p class="zt " style="text-align:left;color:#000;font-weight: 700;">我们专注于技术与设计的完美结合</p>
            <p class="disTit" style="color: #000;text-align: justify; font-size: 14px;line-height: 1.8;margin-top: 0.1rem;">咔嚓鱼的核心优势，
                以优质的服务专业化标准和流程管控，一流的摄影师、设计团队。始终坚持品牌就要为企业创造更多收益的原则，
                我们的精英创意团队立足于市场实际情况，从高处布局，从落地着手，为品牌创造最有差异化的独特核心价值，
                为企业策划实施全案一站式品牌服务。
            </p>
            <br>
            <br>
            <br>
        </div>
        </div>
        <img src="@/assets/img/home/KAC_7990.jpg" style="width: 100%;display: block;" alt="">
        <img src="@/assets/img/home/KAC_4915.jpg" style="width: 100%;" alt="">
        <div style="width: 90%;margin: 0 auto;">
            <br>
            <br>
            <p class="zt " style="text-align:left;color:#000;font-weight: 700;font-size: 30px;">美食摄影</p>
            <p class="zt " style="text-align:left;color:#000;font-weight: 700;margin-top: 0.1rem;margin-bottom: 0.3rem;">不一样的拍摄不一样的菜品</p>
            <p class="disTit" style="color: #000;text-align: justify; font-size: 14px;line-height: 1.8;margin-top: 0.1rem;">
                美食摄影要求专业，不是所有的摄影师都可以拍摄美食，而我们拥有着国内顶尖的专业美食摄影师团队，
                基于千万次的美食摄影经验，会站在客户的角度思考，提供专业的造型建议。摄影师们每时每刻都在突破自己，用视觉创意去还原美食的最高品质。
            </p>
            <br>
            <br>
        </div>
        <img src="@/assets/img/home/xx.jpg" style="width: 100%;" alt="">
        <div style="width: 90%;margin: 0 auto;">
            <br>
            <br>
            <p class="zt " style="text-align:left;color:#000;font-weight: 700;font-size: 30px;">视觉设计</p>
            <p class="zt " style="text-align:left;color:#000;font-weight: 700;margin-top: 0.1rem;margin-bottom: 0.3rem;"></p>
            <p class="disTit" style="color: #000;text-align: justify; font-size: 14px;line-height: 1.8;margin-top: 0.1rem;">
                专注做好每一件事：品牌形象策划设计。咔嚓鱼不设业务部；全程由资深创作人员亲自沟通，确保内外部沟通高效，
                准确的表现品牌诉求。对每一个案子都精益求精，
                而非大规模经营的流水线式低端作业。众多的成功案例和客户好评证明了7D是中国最专业的策划设计公司之一。
            </p>
            <br>
            <br>
        </div>
        <div style="clear: both;height:.5rem;"></div>
        <p class="zt bt" style="color:#333333;text-align:center;">他们是我们的骄傲</p>
        <div class="logo_p" :style='backP'></div>

            <!--<div class="title1">-->
                <!--列表多图-->
            <!--</div>-->
            <!--<div class="home_box">-->
                <!--<div class="home_b" align="center" v-for="(item,index) in logoList"  :key="index">-->
                <!--<img :src="item.url" alt="">-->
                 <!--</div>-->
            <!--</div>-->

        <div>
        </div>

        <img src="@/assets/img/home/00002.jpg" style="width: 100%;display: block;" alt="">
        <br>
        <br>
        <p class="zt bt" style="color:#333333;text-align:center;">加入我们</p>
        <div style="width: 90%;margin: 0 auto;">
            <br>

            <p class="disTit" style="color: #000;text-align: center; font-size: 14px;line-height: 1.8;margin-top: 0.1rem;">
                为理想去努力， <br>为青春而奋斗， <br>
                理想不是虚无缥缈的鸡汤， <br>
                而是能够脚踏实地触碰到的目标。 <br>
                生活不可能永远是轻松的， <br>
                但是它永远不会辜负每一个认真生活的人。 <br>在这里， <br>所有成果都会有公正的评判， <br>所有付出都会有相应的回报。
                <br>
                加入我们， <br>与多名满怀创意的人士一起， <br>共同开辟新的辉煌。
            </p>
            <br>
            <br>
        </div>
        <Footer />
    </div>
</template>
<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import store from "store";
    import { Search, Swipe, SwipeItem, NavBar,Toast,Dialog } from 'vant';
    import { Swiper, SwiperItem,Loading } from "vux";
    import { logoList,phoneBanner } from "../../http/api.js";
    export default {
        components: {
            Header,
            Footer,
            Swiper,
            SwiperItem,
            Loading,
            Search,
            Swipe,
            SwipeItem,
            NavBar,
            Toast
        },
        data() {
            return {
                backRight:{
                    backgroundImage:
                        "url(" + require("@/assets/img/home/11111.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% auto",
                    backgroundPosition:"0 67%"
                },
                backP:{
                    backgroundImage:
                        "url(" + require("@/assets/img/home/partner.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% auto",
                    backgroundPosition:"0 67%"
                },
                backLogo:{
                    backgroundImage:
                        "url(" + require("@/assets/img/home/1.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% auto",
                    backgroundPosition:"0 67%"
                },
                images:[
                    '@/assets/img/home/5003.png',
                    '@/assets/img/home/5003.png',
                    '@/assets/img/home/5003.png',
                    '@/assets/img/home/5003.png',
                ],
                bannerList:{},
                cateList:{},
                logoList:{},
                list_row:10,
                page:1,
                cateId:1,
                userinfo: {},
            }
        },
        methods: {
            getData() {

                logoList({
                    list_row:this.list_row,
                    page:this.page,
                    cate_id:this.cateId,
                })
                    .then(res => {
                        if (res.status == 1) {
                            this.logoList = res.data.list
                        } else {
                            Toast(res.msg);
                        }
                    });
                phoneBanner({
                })
                    .then(res => {
                        if (res.status == 1) {
                            this.bannerList = res.data.list
                        } else {
                            Toast(res.msg);
                        }
                    })
            },
        },
        created(){
            //this.userinfo = store.get("userinfo");
            this.getData();
        }
    }
</script>
