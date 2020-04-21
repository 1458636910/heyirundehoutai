import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import manage from '@/components/Manage'
import home from '@/components/second/home'
import permisssion from '@/components/second/permission'
import companyStaff from '@/components/second/companyStaff'
import userList from '@/components/second/userList'
import changePwd from '@/components/second/changePwd'
Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta:{
    		require:false
    	},
    },{
    	path:'/manage',
    	component:manage,
    	meta:{
    		require:true
    	},
    	children:[
	    	{
	    		path:'',
	    		component:home,
	    		meta:[]
	    	},
	    	{
	    		path:'/userList',
	    		component:userList,
	    		meta:['数据管理','用户列表']
	    	},
	    	{
	    		path:'/permission',
	    		component:permisssion,
	    		meta:['权限设置','添加管理员']
	    	},
	    	{
	    		path:'/companyStaff',
	    		component:companyStaff,
	    		meta:['权限设置','管理人员列表']
	    	},
	    	{
	    		path:'/changePwd',
	    		component:changePwd,
	    		meta:['权限设置','修改密码']
	    	}
    	]
    }
  ]
})
router.beforeEach((to,from,next)=>{
	console.log()
	if(to.matched.some((item)=>item.meta.require)){
		if(localStorage.getItem('user')!=null){
			next(true)
		}else{
			next('/')
		}
	}else{
		next()
	}
})
export default router
