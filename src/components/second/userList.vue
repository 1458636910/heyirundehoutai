<template>
	<div class="fillcontain">
        <head-top></head-top>
        <div class="screen">
        	<!--<el-col :span="6">-->
        	<div class="block">
		    <span class="demonstration">开始时间</span>
		    <el-date-picker
		      v-model="value1"
		      type="date"
		      placeholder="选择日期">
		    </el-date-picker>
		  </div>
		  <!--</el-col>-->
		  <!--<el-col :span="6">-->
		   <div class="block">
		    <span class="demonstration">结束时间</span>
		    <el-date-picker
		      v-model="value2"
		      type="date"
		      placeholder="选择日期">
		    </el-date-picker>
		  </div>
		  <!--</el-col>-->
		   <!--<el-col :span="5">-->
		   	
		   	<div class="block1">
		   		<el-input
				  placeholder="请输入昵称"
				  v-model="input1"
				  clearable>
				</el-input>
		   	</div>
		   	<div class="block2">
		   		 <el-button type="primary" icon="el-icon-search" @click='searchList(0)'>搜索</el-button>
		   	</div>
		 
			<!--</el-col>-->
        </div>
        
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  property="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="createTime"
                  label="注册日期"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="nickName"
                  label="用户名"
                  width="300">
                </el-table-column>
                <el-table-column
                  property="code"
                  label="邀请码">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="limit"
                  :page-sizes="[5, 10, 20, 40]"
                  layout="total, prev, pager, next,jumper"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
	import headTop from '../headTop'
	export default {
		data(){
			return{
				tableData: [],
                currentPage:1,
                count:0,
                userGuid:'',
                offset:0,
                limit:24,
                page:0,
                value1:'',
                value2:'',
                input1:''
			}
		},
		components:{
			headTop
		},
		created(){
			this.findList(this.page)
		},
		methods:{
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		        this.limit=val
		      },
		      handleCurrentChange(val) {
		       this.currentPage=val
		       this.offset=(val-1)*this.limit
		       if((this.value1==''||this.value1==null)&&(this.value2==''||this.value2==null)&&this.input1==''){
		       	this.findList(val-1)
		       }else{
		       	this.searchList(val-1)
		       }
		       
		      },
		      findList(page){
		      	var that=this
				this.userGuid=JSON.parse(localStorage.getItem('user')).userGuid
				this.axios({
					url:'http://114.67.94.169:8010/Admin/Admin_getUserList.ashx',
					method:'post',
					data:{userGuid:that.userGuid,page:page},
					transformRequest: function(obj) {  
				        var str = [];  
				        for(var p in obj){  
				            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
				        }  
				        return str.join("&");  
				    },
					headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				}).then(res=>{
					this.tableData=[]
					this.tableData=res.data.items
					this.count=res.data.Count
					for(var i=0;i<this.limit;i++){
						this.tableData[i].index=this.offset+i+1
					}
				}).catch(error=>{
					console.log(error)
				})
		     },
		     searchList(page){
		     	console.log(this.value1)
		     	console.log(this.value2)
		     	if(this.value1!=''&&this.value1!=null){
		     		var time1 = this.value1
					time1=time1.getFullYear() + '-' + (time1.getMonth() + 1) + '-' + time1.getDate() 
					console.log(time1)
					console.log(new Date(time1).getTime())
					
		     	}else{
		     		var time1 = this.value1
		     		time1=''
		     	}
		     	if(this.value2!=''&&this.value1!=null){
		     		var time2 = this.value2
		     		time2=time2.getFullYear() + '-' + (time2.getMonth() + 1) + '-' + time2.getDate()
		     		console.log(time2)
					console.log(new Date(time2).getTime())
		     	}else{
		     		var time2 = this.value2
		     		time2=''
		     	}
				var time3=new Date().getTime()
				console.log(time3)
				if(time1!=''&&time2!=''&&time1>time2){
					this.$message({
						type:'error',
						message:'开始日期不能大于结束日期'
					})
					console.log(time1)
					console.log(time2)
				}else if(time1==''&&time2==''&&this.input1==''){
					this.findList(this.page)
					console.log(111)
				}
				
				else{
					this.axios({
						url:'http://114.67.94.169:8010/Admin/Get_UserListBySearch.ashx',
						method:'post',
						data:{userGuid:this.userGuid,nickname:this.input1,startTime:time1,endTime:time2,page:page},
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
						this.tableData=res.data.items
						this.count=res.data.Count
						for(var i=0;i<this.limit;i++){
							this.tableData[i].index=this.offset+i+1
						}
					}).catch(error=>{
						console.log(error)
					})
				}
		     	
		     }
		}
	}
</script>

<style lang="less" scoped>
	@import '../../style/mixin';
    .table_container{
        padding: 20px;
        padding-left: 40px;
    }
    .screen{
    	display: flex;
    	margin-top: 20px;
    }
    .screen .block{
    	margin-left: 40px;
    	
    }
    .screen .block1{
    	margin-left: 60px;
    	width: 300px;
    }
    .screen .block2{
    	margin-left: 30px;
    }
    .screen .demonstration{
    	color:#606266;
    	font-size: 14px;
    }
</style>