<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router >
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<el-menu-item index="userList">用户列表</el-menu-item>
						<el-menu-item index="shopList">商家列表</el-menu-item>
						<el-menu-item index="foodList">食品列表</el-menu-item>
						<el-menu-item index="orderList">订单列表</el-menu-item>
						<el-menu-item index="adminList">管理员列表</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>添加数据</template>
						<el-menu-item index="addShop">添加商铺</el-menu-item>
						<el-menu-item index="addGoods">添加商品</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>图表</template>
						<el-menu-item index="visitor">用户分布</el-menu-item>
						<!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="adminSet">管理员设置</el-menu-item>
						<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
					</el-submenu>
					<el-submenu index="8">
						<template slot="title"><i class="el-icon-warning"></i>权限设置</template>
						<el-menu-item index="permission" v-if='author'>添加管理员</el-menu-item>
						<el-menu-item index="companyStaff">管理人员列表</el-menu-item>
						<el-menu-item index="changePwd">修改密码</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
    	data(){
    		return{
    			author:true
    		}
    	},
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
		created(){
			if(JSON.parse(localStorage.getItem('user')).type==0){
	    		this.author=true
	    	}else{
	    		this.author=false
	    	}
		},
		mounted(){
			var startTime=JSON.parse(localStorage.getItem('user')).startTime
			var speed=JSON.parse(localStorage.getItem('user')).speed
			var that=this
			this.timer=setInterval(function(){
				 var currentTime = new Date().getTime(); //更新当前时间
	            if(currentTime - startTime > speed){ //判断是否超时
	                localStorage.removeItem("user")
					clearInterval(that.timer); 
					that.$message({
	                	type:'error',
	                	message:'操作超时，请重新登录'
	                })
					setTimeout(function(){
						that.$router.push('/')
					},1000)
	                
	            }
			},1000)
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
</style>
<style >
	.el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title {
    color: #bfcbd9;
}
.el-menu-item, .el-submenu__title {
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #bfcbd9;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    background-color: rgb(50, 64, 87);
}
.el-menu--dark .el-menu-item,.el-menu--dark .el-submenu__title {
    color: #bfcbd9 !important;
}
.el-menu{
	overflow: hidden;
}
.el-menu ul li{
	background: #1f2d3d;
}
</style>
