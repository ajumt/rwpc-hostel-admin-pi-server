<template>
  <v-app id="app">
	<router-view></router-view>
  </v-app>
</template>
<script>
// import menu from '@/api/menu';
export default {
	name: 'App',
	created () {
		window.getApp = this;
		var self = this;
		window.getApp.$on('APP_LOADING',function(data){
			self.loading = true;
			if(data!=undefined && data != null)
				self.persistent=data;
		})
		window.getApp.$on('APP_LOADED',function(){
			self.loading = false;
		})
	 },
	data () {
	return {
		snackbar: {
			show: false,
			text: '',
			btncolor: 'pink',
			mode:'',
			timeout:6000,
			position:{x:"right",y:"top"}
		}
	}
	},
}
</script>
