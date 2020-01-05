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
                       <p><span style="font-weight: 900;font-size:20px;">{{item.name}}</span><span style="font-weight: 500;font-size:18px;padding: 0px 10px;display: inline-block;">{{item.title}}</span></p>
                       <p  style="font-size:16px;"><span>滦平县妇幼保健院</span><span style="padding: 0px 10px;display: inline-block;">{{item.title}}</span></p>
                       <p style="font-size:16px;" class="ppoo" :class="{ppo:currentindex==index}"><span>擅长：</span><span @click="showjob(index)">{{item.expertJob}}</span></p>
                       <p><span style="font-size:20px;color:#00BBBB">￥{{item.consultationPrice}}</span><span><Button shape="circle" class="btn" @click="goDescribecondition(index)">问医生</Button></span></p> 
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                singleDoctorList:[],
                currentindex:-1,
            }
        },
         methods:{
             showjob(index){
                this.currentindex=index
            },
            //返回上一层
            tobackdetail(){
                this.$router.push('/consultationHome');
            },
            //问医生
            goDescribecondition(item){
                var zixundoctor =  JSON.stringify(item);
                localStorage.setItem('zixundoctor',zixundoctor);
                this.$router.push('/Describecondition');
            },
            selectDoctor(){
                let url=this.$store.getters.getUrl + "advisory/getAllDoctors.do"
                let _this=this
                 var deptCode =  this.$route.query.depCode;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data: {deptCode},
                    success: function(data) {
                        if(data.code==200){
                            _this.singleDoctorList=data.data
                        }
                    },
                    error: function(data) {
                        // _this.isshowloading = false;
                    }
                });
            }
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
.doctort{
    padding: 10px 5% 10px 5%;
    width: 100%;
    border-bottom: 1px solid #eee;
}
.docto{
    display: inline-block;
    vertical-align: top;
    padding: 0px 0px 0px 5%;
    position: relative;
    width: 85%;
}
.ppoo{
    width:100%;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}    
.ppo{
    overflow:unset;
    text-overflow:unset;
    white-space:unset;
    
}
.avatar{
    vertical-align: top;
    margin-top: 8px;
    width: 14%;
}
.docto p{
    line-height: 2;
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