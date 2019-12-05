<template>
    <div style="height:100%;overflow: auto;">
        <div style="background: rgb(0, 187, 187);color:white" class="contents">
            <div class="tittle" style="background: rgb(0, 187, 187);color:white">
                <div class="arrow-icon" @click="tobackdetail">
                    <Icon size="30" type="ios-arrow-back" />
                </div>
                {{biao}}的收入
                <div class="cai" @click="tomodal">
                    <svg t="1574728881844" class="icon" viewBox="0 0 1261 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4632" width="30" height="30"><path d="M99.586991 99.586991m-99.586991 0a99.586991 99.586991 0 1 0 199.173982 0 99.586991 99.586991 0 1 0-199.173982 0Z" p-id="4633" fill="#ffffff"></path><path d="M307.814335 33.950111h953.836439v131.27376H307.814335z" p-id="4634" fill="#ffffff"></path><path d="M99.586991 511.838333m-99.586991 0a99.586991 99.586991 0 1 0 199.173982 0 99.586991 99.586991 0 1 0-199.173982 0Z" p-id="4635" fill="#ffffff"></path><path d="M307.814335 446.201452h953.836439v131.273761H307.814335z" p-id="4636" fill="#ffffff"></path><path d="M99.586991 924.089675m-99.586991 0a99.586991 99.586991 0 1 0 199.173982 0 99.586991 99.586991 0 1 0-199.173982 0Z" p-id="4637" fill="#ffffff"></path><path d="M307.814335 858.452794h953.836439v131.273761H307.814335z" p-id="4638" fill="#ffffff"></path></svg>
                </div>
            </div>
            <div class="content">
                <p>今日收入(元)</p>
                <p style="font-size:50px;">{{daymoney}}</p>
            </div>
            <div class="content1">
                <div class="gong">
                    <p>今年累计收入(元)</p>
                    <p style="font-size:25px;">{{yearmoney}}</p>
                </div>
                <div class="gong">
                    <p>当月收入(元)</p>
                    <p style="font-size:25px;" >{{Monthmoney}}</p>
                </div>    
                <div class="gong">
                    <p>今日挂号人数(个)</p>
                    <p style="font-size:25px;">{{count}}</p>
                </div>
            </div>
        </div>
        <div class="monted">
            <p @click="Detailed"> 
                <span>
                    <svg t="1565314076918" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4106" width="24" height="24"><path d="M688.808081 479.159596c-128 0-231.951515 104.080808-231.951515 231.951515S560.937374 943.191919 688.808081 943.191919 920.759596 839.111111 920.759596 711.240404c0-128-104.080808-232.080808-231.951515-232.080808z m0 419.814141c-103.563636 0-187.862626-84.29899-187.862626-187.862626 0-103.563636 84.29899-187.862626 187.862626-187.862626 103.563636 0 187.862626 84.29899 187.862626 187.862626 0 103.692929-84.29899 187.862626-187.862626 187.862626z m0 0" fill="#00BBBB" p-id="4107"></path><path d="M147.458586 854.884848V147.781818c0-12.153535 9.955556-22.109091 22.109091-22.109091h574.448485c12.153535 0 22.109091 9.955556 22.109091 22.109091v265.179798h44.218181V147.781818c0-36.589899-29.737374-66.327273-66.327272-66.327273H169.567677C132.977778 81.454545 103.240404 111.191919 103.240404 147.781818v707.10303c0 36.589899 29.737374 66.327273 66.327273 66.327273h265.179798v-44.218182H169.567677c-12.282828 0-22.109091-9.955556-22.109091-22.109091z m0 0" fill="#00BBBB" p-id="4108"></path><path d="M213.656566 258.19798h508.250505v44.218182H213.656566v-44.218182z m0 220.961616h243.070707v44.218182h-243.070707v-44.218182z m0 220.961616H368.290909v44.218182H213.656566v-44.218182z m563.587878-28.315151h-50.941414l44.476768-44.476768c8.662626-8.662626 8.662626-22.626263 0-31.288889-8.662626-8.662626-22.626263-8.662626-31.288889 0l-50.682828 50.682828-50.682828-50.682828c-8.662626-8.662626-22.626263-8.662626-31.288889 0-8.662626 8.662626-8.662626 22.626263 0 31.288889l44.476767 44.476768h-50.941414c-12.153535 0-22.109091 9.955556-22.109091 22.109091 0 12.153535 9.826263 22.109091 22.109091 22.10909h66.327273v28.315152h-33.09899c-12.153535 0-22.109091 9.955556-22.109091 22.109091 0 12.153535 9.826263 22.109091 22.109091 22.109091h33.09899V810.666667c0 12.153535 9.826263 22.109091 22.109091 22.109091 12.153535 0 22.109091-9.955556 22.109091-22.109091v-22.109091h33.09899c12.153535 0 22.109091-9.955556 22.109091-22.109091 0-12.153535-9.826263-22.109091-22.109091-22.109091H710.917172v-28.315152h66.327272c12.153535 0 22.109091-9.955556 22.109091-22.10909-0.129293-12.153535-9.955556-22.109091-22.109091-22.109091z m0 0" fill="#00BBBB" p-id="4109"></path></svg>
                </span>
                <span>收入明细</span>
                <span style="position: absolute;right: 7%;top: 20px;">
                    <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                </span>
            </p>
        </div>
        <Modal v-model="modal11" fullscreen :title="title">
            <div>
                <!-- <p style="font-size:20px;">全部医生</p> -->
                <div class="content3" v-if="adminLevel<=1">
                    <p style="font-size:20px;color:rgb(0, 187, 187);font-weight: 600; text-align: right;" @click="selectquan">全部科室</p>
                     <RadioGroup  v-model="index" size="large" style="width:100%;">
                    <div class="contenter" v-for="(item,index) in doctorList" :key="index" >
                        <div class="doctor" @click=" seledoctor(index)">
                            <img class="avatar" src="./../../assets/avatar.png" alt="" width="40px;"  >
                            <div class="xinxi">
                                <p><span>科室名称：</span><span>{{item.deptName}}</span></p>
                                <p><span>科室编码：</span><span>{{item.deptCode}}</span></p>
                            </div>
                            <Radio :label="index" class="rad"><span style="display:none;"></span></Radio>
                        </div>
                         
                    </div>
                   
                    </RadioGroup>
                </div>
                <div class="content3" v-if="adminLevel>1&&adminLevel<=3" style="position: relative;">
   
                    <p style="font-size:20px;color:rgb(0, 187, 187);font-weight: 600; text-align: right;" @click="selectquan">全部医生</p>
                    <RadioGroup  v-model="index" size="large" style="width:100%;">
                        <div class="contenter" v-for="(item,index) in doctorList" :key="index" >
                            <div class="doctor" @click=" seledoctor(index)">
                                <img class="avatar" src="./../../assets/avatar.png" alt="" width="40px;"  >
                                <div class="xinxi">
                                    <p><span>医生姓名：</span><span>{{item.name}}</span></p>
                                    <p><span>医生职称：</span><span>{{item.title}}</span></p>
                                </div>
                                <Radio :label="index" class="rad"><span style="display:none;"></span></Radio>
                            </div>
                            
                        </div>
                    
                    </RadioGroup>
                </div>
            </div>
        </Modal>
        <loading v-show="isshowloading" class="loading"></loading>
    </div>
