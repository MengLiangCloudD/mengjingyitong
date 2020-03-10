<template>
  <div class="home-page">
    <div class="appointmentPage">
      <div class="tittle">
        <!-- <p class="pp">咨询</p> -->
        <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
        </div>
        滦平县妇幼保健院挂号平台
      </div>
      <div class="doctorInfo">
        <!-- <p class="doctorName">{{this.$store.getters.getDocName}}</p> -->
        <div class="otherinfo">
          <p class="otherinfo-title">医生姓名：</p>
          <p class="otherinfo-text">{{this.$store.getters.getDocName}}</p>
        </div>
        <div class="otherinfo">
          <p class="otherinfo-title">门诊科室：</p>
          <p class="otherinfo-text">{{this.$store.getters.getDepname}}</p>
        </div>
        <div class="otherinfo">
          <p class="otherinfo-title">医生职位：</p>
          <p class="otherinfo-text">{{job}}</p>
        </div>
        <div class="otherinfo">
          <p class="otherinfo-title">医生职称：</p>
          <p class="otherinfo-text">{{title}}</p>
        </div>
        
        <Poptip  class="avatar" placement="bottom-start" width="300">
          <img class="avatar1" src="../assets/avatar.png" alt>
          <div class="api" slot="content">
              <div  v-for="(item,index) in docxiang" :key="index">
                <img src="./../assets/avatar.png" alt="" width="50px;"  style="vertical-align: top;z-index:999">
                <div style="vertical-align: top;" class="po">
                  <p><span>医生姓名：</span><span>{{item.name}}</span></p>
                  <p><span>医生编码：</span><span>{{item.username}}</span></p>
                  <p><span>医生职位：</span><span>{{item.job}}</span></p>
                  <p><span>医生职称：</span><span>{{item.title}}</span></p>
                  <!-- <div class="otherinfo">
                    <p class="otherinfo-title">医生简介：</p>
                    <p class="otherinfo-text">{{jiajie}}</p>
                  </div> -->
                </div>
              </div>
            </div>
        </Poptip>
      </div>
      <Button shape="circle" style="    position: absolute;left: 3vw;top: 35.33333vw;" v-if="flage">已关注</Button>
      <Button shape="circle" style="    position: absolute;left: 3vw;top: 35.33333vw;" v-if="flage==false" @click="attention()">关注</Button>
      <div class="otherinfo1" style="border-bottom: 1px solid rgba(187, 187, 187, 1);padding: 0 18px 10px 18px;" v-if="!play">
          <span class="otherinfo-title" style="padding-left: 16.8333vw;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;" @click="disp">医生简介：{{jiajie}}</span> 
        </div>
        <div class="otherinfo1" style="border-bottom: 1px solid rgba(187, 187, 187, 1);padding: 0 18px 18px 18px ; "  v-if="play"  @click="disp">
          <span class="otherinfo-title" style="padding-left: 16.3333vw;" >医生简介：</span>
          <span class="otherinfo-text">{{jiajie}}</span>
        </div>
      <div class="divid-line"></div>
      <div class="select-table">
        <div class="zhou">
          <div v-for="(item,index) in time" :key="index" class="xuanqi" @click="xuanzeriq(index)">
            <p>{{item.week}}</p>
            <p>{{item.times.substring(item.times.length-5,item.times.length)}}</p>
          </div>
        </div>
        <div style="border-bottom: 1px solid rgba(187, 187, 187, 1)">
          <!-- <p class="select-item item-color" :class="{pmstate:pmstate=='暂无号源'||pmstate=='未出诊'}">剩余号源：{{pmstate}}</p> -->
          <div>
            <div style="padding:10px 20px;margin:5px 0px; border-bottom: 1px solid #ccc;">
              <div class="pmoram" size="large"  style="display:flex;padding: 5px;font-size: 16px;">
                <p style="flex:1;color:rgba(40, 184, 161, 1);font-size:16px;padding: 8px 0;">上午号源</p> 
                <Button :disabled="yuyue" @click="amRegistered()" size="small" type="primary"  v-if="pmstate=='未约满'">预约剩余:<span style="font-size:16px">100</span></Button>
                <Button  :disabled="yuyue"  size="small"  type="primary"  v-if="pmstate=='暂无号源'||pmstate=='未出诊'">预约剩余:<span style="font-size:16px">0</span></Button>
              </div>
            </div>
            <div style="padding:0 20px;margin:5px 0px; ">
              <div class="pmoram" size="large"   style="display:flex;padding: 5px; font-size: 16px;">
                <p style="flex:1;color:rgba(40, 184, 161, 1);font-size:16px;padding: 8px 0;">下午号源</p> 
                <Button :disabled="yuyue" @click="amRegistered()" size="small" type="primary"  v-if="pmstate=='未约满'">预约剩余:<span style="font-size:16px">500</span></Button>
                <Button  :disabled="yuyue"  size="small"  type="primary"  v-if="pmstate=='暂无号源'||pmstate=='未出诊'">预约剩余:<span style="font-size:16px">0</span></Button>
              </div>
            </div>
            <!-- <p style="padding:0 20px;margin:20px 0px;flex:1">
              <Button :disabled="zixun" @click="amRegistered()" size="large" type="primary" long>咨询</Button>
            </p> -->
          </div>
        </div>
        
        <div style="display:flex">
          <p style="padding:0 20px;margin:20px 0px;flex:1">
            <Button :disabled="fuzhen"  size="large" type="primary" long>复诊</Button>
          </p>
          <p style="padding:0 20px;margin:20px 0px;flex:1">
            <Button :disabled="fuzhen"  size="large" type="primary" long>咨询</Button>
          </p>
          <!-- <p style="padding:0 20px;margin:20px 0px;flex:1">
            <Button :disabled="zixun" @click="amRegistered()" size="large" type="primary" long>咨询</Button>
          </p> -->
        </div>
        <!-- <div style="display:flex">
          <p style="padding:0 20px;margin:20px 0px;flex:1">
            <Button :disabled="zixun" size="large" type="primary" long>复诊</Button>
          </p>
          <p style="padding:0 20px;margin:20px 0px;flex:1;opacity: 0;">
            <Button :disabled="true" size="large" type="primary" long>咨询</Button>
          </p>
        </div> -->
      </div>
      <!-- <div class="tubiao" style="display:flex;text-align: center;">
        <p style="padding:0 20px;margin:10px 0px;flex:1">
          <svg t="1576313213796" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4097" width="50" height="50"><path d="M448.698182 482.210909c-96.814545 4.654545-175.010909 56.785455-175.010909 121.949091s78.196364 114.501818 175.010909 109.847273S623.709091 647.912727 623.709091 582.749091c-0.930909-64.232727-79.127273-105.192727-175.010909-100.538182z m65.163636 164.770909c-29.789091 39.098182-88.436364 57.716364-145.221818 26.065455-26.996364-14.894545-26.065455-43.752727-26.065455-43.752728s-11.170909-92.16 85.643637-103.330909c97.745455-12.101818 115.432727 81.92 85.643636 121.018182z" fill="#EA5D5C" p-id="4098"></path><path d="M448.698182 584.610909c-6.516364 4.654545-7.447273 13.032727-3.723637 18.618182 2.792727 5.585455 11.170909 6.516364 16.756364 1.861818 5.585455-4.654545 8.378182-13.032727 4.654546-18.618182-2.792727-5.585455-10.24-6.516364-17.687273-1.861818zM403.083636 597.643636c-18.618182 1.861818-30.72 17.687273-30.72 33.512728 0 14.894545 14.894545 26.065455 32.581819 24.203636 17.687273-1.861818 32.581818-15.825455 32.581818-31.650909s-13.963636-27.927273-34.443637-26.065455z" fill="#EA5D5C" p-id="4099"></path><path d="M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m197.352727 626.501818C669.323636 712.145455 538.065455 754.036364 441.250909 746.589091c-92.16-7.447273-211.316364-38.167273-223.418182-151.738182 0 0-6.516364-51.2 42.821818-117.294545 0 0 70.749091-99.607273 152.669091-128.465455 82.850909-27.927273 92.16 19.549091 92.16 48.407273-4.654545 24.203636-12.101818 38.167273 18.618182 28.858182 0 0 80.989091-38.167273 114.501818-4.654546 26.996364 26.996364 4.654545 65.163636 4.654546 65.163637s-11.170909 12.101818 12.101818 16.756363c21.410909 3.723636 94.021818 37.236364 53.992727 122.88z m-80.058182-236.450909c-8.378182 0-15.825455-7.447273-15.825454-15.825454 0-9.309091 7.447273-15.825455 15.825454-15.825455 0 0 99.607273-18.618182 87.505455 89.367273v1.861818c-0.930909 7.447273-7.447273 13.963636-15.825455 13.963636-9.309091 0-15.825455-7.447273-15.825454-15.825454 0-1.861818 15.825455-73.541818-55.854546-57.716364zM797.789091 493.381818c-2.792727 18.618182-12.101818 11.170909-22.341818 11.170909-13.032727 0-23.272727-16.756364-23.272728-29.789091 0-11.170909 4.654545-22.341818 4.654546-22.341818 0.930909-4.654545 12.101818-34.443636-7.447273-78.196363-35.374545-60.509091-106.123636-60.509091-114.501818-57.716364-8.378182 3.723636-21.410909 5.585455-21.410909 5.585454-13.032727 0-23.272727-10.24-23.272727-23.272727 0-11.170909 7.447273-19.549091 16.756363-22.341818 0 0 0 0.930909 0.930909 0.930909s1.861818 0.930909 1.861819 0.930909c10.24-1.861818 45.614545-4.654545 79.127272 3.723637 62.370909 14.894545 146.152727 83.781818 108.916364 211.316363z" fill="#EA5D5C" p-id="4100"></path></svg>
          </p>
          <p style="padding:0 20px;margin:10px 0px;flex:1">
          <svg t="1576313657674" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4842" width="50" height="50"><path d="M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m210.385455 641.396364c-7.447273 9.309091-26.996364-1.861818-41.89091-32.581819-3.723636 13.963636-13.032727 36.305455-34.443636 64.232728 35.374545 8.378182 44.683636 42.821818 33.512727 61.44-8.378182 13.032727-26.996364 24.203636-59.578181 24.203636-58.647273 0-83.781818-15.825455-95.883637-26.996364-1.861818-2.792727-5.585455-3.723636-10.24-3.723636-4.654545 0-7.447273 0.930909-10.24 3.723636-11.170909 11.170909-37.236364 26.996364-95.883636 26.996364-32.581818 0-52.130909-11.170909-59.578182-24.203636-12.101818-18.618182-1.861818-53.061818 33.512727-61.44-20.48-27.927273-29.789091-50.269091-34.443636-64.232728-13.963636 30.72-34.443636 42.821818-41.890909 32.581819-5.585455-8.378182-8.378182-26.065455-7.447273-38.167273 3.723636-46.545455 34.443636-85.643636 53.061818-106.123636-2.792727-5.585455-8.378182-40.029091 14.894546-63.301819v-1.861818c0-92.16 65.163636-158.254545 148.014545-158.254545 81.92 0 148.014545 66.094545 148.014546 158.254545v1.861818c23.272727 23.272727 17.687273 57.716364 14.894545 63.301819 17.687273 20.48 49.338182 59.578182 53.061818 106.123636 0.930909 12.101818-0.930909 29.789091-7.447272 38.167273z" fill="#30A5DD" p-id="4843"></path></svg>
          </p>
          <p style="padding:0 20px;margin:10px 0px;flex:1">
          <svg t="1576313772353" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6633" width="50" height="50"><path d="M384 320c0 70.7 57.3 128 128 128s128-57.3 128-128-57.3-128-128-128-128 57.3-128 128z" fill="#FFB74D" p-id="6634"></path><path d="M768 610.4s-70.4-151.5-256-151.5-256 151.5-256 151.5v83.2h512v-83.2z" fill="#607D8B" p-id="6635"></path><path d="M347.5 189.1l-30-12.2L513 97l195.5 79.9L513 256.8l-158.7-64.9m345.9-13.3v78.9h7.8v-78.9h-7.8z m-10.9 154.6h29.6v-76.8h-29.6v76.8z" fill="#666666" p-id="6636"></path><path d="M553.9 515.2c2.1-4.3 2.3-8.7 0.6-13.4-1.7-4.6-4.3-9.1-7.7-13.4-3.4-4.2-7.5-8.9-12.3-13.8 0 0-2.8-0.2-6.6-1.3-10.9-3.9-22.7-3.9-33.8-0.1-3.8 1.1-6.6 1.4-6.6 1.4-4.7 4.9-8.5 9.6-11.2 13.8-2.7 3.6-4.9 7.5-6.6 11.8s-1.6 8.2 0.5 11.7c4.7 9.9 8.9 18.7 12.3 26.1 3.4 7.5 7.1 13.4 11.2 17.6-1.4 6.4-3.4 15.5-6.2 27.2-2.7 11.8-5.2 23.8-7.6 36.3-2.4 12.4-4.4 24.2-6.2 35.2-1.7 11-2.5 19.4-2.5 25 0 3.6 1.5 7.8 4.6 12.8s6.7 10.1 10.7 15.5c4.1 5.3 8.4 9.8 12.8 13.4 4.4 3.6 8.4 5.3 11.8 5.3 3.4 0 7.5-1.8 12.2-5.3 4.8-3.6 9.4-7.6 13.8-12.3 4.4-4.6 8.2-9.6 11.2-14.9 3.1-5.3 4.6-9.8 4.6-13.3 0-4.3-1-11.6-3-21.9-2.1-10.3-4.3-21.9-6.7-34.7-2.3-12.8-4.9-25.3-7.7-37.4-2.7-12.1-5.1-21.7-7.1-28.8 4.1-3.6 8-8.7 11.7-15.5 3.7-6.5 8.3-15.6 13.8-27z" fill="#FFFFFF" p-id="6637"></path><path d="M874.7 586.9H149.3L128 672.2l106.7 64-42.7-64h640l-42.7 64 106.7-64-21.3-85.3z" fill="#B0BEC5" p-id="6638"></path><path d="M192 672.2h640l-85.3 256H277.3l-85.3-256z" fill="#78909C" p-id="6639"></path></svg>
        </p>
      </div> -->
    </div>
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show="spinShow"></loading>
  </div>
