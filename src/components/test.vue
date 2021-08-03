<template>
  	<h1 @click="change">click</h1>
</template>
<script>
export default{
    data(){
        return {
            
        }
    },
    watch:{
        
    },
    methods:{
        change(){
            // console.log(this.$emit)
            this.$emit('getMessage', '我是父组件！')
        }
    },
    created(){
        
    },
    mounted(){
        // console.log(this)
        // this.$emit('getMessage', '我是父组件！')
    }
}
</script>

<style lang="less">
    
</style>