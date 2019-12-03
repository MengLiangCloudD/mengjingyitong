<template>
    <div class="qwer">
      <div class="titlei">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             收入明细
        </div>
         <div class="xuanze"  style="position: relative;">
            <div style="display:inline-block;width:100%">
            <span style="color:rgb(40, 184, 161);font-size:16px;">总收入：￥3704.15</span>
            <el-date-picker
                v-model="value1"
                type="month"
                style="width:30%; border:0; position: absolute;right: 5%;top: 7px;"
                placeholder="选择月份"
                :editable="false"
                :clearable="false"
                size="small"
                >
            </el-date-picker>
          </div>
          <!-- <p style="margin-left: 5%;color:#aaa">总收入：￥3704.15</p> -->
        </div>
      </div>
      <div class="content">
        <div class="contenter" v-for="(item,index) in payList" :key="index">
          <div class="shou">
             <img class="avatar" src="./../../assets/xian.png" alt="" width="40px;"  >
             <div class="xinxi">
                <p style="font-size:16px;font-weight: 500;">{{item.content}}</p>
                <p>{{item.time}}</p>
            </div>
            <div style="position: absolute;right:5%;font-size:16px;color:#F4A460;">
              {{item.preace}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {hidemenu} from "../../common/js/hide"
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
    export default {
        data(){
            return {
                value1:currentDay,
                payList:[{
                  content:'微信转账——来自孟良挂号费用',
                  time:'11-27 09:43:00',
                  preace:'￥15.00'
                },{
                  content:'微信转账——来自孟良挂号费用',
                  time:'11-27 09:43:00',
                  preace:'￥15.00'
                },{
                  content:'微信转账——来自孟良挂号费用',
                  time:'11-27 09:43:00',
                  preace:'￥15.00'
                },{
                  content:'微信转账——来自孟良挂号费用',
                  time:'11-27 09:43:00',
                  preace:'￥15.00'
                },{
                  content:'微信转账——来自孟良挂号费用',
                  time:'11-27 09:43:00',
                  preace:'￥15.00'
                },]
            }
        },
         methods:{
            //返回上一层
            tobackdetail(){
               history.go(-1);
            },
         },
         created(){
           let that=this
           const requesturl=that.$store.getters.getUrl + "SweepCode.do";
            hidemenu(requesturl);
         }
    }
</script>

<style scoped>
.qwer{
  height: 100%;
  overflow: auto;
}
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
.xuanze {
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
  background: #fff;
}
.xuanze span {
  font-size: 16px;
  display: inline-block;
  /* padding: 10px; */
  margin-left: 5%;
}
.titlei{
  position: fixed;
  width: 100%;
  z-index: 999;
}
.content{
  padding-top: 100px;
}
.contenter{
    position: relative;
    
}
.shou{
  display: flex;
  height: 50px;
  /* font-size: 14px; */
  align-items: center;
  padding: 10.33333vw 20px;
  /* border-radius: 5px; */
  border-bottom: 1px solid rgb(230, 230, 230);
  position: relative;
  
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
  line-height:2;
}
</style>