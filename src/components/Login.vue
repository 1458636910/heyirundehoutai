<template>
 <div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>和易润德后台</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import axios from 'axios'
export default {
		data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: true,
			}
		},
		computed:{
			isLogin(){
				if(localStorage.getItem('user')){
					this.$store.commit('userStatus',JSON.parse(localStorage.getItem('user')).userGuid)
				}else{
					this.$store.commit('userStatus',null)
				}
				return this.$store.getters.isLogin
			}
		}
		,
		methods:{
			submitForm(formName){
				this.$refs[formName].validate((ispass)=>{
					if(ispass){
						axios({  
						    method:'post',  
						    url:'http://114.67.94.169:8010/Admin/Admin_Login.ashx',  
						    data:{iphone:this.loginForm.username,pwd:this.loginForm.password},
							 transformRequest: function(obj) {  
							        var str = [];  
							        for(var p in obj){  
							            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
							        }  
							        return str.join("&");  
							    }  ,
		//				   
						    headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
						}).then((res)=>{
						    if(res.data.state==200){
						    	this.$message({
				                        type: 'success',
				                        message: '登录成功'
				                   });
								var data=JSON.parse(res.data.items)
								console.log(data)
								var startTime=new Date().getTime()
								data.startTime=startTime
								data.speed=1800000
								console.log(data)
								localStorage.setItem('user',JSON.stringify(data))
								console.log(JSON.parse(localStorage.getItem('user')).userGuid )
								this.$store.dispatch('setUser',data.userGuid)
								this.$router.push('manage')
						    }else{
									this.$message({
				                        type: 'error',
				                        message: res.data.msg
				                    });
				            }
						});
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				
				})
			}
		},
		beforeRouteEnter:(to,from,next)=>{
          //此时该组件还没被实例化
//        alert(111);       //弹出消息框信息为 undefined
          if(JSON.parse(localStorage.getItem('user'))==null){
//        	next(vm =>{
//	          //此时该组件被实例化了
//	          alert(vm.loginForm.username);         //弹出消息框信息为 hw
//	        })
			next()
          }else{
          	next('/manage')
          }
        
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
