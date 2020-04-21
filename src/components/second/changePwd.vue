<template>
	<div>
		<headTop></headTop>
		<div class="body_1">
			<el-col :span="12" :offset="10">修改密码</el-col>
			<el-radio-group v-model="labelPosition" size="small">
			</el-radio-group>
			<div style="margin: 20px;"></div>
			<el-col :span="9" :offset="6">
				<el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="formLabelAlign">
				 
					  <!--<el-form-item label="名称" prop='name'>
					  	 <el-col :span="12">
					    <el-input v-model="formLabelAlign.name"></el-input>
					     </el-col>
					  </el-form-item>-->
				  <el-form-item label="原密码" prop='password'>
				    <el-input type='password' v-model="formLabelAlign.password"></el-input>
				  </el-form-item>
				  <el-form-item label="新密码" prop='password1'>
				    <el-input type='password' v-model="formLabelAlign.password1"></el-input>
				  </el-form-item>
				  <el-form-item>
					   <el-button type="primary" @click="submitForm()" class="submit_btn">提交</el-button>
				  </el-form-item>
				</el-form>
			</el-col>
		</div>
	</div>
</template>

<script>
	import headTop from '../headTop.vue'
	export default{
		data(){
			return{
			 	labelPosition: 'right',
		        formLabelAlign: {
		          password: '',
		          password1:''
		        },
	        	rules: {
					password: [
						{ required: true, message: '请输入原密码', trigger: 'blur' }
					],
					password1: [
						{ required: true, message: '请输入新密码', trigger: 'blur' }
					]
				}
			}
		},
		components:{
			headTop
		},
		methods:{
			submitForm(){
				console.log(111)
				var userGuid = JSON.parse(localStorage.getItem('user')).userGuid
				this.axios({
					method:'post',
					url:'http://114.67.94.169:8010/Admin/Admin_updatePwd.ashx',
					data:{userGuid:userGuid,pwd:this.formLabelAlign.password,newpwd:this.formLabelAlign.password1},
					transformRequest: function(obj) {  
					        var str = [];  
					        for(var p in obj){  
					            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
					        }  
					        return str.join("&");  
					    },
				    headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
				}).then(res=>{
					console.log(res)
					if(res.data.state==200){
						this.$message({
							type:'success',
							message:res.data.msg
						})
					}else{
						this.$message({
							type:'error',
							message:res.data.msg
						})
					}
					this.formLabelAlign.password=''
					this.formLabelAlign.password1=''
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	.body_1{
		margin-top: 30px;
	}
</style>