</template>
<script>
import tabbar from "../common/tabbar";
import loading from ".././common/loading";
import {initwxshare} from "../common/js/share"
export default {
  name:"appointment",
  components: {
    loading,
    tabbar
  },
  data() {
    return {
      //返回的医生详细信息
      doctor: [],
      //pmstate 号源剩余的状态
      pmstate: "",
      //控制加载动画的显示
      spinShow: false,
      docxiang:[],
      jiajie:'',
      RegID:'',
      play:false,
      time:[],
      title:'',
      haoyuan:[],
      job:'',
      numeer:1,
      doctorRole:'',
      yuyue:true,
      fuzhen:true,
      zixun:true,
      flage:false
    };
  },
  created(){
    this.tab(7);
  },
  //在mounted钩子里去获取医生的信息 保存支付费用 存储号源编码
  mounted() {
    this.spinShow = true;
    this.getdoctorinfo();
    this.doctorxinxi();
    if(localStorage.getItem('cardno')!=undefined && localStorage.getItem('cardno')!=''){
        this.select();
    }
    
    var xuanqi = document.getElementsByClassName('xuanqi');
    xuanqi[0].style.background='rgba(40, 184, 161, 1)';
    xuanqi[0].style.color='#fff';
    this.xuanzeriq(0)
    // let requesturl=this.$store.getters.getUrl + "SweepCode.do";
    //     initwxshare(requesturl,1,"测试数据")
  },
  beforeDestroy(){
      //只在页面加载时执行一次
      //定义url地址
      if(!localStorage.getItem('cardno')){
        var url = this.$store.getters.getUrl + "card/getAllCards.do";
        var _this = this;
        //取得openid
        var openid = localStorage.getItem("openid");
        $.ajax({
          url: url,
          type: "post",
          dataType: "json",
          async: false,
          data: {
            openid: openid
          },
          success: function(data) {
            //判断已有几张卡
            if(data.data.length>0){
              localStorage.setItem('cardno',data.data[0].cardno);
              localStorage.setItem('cardername',data.data[0].name);
              _this.$store.commit('setCardCode',data.data[0].cardno);
            }
          },
          error: function(data) {
            //关闭加载动画
            _this.spinShow = false;
            //关闭加载动画
            _this.$Modal.error({
              title: "提示信息",
              content: "请求失败!"
            });
          }
        })
      }
      
  },
  methods: {
    //关注医生
    attention() {
      var that = this;
      //取地openid
    if(localStorage.getItem('cardno')!=undefined&& localStorage.getItem('cardno')!=''){
      var openid = localStorage.getItem("openid");
      //url地址
      var url = that.$store.getters.getUrl + "follow/insert.do";
      //医生编号
      var doccode = localStorage.getItem("doccode");
      //获取到所评论的医生姓名
      var docName = localStorage.getItem("docName");
      //获取到所评论的医生科室
      var depname =localStorage.getItem("depname");
      //获取患者的姓名
      var name =localStorage.getItem("cardername");
      //患者卡号
      var cardno = localStorage.getItem('cardno');
      var specialty = localStorage.getItem('depCode');
       $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {
          openid: openid,
          //医生编号
          doccode: doccode,
          //医生姓名
          hosdocname: docName,
          //科室
          hosdepname: depname,
          //患者姓名
          name: name,
          cardno:cardno,
          //科室编码
          specialty:specialty
        },
        success: function(data) {
          that.isshowloading=false;
          if(data.status==1){
            that.$Message.success("关注成功");
            that.flage = true;
          }else{
            that.$Message.error("关注失败");
          }
          
        },
        error: function(data) {
          that.isshowloading=false;
        }
      });
     }else{
       that.$router.push("/authentication");
     }
    },
    //查询是否已经关注
    select() {
      //取到openid
      var openid = localStorage.getItem("openid");
      var cardno  = localStorage.getItem('cardno');
      //定义url地址
      var url = this.$store.getters.getUrl + "follow/attention.do";
      var that = this;
      //医生编号
      var doccode =localStorage.getItem('doccode');
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {
          cardno: cardno,
          //医生编号
          doccode: doccode
        },
        success: function(data) {
          //判断状态是一时候 表示已关注
          if (data.status == 1) {
            that.flage = true;
            //判断状态是0时候  表示未关注
          } else if ((data.status = 0)) {
            that.flage = false;
          }
        },
        error: function(data) {}
      });
    },
    tab(dayNum){
        var oDate = new Date();   //获取当前时间
        var dayArr = [oDate];     //定义一个数组存储所以时间
        var arr = []
        for(var i=0;i<dayNum;i++){
            dayArr.push(new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate() + i));   //把未来几天的时间放到数组里
        }
        for(var i=0;i<dayArr.length;i++){
            var y = dayArr[i].getFullYear();
            var m = dayArr[i].getMonth() + 1;
            if(m<10){
              m ='0'+m
            }
            var d = dayArr[i].getDate();
            if(d<10){
              d ='0'+d
            }
            var h = dayArr[i].getHours();
            var f = dayArr[i].getMinutes();
            // var s = dayArr[i].getSeconds();
            var week = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六")[dayArr[i].getDay()];
            arr.push({times:y+"-"+m+"-"+ d,week:week});
        }
        arr.shift();
        arr[0].week='今日'
        this.time=arr;  
    },
    //选择挂号时间
    xuanzeriq(index){
      var xuanqi = document.getElementsByClassName('xuanqi');
      for(var i =0;i<xuanqi.length;i++){
        xuanqi[i].style.background='#fff'
        xuanqi[i].style.color='#000'
      }
      xuanqi[index].style.background='rgba(40, 184, 161, 1)'
      xuanqi[index].style.color='#fff'
      this.savedoctorinfo(index);
    },
    disp(){
        this.play=!this.play
    },
    //返回上一层
    tobackdetail(){
        this.$router.push("/home");
    },
    //获取当天日期
    getcurrentday(te) {
      let currentDay = new Date(te);
      let year = currentDay.getFullYear();
      if((currentDay.getMonth() + 1)<10){
         var  month = '0' + (currentDay.getMonth() + 1);
      }else{
        var month = currentDay.getMonth() + 1;
      }
      if((currentDay.getDate())<10){
        var day = '0' + (currentDay.getDate());
      }else{
        var day = currentDay.getDate();
      }
      let time = year + "-" + month + "-" + day;
      return time;
    },
    //去挂号 存储当天日期到vuex仓库 如果有预约号了就跳到确认挂号页，如果没有有预约号就跳弹窗提示
    amRegistered(){
      if (this.pmstate == "约满"||this.pmstate == "暂无号源") {
        //弹出名额已满的提示信息。
        this.$Modal.info({
          title: "提示信息",
          content: "暂无号源!"
        });
        return;
      } else {
        this.pandun();
      }
    },
    //判断是否有卡
    pandun(){
      //开启加载动画
      let _this = this;
      if(_this.$store.getters.getDoccode==null||_this.$store.getters.getDoccode=='null'||_this.$store.getters.getDoccode==undefined||_this.$store.getters.getDepname==null||_this.$store.getters.getDepname=='null'||_this.$store.getters.getDepname==undefined||_this.$store.getters.getdepCode==null||_this.$store.getters.getdepCode=='null'||_this.$store.getters.getdepCode==undefined||_this.$store.getters.getDocName==null||_this.$store.getters.getDocName=='null'||_this.$store.getters.getDocName==undefined){
      _this.$Modal.warning({//超时提示：网络不稳定
          title: '友情提示',
          content: '获取信息异常，请重新获取',
      });
        _this.$router.push("/home");                    
      }else{
        _this.$router.push("/registeredInfo");
      }
    },
    //存储医生信息
    savedoctorinfo(index) {
      let _this = this;
      let currentDay=_this.time[index].times;
      //把返回的医生详细信息的费用 号源源码 号源名称保存到vuex
      // let currentDay = _this.getcurrentday();
      var haoyuans='';
      for(var i = 0;i<_this.haoyuan.length;i++){
        if(_this.getcurrentday(_this.haoyuan[i].clinicdate)==currentDay){
          haoyuans=_this.haoyuan[i];
        }
      }
      var a = 0;
      if(haoyuans!==''){
        if(haoyuans.ghzt!=1){
            _this.$store.commit("setRegdata", _this.getcurrentday(haoyuans.clinicdate));
            var str = haoyuans.cliniclabel;
            if(str.indexOf( _this.$store.getters.getDocName) !== -1){
                a = 1
                _this.$store.commit("setRegprice", haoyuans.price); //挂号支付的费用
                _this.$store.commit("setRegcode", haoyuans.cliniclabel); //存储号源编码
                _this.$store.commit("setamprom", haoyuans.amorpm); //保存白天昼夜
                _this.pmstate = '未约满';
                _this.doctorRole=JSON.parse(haoyuans.doctorrole);
                for(var i =0;i<_this.doctorRole.length;i++){
                  if(_this.doctorRole[i]==2){
                    _this.yuyue=false;
                  }
                  if(_this.doctorRole[i]==1){
                    _this.zixun=false;
                  }
                  if(_this.doctorRole[i]==0){
                    _this.fuzhen=false;
                  }
                }
            }
        }else{
          _this.pmstate = '未出诊';
         _this.yuyue=true;
        }
      }else{
        _this.pmstate = '暂无号源';
        _this.yuyue=true;
      }
    if(_this.numeer==1){
      _this.numeer=0;
      let url1 = location.href;
      //后台接口
      var reurl = this.$store.getters.getUrl + "SweepCode.do";
      let ajaxTimeOut = $.ajax({
        url: reurl,
        type: "post",
        dataType: "json",
        async: true,
        timeout: 15000, //通过timeout属性，设置超时时间
        data: { url: url1 },
        success: function(data) {
          //取消禁止点击扫一扫
          wx.config({
            debug: false,
            appId: data.appId, // 必填,公众号的唯一标识
            timestamp:  data.timestamp, // 必填,生成签名的时间戳
            nonceStr: data.nonceStr, // 必填,生成签名的随机串
            signature:  data.signature, // 必填,签名
            jsApiList: [
              "onMenuShareAppMessage",
              "hideAllNonBaseMenuItem",
              "onMenuShareTimeline"
              ] // 必填,需要使用的JS接口列表
          });
        },
        error: function(data) {
          
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
      });
      let targurl=location.href
      let msg=haoyuans.cliniclabel
      let baseimgurl=this.$store.getters.getUrl
      wx.ready(function() {
          // if(type!=0){
          //     wx.hideAllNonBaseMenuItem({
          //         success:function(res){
          //         }
          //     });
          // }
          wx.hideMenuItems({// 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
              menuList: ["menuItem:setFont"]
          });
          wx.onMenuShareAppMessage({ 
              title: '滦平县妇幼保健院挂号缴费平台', // 分享标题
              desc: msg, // 分享描述
              link: targurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: baseimgurl+'static/img/logo.18b2d33.jpg', // 分享图标
              success:function(res) { 
              }
          });
          wx.onMenuShareTimeline({
                title: '滦平县妇幼保健院挂号缴费平台', // 分享标题
                link: targurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: baseimgurl+'static/img/logo.18b2d33.jpg', // 分享图标
                success: function () {
                // 用户点击了分享后执行的回调函数
                },
          });

          /* 处理失败验证 */
          wx.error(function(res) {
            // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
            // _this.$Message.error("配置验证失败: " + res.errMsg);
          });
      })
    }
    },
    //获取医生信息
    getdoctorinfo(){
      var that = this;
      var url = that.$store.getters.getUrl + "doctors/getDocSches.do";
      var doccode = that.$store.getters.getDoccode;
      var departid = that.$store.getters.getdepCode;
      let ajaxTimeOut = $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        timeout: 15000, //通过timeout属性，设置超时时间
        data: { doccode,departid},
        success:function(data){
          that.spinShow = false;
          if(data.status==1){
            that.haoyuan=data.data;
          }
          // that.savedoctorinfo();
        },
        error:function(data){
          that.spinShow = false;
          
          
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
    // getdoctorinfo() {
    //   //把就诊日期存储到vuex仓库
    //   var url = this.$store.getters.getUrl + "doctors/getDocSche.do";
    //   var _this = this;
    //   //获取链接里的医生编码参数
    //   var currentdepCode = _this.$store.getters.getdepCode;
    //   var doctorname = _this.$store.getters.getDocName;
    //   //发送请求获取当前医生详细的排班信息
    //   let ajaxTimeOut = $.ajax({
    //     url: url,
    //     type: "post",
    //     dataType: "json",
    //     // async: false,
    //     timeout: 15000, //通过timeout属性，设置超时时间
    //     data: { departid: currentdepCode,doctorname:doctorname},
    //     success: function(data) {
    //       _this.spinShow = false;
    //       if (data.Response.ResultCode == "1"&&data.Response.Item!=undefined) {
    //             if(data.Response.Item.length==undefined){
    //               _this.doctor.push(data.Response.Item)
    //             }else{
    //                _this.doctor=data.Response.Item;
    //             }
    //         _this.savedoctorinfo();
    //       } else {
    //         _this.$Modal.warning({
    //           title: "提示信息",
    //           content: "获取信息异常"
    //         });
    //         _this.$router.push("/abnormal");
    //       }
    //     },
    //     error: function(data) {
    //       //弹窗提示错误信息
    //       _this.spinShow = false;
    //       _this.$Modal.error({
    //         title: "提示信息",
    //         content: "请求失败"
    //       });
    //     },
    //     complete: function (XMLHttpRequest, status) { //当请求完成时调用函数
    //         if (status == 'timeout') {//status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
    //           ajaxTimeOut.abort(); //取消请求
              
    //           _this.$Modal.warning({     //超时提示：网络不稳定
    //             title: '友情提示',
    //             content: '请求超时',
    //           });
    //         }
    //     }
    //   });
    // },
    //查看医生详细信息
    doctorxinxi(){
      // $(".zhe").css("display","block");
      var that = this;
      var url = that.$store.getters.getUrl + "doctors/getdoctor.do";
      var doccode=that.$store.getters.getDoccode;
      let ajaxTimeOut=$.ajax({
        url: url,
        type: "post",
        dataType: "json",
        timeout: 15000, //通过timeout属性，设置超时时间
        data: {
          doccode: doccode
        },
        success:function(data){
          that.isshowloading = false;
          that.docxiang=data.data;
          that.title = that.docxiang[0].title;
         that.job = that.docxiang[0].job;
          if(data.data[0].expertjob!==undefined){
             that.jiajie=data.data[0].expertjob;
          }else{
            that.jiajie='无'
          }
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
    },
  }
};
</script>

<style scoped>
.ivu-poptip-popper{
  top: 45px !important;
    left: 0px !important;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}

.appointmentPage {
  overflow: auto;
  padding: 0 0 70px 0;
}
.home-page {
  height: 100%;
  overflow: auto;
}
.tittle {
  background: #28b8a1;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-family: PingFangSC-regular;
  position: relative;
}
.pp{
   position: absolute;
  right: 10px;
  top: 0px;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.doctorInfo {
  padding-left: 80px;
  position: relative;
  margin-top: 20px;
  display: inline-block;
  vertical-align: middle;
}
.doctorInfo .doctorName,
.doctorInfo .otherinfo {
  margin-bottom: 6px;
}
.doctorName {
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  font-family: PingFangSC-regular;
  font-weight: bolder;
}
.po{
  line-height: 2;
  display: inline-block;
  padding-left: 10px;
}
.otherinfo {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: PingFangSC-regular;
  display: flex;
}
.otherinfo1{
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: PingFangSC-regular;
}
.otherinfo .otherinfo-title {
  flex-shrink: 0;
}
.otherinfo .otherinfo-text {
  padding-right: 18px;
}
.avatar {
  border-radius: 50%;
  top: 20px;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 18px;
  top: 25px;
}
.avatar1 {
  border-radius: 50%;
    top: 5.33333vw;
    width: 13.33333vw;
    height: 13.33333vw;
    position: absolute;
        left: -0.2vw;
    top: -11.66667vw;
}
 
.date {
  display: flex;
  margin: 18px 0;
}
.date .date-left {
  display: flex;
  padding-right: 20px;
  margin: 0 10px;
  overflow: auto;
}
.date .date-left .dateitem {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: rgba(40, 184, 161, 1);
  border: 1px solid rgba(187, 187, 187, 1);
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
}
.date .date-left .dateitem p {
  text-align: center;
  color: white;
}
.date-right {
  flex: 1;
  padding-top: 6px;
}
.date-right .text {
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  font-family: PingFangSC-regular;
  margin: 5px 0;
  text-align: center;
}
.date-right .iconwrraper {
  text-align: center;
}
.date-right .icon {
  display: inline-block;
  border-top: 9px solid rgba(187, 187, 187, 1);
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
}
.select-item {
  font-size: 14px;
  font-family: PingFangSC-regular;
  padding: 10px 20px;
  /* height: 60px; */
  /* line-height: 60px; */
  /* border-bottom: 1px solid rgba(187, 187, 187, 1); */
}
.calendar {
  text-align: center;
}
.weekwrraper {
  display: inline-block;
  text-align: left;
}
.weekwrraper > div {
  display: inline-block;
}
.weekwrraper .item {
  display: inline-block;
  width: 50px;
  text-align: center;
}
.daywrraper {
  display: inline-block;
}
.daywrraper > div {
  text-align: left;
  display: inline-block;
  width: 350px;
}
.daywrraper .item {
  display: inline-block;
  width: 50px;
  text-align: center;
}
.item-color {
  color: green;
  
}
.amstate {
  color: red;
}
.pmstate {
  color: red;
}
.zhou{
  display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    width: 100%;
     margin: 10px 0 0 0;
}
.zhou div{
  text-align: center;
  padding: 10px  8px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.div>input{
    display: none;
    
}
.div>label{
    position: relative;
    margin-right: 34px;
    display: block;
    /* line-height: 2; */
    font-size:16px;
}
.div>label::before{
    display: inline-block;
    content: "";
    width: 5.26667vw;
    height: 5.26667vw;
    /* border-radius: 50%; */
    border: 1px solid rgb(219, 219, 219);
    margin-right: 6px;
    vertical-align: bottom;
}
.div>input:checked+label::before{
    background-color:#1989fa;
}
.div>input:checked+label::after{
    display: inline-block;
    content: "";
    width: 2vw;
    height: 2vw;
    /* border-radius: 50%; */
    position: absolute;
    left: 1.7vw;
    bottom: 1.7vw;
    background-color: white;
    
}

.pmoram{
  font-size:14px;
  background: #fff;
  color: #000;
  padding: 10px;
  /* border-radius: 5px; */
  /* text-align: center; */
  
}
.pqw{
  font-size:14px;
  background: rgb(40, 184, 161);
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}
</style>