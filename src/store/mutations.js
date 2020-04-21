export const userStatus=(state,user1)=>{
	if(user1){
		state.user=user1
		state.isLogin=true
	}else{
		localStorage.setItem(userGuid,null)
		state.isLogin=false
		state.token=''
		state.user=null
	}
}
