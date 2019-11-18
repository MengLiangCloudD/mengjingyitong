<template>
    <div style="height:100%;overflow: auto;">
        <div class="title">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
            预约列表
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //预约住院数据
                hospitaList:[]
            }
        },
        methods:{
            //返回上一层
            tobackdetail(){
                // this.$router.push('/Historicpatients');
            },
            //请求住院数据
            posthospitaList(){
                var that = this;
                var url  = that.$store.getters.getUrl+'.do'
                let ajaxTimeOut=$.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data:{},
                    success: function(data) {
                    },
                    error:function(data){
                    },
                    complete: function (XMLHttpRequest, status) { //当请求完成时调用函数
                        if (status == 'timeout') {//status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
                        ajaxTimeOut.abort(); //取消请求
                        
                        that.$Modal.warning({     //超时提示：网络不稳定
                            title: '友情提示',
                            content: '请求超时',
                        });
                        }
                    }
                })
            }
        },
        mounted() {
            
        },
        created() {
            
        },
    }
</script>

<style scoped>
.title{
  background: rgb(0, 187, 187);
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: white;
  position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
  
}
</style>