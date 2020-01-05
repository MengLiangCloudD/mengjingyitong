<template>
    <div style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">选择患者</span>
            </div>
        </div>
        <div class="content">
            <p style="text-align: left;font-size:22px;padding: 10px 5%;padding-left:5%;font-weight: 900">请选择患者信息</p>
            <div class="content1">
                <div class="Patient"  v-for="(item,index) in Patient" :key="index" @click="selects(index)">
                    <p><span style="font-weight: 900">{{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>
                        {{item.sex}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <!-- {{jsGetAge(item.birthdate)}} -->
                        24岁
                    </span></p>
                    <p><span>{{item.idno}}</span><span style="position: absolute;right: 15px;">{{item.phone}}</span></p>
                </div>
            </div>
            <div class="content1">
                <div class="Patient1" style="text-align: center;" @click="goauthentication()">
                    <p><svg t="1566457223344" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4050" width="50" height="50"><path d="M853.95951925 475.5066105h-310.08967642v-300.83326917c0-13.88461268-13.88461268-32.39742862-32.39742936-32.39742862-18.51281666 0-32.39742862 18.51281666-32.39742861 37.02563333v300.83326844H178.2417157c-18.51281666-4.62820399-37.02563333 13.88461268-37.02563262 32.39742934s18.51281666 32.39742862 32.39742863 32.39742861h300.83326916v300.83326845c4.62820399 18.51281666 18.51281666 37.02563333 37.02563261 37.02563334s32.39742862-18.51281666 32.39742935-32.39742862v-305.46147317h305.46147243c18.51281666 0 32.39742862-18.51281666 32.39742934-32.39742861s-9.25640796-37.02563333-27.76922535-37.02563333z" fill="#e6e6e6" p-id="4051"></path></svg></p>
                    <p>添加患者</p>
                </div>
            </div>
            <div class="content1">
                <div class="But">
                    <Button shape="circle" class="circle" @click="goConsulOrder()">下一步</Button>
                </div>  
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"selectionpatients",
        data() {
                return {
                    Patient:[],
                    postermen:{}
                }
        },
        methods:{
            //返回上一层
            tobackdetail(){
               this.$router.push('/describecondition');
            },
            //选择患者
            selects(index){
                var Patien = document.getElementsByClassName('Patient');
                for(var i = 0;i<Patien.length;i++){
                    Patien[i].style.border = '1px solid #ddd';
                }
                Patien[index].style.border  = '1px solid  #28b8a1'
                this.postermen=this.Patient[index];
            },
            //下一步
            goConsulOrder(){
                localStorage.setItem("patientchatstate","");
                localStorage.setItem("postermen",JSON.stringify(this.postermen));
                this.$router.push('/ConsulOrder'); 
                // let url=this.$store.getters.getUrl+"#/consultadoctor"
                // window.location.href=url
            },
            //添加就诊人
            goauthentication(){
                this.$router.push('/authentication'); 
            },
            //查询患者就诊卡
            getAllcards(){
                    var url = this.$store.getters.getUrl + "card/getAllCards.do";
                    this.doctorType = [];
                    var doctorType = this.doctorType;
                    var _this = this;
                    var code = this.code;
                    var openid = localStorage.getItem("openid");
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: false,
                        data: { openid: openid },
                        success: function(data) {
                        _this.isshowloading=false;
                        //  _this.$Loading.finish();
                        //返回回来的数据
                        var maycard=[];
                        if(data.status==1&&data.data.length!==0){
                            for(var i =0;i<data.data.length;i++){
                                if(data.data[i].stauts==1){
                                    maycard.push(data.data[i])
                                }
                            }
                            _this.Patient = maycard;
                        }else{
                            _this.Patient = [];
                        }
                        
                        },
                        error: function(data) {
                        // _this.$Loading.finish();
                        }
                    });
            },
            //通过出生日期计算年龄
            jsGetAge(strBirthday) {
                var returnAge;
                var strBirthdayArr = strBirthday.split("-");
                var birthYear = strBirthdayArr[0];
                var birthMonth = strBirthdayArr[1];
                var birthDay = strBirthdayArr[2];

                var d = new Date();
                var nowYear = d.getFullYear();
                var nowMonth = d.getMonth() + 1;
                var nowDay = d.getDate();

                if (nowYear == birthYear) {
                    returnAge = 0;//同年 则为0岁
                }
                else {
                    var ageDiff = nowYear - birthYear; //年之差
                    if (ageDiff > 0) {
                        if (nowMonth == birthMonth) {
                            var dayDiff = nowDay - birthDay;//日之差
                            if (dayDiff < 0) {
                                returnAge = ageDiff - 1;
                            }
                            else {
                                returnAge = ageDiff;
                            }
                        }
                        else {
                            var monthDiff = nowMonth - birthMonth;//月之差
                            if (monthDiff < 0) {
                                returnAge = ageDiff - 1;
                            }
                            else {
                                returnAge = ageDiff;
                            }
                        }
                    }
                    else {
                        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                    }
                }
                return returnAge;//返回周岁年龄

            }
        },
        mounted(){
            var Patien = document.getElementsByClassName('Patient');
            Patien[0].style.border  = '1px solid  #28b8a1';
            this.postermen=this.Patient[0];
        },
        created(){
            this.getAllcards();
        }
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
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.content1{
    /* margin-top: 20px; */
    text-align: center;
}
.Patient{
    width: 90%;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: inline-block;
    text-align: left;
    padding: 10px 15px;
    font-size: 16px;
    position: relative;
    margin-top: 20px;
}
.Patient p{
    line-height: 2.3;
}
.Patient p span{
    /* display: inline-block */
}
.Patient1{
    width: 90%;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: inline-block;
    text-align: center;
    padding: 10px 15px;
    font-size: 16px;
    position: relative;
     margin-top: 20px;
}
.Patient1 p{
    line-height: 1;
}
.circle{
    width: 90%;
    background: #28b8a1;
    color: #ffffff;
    font-size: 16px;
    padding: 8px 0;
}
.But{
    text-align: center;
    padding: 60px 0 40px 0;
    
}
</style>