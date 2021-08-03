<template>
	<div class="index">
        <router-view></router-view>
		<Tabbar></Tabbar>
	</div>
</template>
<script>
import Tabbar from '@/components/tabbar'

export default{
	components:{
		Tabbar
	},
	data(){
		return {

		}
	}
}
</script>
<style>

</style>