</template>

<script>
import {hidemenu} from "../../common/js/hide"
import loading from "../../common/loading";
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
if( currentDay.getMonth() + 1<10){
var mon = currentDay.getMonth() + 1;
var month = '0'+mon;
}else{
  var month = currentDay.getMonth() + 1;
}
//获取当天日期
if( currentDay.getDate()<10){
  var mon =  currentDay.getDate();
  var day = '0'+mon;
}else{
  var day =currentDay.getDate();
}
//当前年月日
var time = year + "-" + month + "-" + day;
    export default {
        components: {
        //加载动画
        loading
      },
        data() {
            return {
                biao:'',
                Administrator:'',
                index:'',
                single:false,
                modal11:false,
                doctorList:[],
                title:'',
                adminLevel:'',
                currentDay:time,
                moneyDate:{},
                Monthmoney:'',
                daymoney:'',
                yearmoney:"",
                count:'',
                selectery:0,
                depcode:'',
                isshowloading:false
            }
        },
         methods:{
            //返回上一层
            tobackdetail(){
               this.$router.push('/admin');
            },
            //进入明细目录
            Detailed(){
                 this.$router.push(`/particulars?depcode=${this.depcode}&selectery=${this.selectery}`);
            },
            //打开弹框
            tomodal(){
                this.modal11=true;
            },
            //全部医生
            selectquan(){
                if(this.adminLevel>1&&this.adminLevel<=3){
                    this.modal11=false;
                    this.index='';
                    this.biao=this.Administrator.deptName.split('.', 1)[0];
                    this.selectkeshou(this.Administrator.deptCode);
                    this.selectery=1;
                }
                if(this.adminLevel<=1){
                     this.modal11=false;
                     this.index='';
                     this.biao='医院';
                     this.selectyiyuan();
                     this.selectery=0;
                }
            },
            //选择医生
            seledoctor(index,item){
                if(this.adminLevel>1&&this.adminLevel<=3){
                    this.index=index;
                    this.modal11=false;
                    this.title='选择医生';
                    this.biao=this.doctorList[index].name
                    this.selectrenshou(this.doctorList[index].userName);
                    this.selectery=2;
                    this.depcode=this.doctorList[index].userName;
                }
                if(this.adminLevel<=1){
                    this.index=index;
                    this.modal11=false;
                    this.title='选择科室';
                    this.biao=this.doctorList[index].deptName.split('.', 1)[0];
                    this.selectkeshou(this.Administrator.deptCode);
                    this.selectery=1;
                    this.depcode=this.doctorList[index].deptCode;
                }
                 
            },
            //科室分类
            _dealdata(data){
                //妇科
                var gynaecology=[];
                //产科
                var obstetrics=[];
                //儿科
                var pediatrics=[];
                var other=[];
                for(var i = 0;i<data.length;i++){
                    if(data[i].deptCode.substring(0,6)=='100101'){
                        gynaecology.push(data[i]);
                    }else if(data[i].deptCode.substring(0,6)=='100102'){
                        obstetrics.push(data[i]);
                    }else if(data[i].deptCode.substring(0,6)=='100103'){
                        pediatrics.push(data[i]);
                    }else {
                        other.push(data[i]);
                    }
                }
                this.doctorList=[]
                this.doctorList.push({ deptName: "妇科门诊", gynaecology:gynaecology,deptCode:'100101'});
                this.doctorList.push({ deptName: "产科门诊", obstetrics:obstetrics,deptCode:'100102'});
                this.doctorList.push({ deptName: "儿科门诊", pediatrics:pediatrics,deptCode:'100103'});
                for (let j = 0; j < other.length; j++) {
                    if (other[j].deptName == "皮肤科") {
                    this.doctorList.push({deptName: "皮肤科",deptCode:other[j].deptCode});
                    }
                }
                //其他没合并的科室
                for (let i = 0; i < other.length; i++) {
                    let deptName = "";
                    let deptCode = ''
                    deptName = other[i].deptName;
                    deptCode=other[i].deptCode;
                    if (deptName != "皮肤科") {
                    let depitem = {
                        //合并科室的名称
                        deptName: deptName,
                        deptCode:deptCode
                    };
                    this.doctorList.push(depitem);
                    }
                }
            },
            // 查询科室
            DeptInfoList(){
                var that =this;
                var url = that.$store.getters.getUrl +'admin/dept/getDeptInfoList'
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: '',
                    success:function(data){
                        if(data.code=='200'){
                            that._dealdata(data.data);
                        }
                        
                    },
                    error:function(data){
                    }
                })
            },
            //查询医生
            docList(value){
              var that =this;
                var url = that.$store.getters.getUrl +'admin/doctor/getDoctorInfoList'
                var deptCode;
                if(value!=undefined){
                   deptCode =value.value
                }else{
                  deptCode=''
                }
               
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {deptCode},
                    success:function(data){
                      if(data.code==200){
                        that.doctorList=data.data;
                      }
                    },
                    error:function(data){
                      
                    }
                })
            },
            //查询科室收入
            selectkeshou(value){
                
                var that =this;
                var url = that.$store.getters.getUrl +'admin/clinic/getDeptClinicTotalByDate'
                var day = that.currentDay;
                var deptCode = value;
                that.isshowloading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {day,deptCode},
                    success:function(data){
                        that.isshowloading=false;
                        if(data.code=='200'){
                            var moneyDate = data.data;
                            that.moneyDate=data.data;
                            if(moneyDate.totalYear.money){
                                that.yearmoney=moneyDate.totalYear.money
                            }else{
                                that.yearmoney='0.00'
                            }
                            if(moneyDate.totalDay.money){
                                that.daymoney=moneyDate.totalDay.money
                            }else{
                                that.daymoney='0.00'
                            }
                            if(moneyDate.totalDay.count){
                                that.count=moneyDate.totalDay.count
                            }else{
                                that.count='0'
                            }
                            if(moneyDate.totalMonth.money){
                                that.Monthmoney=moneyDate.totalMonth.money
                            }else{
                                that.Monthmoney='0.00'
                            }
                        }
                        
                    },
                    error:function(data){
                        that.isshowloading=false;
                    }
                })
            },
            //查询医生挂号收入
            selectrenshou(value){
                var that =this;
                var url = that.$store.getters.getUrl +'admin/clinic/getDoctorClinicTotalByDate'
                var day = that.currentDay;
                var doctor = value;
                that.isshowloading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {day,doctor},
                    success:function(data){
                        that.isshowloading=false;
                        if(data.code=='200'){
                            var moneyDate = data.data;
                            that.moneyDate=data.data;
                            if(moneyDate.totalYear.money){
                                that.yearmoney=moneyDate.totalYear.money
                            }else{
                                that.yearmoney='0.00'
                            }
                            if(moneyDate.totalDay.money){
                                that.daymoney=moneyDate.totalDay.money
                            }else{
                                that.daymoney='0.00'
                            }
                            if(moneyDate.totalDay.count){
                                that.count=moneyDate.totalDay.count
                            }else{
                                that.count='0'
                            }
                            if(moneyDate.totalMonth.money){
                                that.Monthmoney=moneyDate.totalMonth.money
                            }else{
                                that.Monthmoney='0.00'
                            }
                        }
                        
                    },
                    error:function(data){
                        that.isshowloading=false;
                    }
                })
            },
            //查询医院挂号收入
            selectyiyuan(){
                var that =this;
                var url = that.$store.getters.getUrl +'admin/clinic/getAllClinicTotalByDate'
                var day = that.currentDay;
                that.isshowloading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {day},
                    success:function(data){
                        that.isshowloading=false;
                        if(data.code=='200'){
                            var moneyDate = data.data;
                            that.moneyDate=data.data;
                            if(moneyDate.totalYear.money){
                                that.yearmoney=moneyDate.totalYear.money
                            }else{
                                that.yearmoney='0.00'
                            }
                            if(moneyDate.totalDay.money){
                                that.daymoney=moneyDate.totalDay.money
                            }else{
                                that.daymoney='0.00'
                            }
                            if(moneyDate.totalDay.count){
                                that.count=moneyDate.totalDay.count
                            }else{
                                that.count='0'
                            }
                            if(moneyDate.totalMonth.money){
                                that.Monthmoney=moneyDate.totalMonth.money
                            }else{
                                that.Monthmoney='0.00'
                            }
                        }
                        
                    },
                    error:function(data){
                        that.isshowloading=false;
                    }
                })
            }
         },
         mounted(){
             if(localStorage.getItem('Administrator')!=undefined&&localStorage.getItem('Administrator')!=''){
                    this.Administrator=JSON.parse(localStorage.getItem('Administrator'));
                    this.adminLevel=this.Administrator.adminLevel;
                    if(this.Administrator.adminLevel>1&&this.Administrator.adminLevel<4){
                        this.biao =this.Administrator.deptName.split('.', 1)[0];
                        //查询医生
                        this.title='选择医生'
                        this.docList({value:this.Administrator.deptCode});
                        this.selectkeshou(this.Administrator.deptCode);
                        this.depcode=this.Administrator.deptCode;
                        this.selectery=1;
                    }
                    if(this.Administrator.adminLevel>3 && this.Administrator.adminLevel<5){
                        this.biao = this.Administrator.name;
                        this.selectrenshou(this.Administrator.userName);
                        this.depcode = this.Administrator.userName;
                        this.selectery=2;
                    }
                    if(this.Administrator.adminLevel<=1){
                         this.biao = '医院';
                         this.title='选择科室'
                         this.selectery=0;
                         this.DeptInfoList();
                         this.selectyiyuan();
                    }
            }
         },
         created(){
            let that=this 
            const requesturl=that.$store.getters.getUrl + "SweepCode.do";
            hidemenu(requesturl);
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
.cai{
  position: absolute;
  right: 5%;
  top: 5px;
}
.content{
    text-align: center;
    background:rgb(0, 187, 187);
    color:white;
    padding: 25px 0;
    font-size: 16px;
}
.content1{
     display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    width: 100%;
    /* background-color: lightgrey; */
    /* border-top: 5px solid #ddd; */
    padding: 10px 0;
    
}
.gong{
    text-align: center;
    font-size: 14px;
}
.monted{
    border-top: 1px solid #ddd;
    padding-bottom: 50px;
    font-size: 14px;
}
.monted p{
     position: relative;
     
}
.monted p svg {
  vertical-align: middle;
}
.monted p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
}
.monted p {
  padding: 18px 10% 18px 5%;
  border-bottom: 1px solid #aaa;
  color: black;
}
.contenter{
    position: relative;
}
.doctor{
  display: flex;
  height: 50px;
  /* font-size: 14px; */
  align-items: center;
  padding: 30px 20px;
  /* border-radius: 5px; */
  border-bottom: 1px solid rgb(178, 178, 178);
  
}
.xinxi{
  /* font-size: 13px; */
  /* font-weight: bold; */
  margin: 0px 5px 0 20px;
}
.xinxi{
  display: inline-block;
}
.xinxi p{
  line-height: 1.5;
}
.avatar{
  border-radius: 50%
}
.operate{
    position: absolute;
    right: 5%;
    top: 30%;
}
.rad{
    position: absolute;
    right: 5%;
    top: 30%;
}

</style>