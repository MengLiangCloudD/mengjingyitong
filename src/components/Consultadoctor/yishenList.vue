<template>
    <div style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;">
            <div class="arrow-icon" @click="tobackdetail" style="color:#fff">
                <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">医生列表</span>
            </div>
        </div>
        <div class="content2">
                <div class="doctort" v-for="(item,index) in singleDoctorList" :key="index">
                    <img class="avatar" src="./../../assets/toux.png" alt="" height="14%">
                    <div class="docto">
                       <p><span style="font-weight: 900;font-size:20px;">{{item.docname}}</span><span style="font-weight: 500;font-size:18px;padding: 0px 10px;display: inline-block;">副主任</span></p>
                       <p  style="font-size:16px;"><span>滦平县妇幼保健院</span><span style="padding: 0px 10px;display: inline-block;">{{item.deptname}}</span></p>
                       <p style="font-size:16px;" class="ppo"><span>擅长：</span><span >妇产生孩子旺sssss手术室手术室所旺我的方订单</span></p>
                       <p><span style="font-size:20px;color:#00BBBB">￥68</span><span><Button shape="circle" class="btn" @click="goDescribecondition(item)">问医生</Button></span></p> 
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                singleDoctorList:[]
            }
        },
         methods:{
            //返回上一层
            tobackdetail(){
                this.$router.push('/consultationHome');
            },
            //问医生
            goDescribecondition(item){
                var zixundoctor =  JSON.stringify(item);
                localStorage.setItem('zixundoctor',zixundoctor);
                this.$router.push('/consulOrder');
            },
            //查询对应医生
            selectDoctor(){
                let _this = this;
                var depcodes =  _this.$store.getters.getdepcodes;
                var url = _this.$store.getters.getUrl +'depart/DepartDoctors.do';
                let ajaxTimeOut=$.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    // async: false,
                    data:{
                        // depCode:depcodes,
                        depCode:"1001"
                    },
                    success:function(data){
                    //清空当前显示的医生列表
                    _this.isshowloading=false
                    _this.singleDoctorList = [];
                        var arr =data.data;
                        for(var i=0;i<arr.length;i++){
                            if(arr[i]!=""){
                                var arr1 = JSON.parse(arr[i])
                                for(var j=0;j<arr1.length;j++){
                                    _this.singleDoctorList.push(arr1[j])
                                }
                            }
                        }
                    },
                    error:function(data){
                    _this.isshowloading=false
                    },
                    complete: function (XMLHttpRequest, status) { //当请求完成时调用函数
                        if (status == 'timeout') {//status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
                                ajaxTimeOut.abort(); //取消请求
                                
                                _this.$Modal.warning({     //超时提示：网络不稳定
                                            title: '友情提示',
                                            content: '请求超时',
                            });
                        }
                    } 
                })
            },
        },
        mounted() {
            this.selectDoctor();
        },
    }
</script>

<style scoped>
.tittle {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
  position: relative;
  font-weight: 600;
  
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.doctort{
    padding: 10px 5% 10px 5%;
    width: 100%;
    border-bottom: 1px solid #eee;
}
.avatar{
    vertical-align: top;
    margin-top: 8px;
    width: 14%;
}
.docto{
    display: inline-block;
    vertical-align: top;
    padding: 0px 0px 0px 5%;
    position: relative;
    width: 85%;
}
.docto p{
    line-height: 2;
}
.ppo{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:100%;
    display: inline-block;
    vertical-align: middle;
}
.btn{
    position: absolute;
    bottom: 0;
    right: 5%;
    background: #00BBBB;
    color: #ffffff;
    width: 100px;
}
</style>