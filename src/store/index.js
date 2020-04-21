import Vue from 'vue'
import Vuex from 'vuex'
import *as getters from './getters'
import *as actions from './actions'
import *as mutations from './mutations'

Vue.use(Vuex)
const state ={
        //存放的键值对就是所要管理的状态
        user:null,
        isLogin:false,
        token:''
}
export default new Vuex.Store({
	state,
	actions,mutations,
	getters
})
