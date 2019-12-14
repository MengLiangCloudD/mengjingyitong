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
      <div class="otherinfo1" style="border-bottom: 1px solid rgba(187, 187, 187, 1);padding: 0 18px 18px 18px;" v-if="!play">
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
        <p class="select-item item-color" :class="{pmstate:pmstate=='暂无号源'||pmstate=='未出诊'}">剩余号源：{{pmstate}}</p>
        <div style="display:flex">
          <p style="padding:0 20px;margin:20px 0px;flex:1">
             <Button :disabled="yuyue" @click="amRegistered()" size="large" type="primary" long v-if="pmstate=='未约满'">预约</Button>
             <Button :disabled="yuyue"  size="large"  type="primary" long v-if="pmstate=='暂无号源'||pmstate=='未出诊'">预约</Button>
          </p>
          <p style="padding:0 20px;margin:20px 0px;flex:1">
            <Button :disabled="fuzhen" @click="amRegistered()" size="large" type="primary" long>复诊</Button>
          </p>
          <!-- <p style="padding:0 20px;margin:20px 0px;flex:1">
            <Button :disabled="zixun" @click="amRegistered()" size="large" type="primary" long>咨询</Button>
          </p> -->
        </div>
        <div style="display:flex">
          <p style="padding:0 20px;margin:20px 0px;flex:1">
            <Button :disabled="zixun" @click="amRegistered()" size="large" type="primary" long>咨询</Button>
          </p>
          <p style="padding:0 20px;margin:20px 0px;flex:1;opacity: 0;">
            <Button :disabled="true" @click="amRegistered()" size="large" type="primary" long>咨询</Button>
          </p>
        </div>
      </div>
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
      zixun:true
    };
  },
  created(){
    this.tab(7);
    
  },
  //在mounted钩子里去获取医生的信息 保存支付费用 存储号源编码
  mounted() {
    this.spinShow = true;
    this.getdoctorinfo();
    this.doctorxinxi()
    var xuanqi = document.getElementsByClassName('xuanqi');
    xuanqi[0].style.background='rgba(40, 184, 161, 1)'
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
  margin-top: 26px;
  
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
        left: 0.8vw;
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
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid rgba(187, 187, 187, 1);
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
  padding: 10px  9px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>