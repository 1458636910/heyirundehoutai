<template>
	<div>
		<head-top></head-top>
		<div class="body_1">
			<el-col :span="12" :offset="10">添加用户信息</el-col>
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
				 
				  <el-form-item label="电话号" prop='iphone'>
				    <el-input v-model="formLabelAlign.iphone"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop='password'>
				    <el-input type='password' v-model="formLabelAlign.password"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码" prop='password1'>
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
	import headTop from '../../components/headTop'
	import axios from 'axios'
	export default{
		 data() {
	      return {
	        labelPosition: 'right',
	        formLabelAlign: {
	          iphone: '',
	          password: '',
	          password1:''
	        },
	        rules: {
					iphone: [
			            { required: true, message: '请输入手机号', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
					password1: [
						{ required: true, message: '请再次输入密码', trigger: 'blur' }
					]
				}
	      };
  		 },
		components:{
			headTop,
		},
		methods:{
			submitForm(){
				if(this.formLabelAlign.password&&this.formLabelAlign.password1&&this.formLabelAlign.iphone){
					if(this.formLabelAlign.password==this.formLabelAlign.password1){
						axios({
							method:'post',  
						    url:'http://114.67.94.169:8010/Admin/Add_childadmin.ashx',  
						    data:{userGuid:JSON.parse(localStorage.getItem('user')).userGuid,iphone:this.formLabelAlign.iphone,pwd:this.formLabelAlign.password},
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
						})
					}else{
						this.$message({
	                        type: 'error',
	                        message: '两次密码必须一致'
	                   });
					}
				}else {
						this.$message({
							type: 'error',
							message: '请填写正确的信息',
						});
						return false;
					}
				
			}
		}
	}
</script>

<style>
	.body_1{
		margin-top: 30px;
	}
</style>