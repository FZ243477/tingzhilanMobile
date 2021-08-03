<template>
    <div class="list">
        <img class="img-item" :src="item.url" v-for="(item,index) in imgList" :key="index" @click="goDetail(item)">
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{

    },
    props: ['imgList'],
}
</script>

<style lang="less" scoped>
    .list{
        width: 100vw;
        margin-top: 0.4rem;
        >.img-item{
            width: 4.48rem;
            height: 2.826667rem;
            border-radius: 0.106667rem;
            margin-top: 0.266667rem;
            margin-left: 0.133333rem;
        }
    }
</style>
