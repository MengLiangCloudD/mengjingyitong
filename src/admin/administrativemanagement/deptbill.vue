<template>
    <div style="height:100%;overflow: auto;">
        <div style="background: rgb(0, 187, 187);color:white" class="contents">
            <div class="tittle" style="background: rgb(0, 187, 187);color:white">
                <div class="arrow-icon" @click="tobackdetail">
                    <Icon size="30" type="ios-arrow-back" />
                </div>
                {{biao}}的信息
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
        <div class="content3" >
            <p @click="Detailed"> 
                <span>
                    <svg t="1565314076918" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4106" width="24" height="24"><path d="M688.808081 479.159596c-128 0-231.951515 104.080808-231.951515 231.951515S560.937374 943.191919 688.808081 943.191919 920.759596 839.111111 920.759596 711.240404c0-128-104.080808-232.080808-231.951515-232.080808z m0 419.814141c-103.563636 0-187.862626-84.29899-187.862626-187.862626 0-103.563636 84.29899-187.862626 187.862626-187.862626 103.563636 0 187.862626 84.29899 187.862626 187.862626 0 103.692929-84.29899 187.862626-187.862626 187.862626z m0 0" fill="#00BBBB" p-id="4107"></path><path d="M147.458586 854.884848V147.781818c0-12.153535 9.955556-22.109091 22.109091-22.109091h574.448485c12.153535 0 22.109091 9.955556 22.109091 22.109091v265.179798h44.218181V147.781818c0-36.589899-29.737374-66.327273-66.327272-66.327273H169.567677C132.977778 81.454545 103.240404 111.191919 103.240404 147.781818v707.10303c0 36.589899 29.737374 66.327273 66.327273 66.327273h265.179798v-44.218182H169.567677c-12.282828 0-22.109091-9.955556-22.109091-22.109091z m0 0" fill="#00BBBB" p-id="4108"></path><path d="M213.656566 258.19798h508.250505v44.218182H213.656566v-44.218182z m0 220.961616h243.070707v44.218182h-243.070707v-44.218182z m0 220.961616H368.290909v44.218182H213.656566v-44.218182z m563.587878-28.315151h-50.941414l44.476768-44.476768c8.662626-8.662626 8.662626-22.626263 0-31.288889-8.662626-8.662626-22.626263-8.662626-31.288889 0l-50.682828 50.682828-50.682828-50.682828c-8.662626-8.662626-22.626263-8.662626-31.288889 0-8.662626 8.662626-8.662626 22.626263 0 31.288889l44.476767 44.476768h-50.941414c-12.153535 0-22.109091 9.955556-22.109091 22.109091 0 12.153535 9.826263 22.109091 22.109091 22.10909h66.327273v28.315152h-33.09899c-12.153535 0-22.109091 9.955556-22.109091 22.109091 0 12.153535 9.826263 22.109091 22.109091 22.109091h33.09899V810.666667c0 12.153535 9.826263 22.109091 22.109091 22.109091 12.153535 0 22.109091-9.955556 22.109091-22.109091v-22.109091h33.09899c12.153535 0 22.109091-9.955556 22.109091-22.109091 0-12.153535-9.826263-22.109091-22.109091-22.109091H710.917172v-28.315152h66.327272c12.153535 0 22.109091-9.955556 22.109091-22.10909-0.129293-12.153535-9.955556-22.109091-22.109091-22.109091z m0 0" fill="#00BBBB" p-id="4109"></path></svg>
                </span>
                <span>收入明细</span>
                <span >
                    <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                </span>
            </p>
            <p @click="godoctormanagement"> 
                <span>科室医生</span>
                <span >
                    <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                </span>
            </p>
            <p>
                <span>科室名称</span>
                <span>{{biao}}</span>
            </p>
            <p>
                <span>科室编码</span>
                <span>{{doctor}}</span>
            </p>
            <p>
                <span >科室简介</span>
                <span style="width:75%; text-align: right;" @click="gomodal11">
                    <span class="text" style="width:80%; text-align: right;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{content}}</span> 
                    <span>
                        <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                    </span>
                </span>
            </p>
            <Modal v-model="modal11" fullscreen title="个人简介"  @on-ok="tomodify()">
                <div>
                     <Input v-model="value8"  :maxlength="300" type="textarea" :autosize="{minRows: 8,maxRows: 8}" placeholder="个人简介"/>
                      <p class="numberV" style="text-align:right;width:100%">{{txtVal}}/300</p>
                </div>
            </Modal>
        </div>
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
                doctor:'',
                isshowloading:false,
                currentDay:time,
                Monthmoney:'',
                daymoney:'',
                yearmoney:"",
                count:'',
                content:'',
                modal11:false,
                txtVal:'',
                value8:''
            }
        },
         methods:{
             godoctormanagement(){
                 this.$router.push(`/doctormanagement?deptCode=${this.doctor}&start=5&deptName=${this.biao}`);
             },
             //修改个人简介
            gomodal11(){
                this.modal11=true;
                this.value8 = $('.text').html();
                this.txtVal = this.value8.length;
            },
             //查询科室简介
            doctorxinxi(){
              var that =this;
                var deptCode = that.doctor;
                var url = that.$store.getters.getUrl +'admin/dept/getDeptContentByDeptCode.do'
                that.isshowloading=true;
                 $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data:{deptCode},
                    success:function(data){
                        // that.isshowloading=false;
                        if(data.code=='200'){
                            that.content = data.data
                            // that._dealdata(data.data);
                        }else if(data.code=='500'){
                            that.content = '无'
                        }
                    },
                    error:function(data){
                        // that.isshowloading=false;
                    }
                })
            },
             //查询医生挂号收入
            selectrenshou(){
                var that =this;
                var url = that.$store.getters.getUrl +'admin/clinic/getDeptClinicTotalByDate.do'
                var day = that.currentDay;
                var deptCode = that.doctor;
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
            //返回上一层
            tobackdetail(){
               this.$router.push('/administrativemanagement');
            },
            //进入明细目录
            Detailed(){
                 this.$router.push(`/particulars?depcode=${this.doctor}&selectery=1`);
            }
         },
         created(){
            let that=this
            const requesturl=that.$store.getters.getUrl + "SweepCode.do";
            hidemenu(requesturl);
            that.biao =  that.$route.query.name;
            that.doctor =  that.$route.query.doctor;
            that.doctorxinxi();
            that.selectrenshou()
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


.content3{
    padding-bottom: 50px;
    font-size: 14px;
}
.content3 p{
     position: relative;
}
.content3 p svg {
  vertical-align: middle;
}
.content3 p span:nth-child(1) {
    flex:1;
}
.content3 p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
}
.content3 p {
  padding: 16px 10% 16px 5%;
  border-bottom: 1px solid #aaa;
  color: black;
  display: flex;
}
</style>