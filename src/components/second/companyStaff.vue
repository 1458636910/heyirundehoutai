<template>
	<div>
		<head-top></head-top>
		<!--<el-col :span="14" :offset='5'>-->
			<el-table
		    :data="tableData"
		    highlight-current-row
		    style="width: 100%">
		    <el-table-column
                  width="50"
                  lable='序号'
                  align='center'
                  type='index'
                  >
                </el-table-column>
		    <el-table-column
		      label="日期"
		      width="200"
		      align='center'
		      >
		      <template slot-scope="scope">
		        <i class="el-icon-time"></i>
		        <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="账号"
		      width="200"
		      align='center'
		      >
		      <template slot-scope="scope">
		        <!--<el-popover trigger="hover" placement="top">-->
		          <p> {{ scope.row.iPhone }}</p>
		          <!--<p>住址: {{ scope.row.address }}</p>-->
		          <!--<div slot="reference" class="name-wrapper">
		            <el-tag size="medium">{{ scope.row.name }}</el-tag>
		          </div>-->
		        <!--</el-popover>-->
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="类型"
		      width="200"
		      align='center'>
		      <template slot-scope="scope">
		        {{scope.row.type}}
		      </template>
		    </el-table-column>
		    <el-table-column label="操作" v-if='author' align='center'width="200">
		      <template slot-scope="scope" v-if='scope.row.type=="普通管理员"'>
		        <!--<el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
		          <el-switch active-text='启用' inactive-text='禁用'  v-model='scope.row.isdel' :active-value='0' :inactive-value='1' @change='isAble(scope.$index,scope.row)' ></el-switch>
		      </template>
		    </el-table-column>
		  </el-table>	
		<!--</el-col>-->
	</div>
</template>

<script>
	import headTop from '@/components/headTop'
	export default {
		components:{
			headTop
		},
	    data() {
	      return {
	      	value1:true,
	      	isShow:true,
	      	arr:0,
	      	author:true,
	        tableData: [{
	          date: '2016-05-02',
	          name: '王小虎',
	      	type:'普通用户',
	          address: '上海市普陀区金沙江路 1518 弄',
	          isShow:true,
	        }, {
	          date: '2016-05-04',
	          name: '王小虎',
	          type:'普通用户',
	          address: '上海市普陀区金沙江路 1517 弄',
	           isShow:true,
	        }, {
	          date: '2016-05-01',
	          name: '王小虎',
	          type:'普通用户',
	          address: '上海市普陀区金沙江路 1519 弄',
	          isShow:true,
	        }, {
	          date: '2016-05-03',
	          name: '王小虎',
	          type:'普通用户',
	          address: '上海市普陀区金沙江路 1516 弄',
	           isShow:true,
	        }]
	      }
	    },
	    created(){
	    	var userGuid=JSON.parse(localStorage.getItem('user')).userGuid
	    	if(JSON.parse(localStorage.getItem('user')).type==0){
	    		this.author=true
	    	}else{
	    		this.author=false
	    	}
	    	this.axios({  
				    method:'post',  
				    url:'http://114.67.94.169:8010/Admin/get_adminList.ashx',  
				    data:{userGuid:userGuid},
					 transformRequest: function(obj) {  
					        var str = [];  
					        for(var p in obj){  
					            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
					        }  
					        return str.join("&");  
					    },
				    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				}).then(res=>{
					if(res.data.status==200){
						this.$message({
							type:'success',
							message:'查看成功'
						})
						var data=res.data.items
						this.tableData=data
						var type=[]
						for(var i=0;i<this.tableData.length;i++){
							if(this.tableData[i].type==1){
								this.tableData[i].type='普通管理员'
								this.isShow=true
							}else if(this.tableData[i].type==0){
								this.tableData[i].type='超级管理员'
								this.isShow=false
							}
							console.log(this.tableData)
						}
					}
				}).catch(error=>{
					console.log(error)
				})
	    },
	    methods:{
	      handleEdit(index, row) {
	        console.log(index, row);
	      },
	      isAble(index,row){
	      	console.log(index,row)
	      	var userGuid=JSON.parse(localStorage.getItem('user')).userGuid
	      	if(row.isdel==1){
	      		this.axios({  
				    method:'post',  
				    url:'http://114.67.94.169:8010/Admin/del_childadmin.ashx',  
				    data:{childGuid:row.userGuid,userGuid:userGuid},
					 transformRequest: function(obj) {  
					        var str = [];  
					        for(var p in obj){  
					            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
					        }  
					        return str.join("&");  
					    },
				    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				}).then(res=>{
					if(res.data.status==200){
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
				})
	      	}else{
	      		this.axios({  
				    method:'post',  
				    url:'http://114.67.94.169:8010/Admin/quxiao_deladmin.ashx',  
				    data:{childGuid:row.userGuid,userGuid:userGuid},
					 transformRequest: function(obj) {  
					        var str = [];  
					        for(var p in obj){  
					            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
					        }  
					        return str.join("&");  
					    },
				    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				}).then(res=>{
					if(res.data.status==200){
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
				})
	      	}
	      },
	      handleDelete(index, row) {
	        console.log(index, row);
	        this.tableData.splice(index,1)
	      }
	    }
	  }
</script>

<style>
	.el-table::before{
		height: 0 !important;
	}
	.el-table{margin: 20px;}
</style>