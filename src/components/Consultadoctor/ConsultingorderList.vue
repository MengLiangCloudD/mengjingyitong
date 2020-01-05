<template>
  <div class="orderLists">
  <!-- <pull-refresh :next="refresh">
    <div slot="list" class="orderList-page"> -->
    <div class="titlei">
      <div class="tittle">
        <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div
      >咨询订单
      </div>
      <div class="xuanze"  style="position: relative;">
         <div style="display:inline-block;width:100%">
         <span style="color:rgb(40, 184, 161);font-size:20px;" @click="qingkong">全部订单</span>
          <el-date-picker
            v-model="value1"
            type="month"
            style="width:35%; border:0; position: absolute;right: 5%;top: 7px;"
            @change="selecter"
            placeholder="选择月份"
            :editable="false"
            :clearable="false"
             size="small"
            >
          </el-date-picker>
          </div>
      </div>
    </div>
    <div  class="contenttt">
      <div  v-if="orderList.length<=0&&orderListes.length<=0">
        <p style="text-align: center;font-size:18px;margin-top:30px;">您还未创建订单</p>
      </div>
      <div
        class="content"
        v-for="(item,index) in orderList"
        :key="index+'1'"
      >
        <div class="lineItem" v-if="orderList.length!==0">
          <p>
            <span>滦平县妇幼保健院</span>
            <span class="green">待支付</span>
          </p>
          <p>
            <span>订单号</span>
            <span>{{item.tradeno}}</span>
          </p>
          <p>
            <span>卡号</span>
            <span>{{item.cardno}}</span>
          </p>
          <p>
            <span>患者姓名</span>
            <span>{{item.username}}</span>
          </p>
          <p>
            <span>订单时间</span>
            <span>{{item.orderTime}}</span>
          </p>
          <p>
            <span>医生姓名</span>
            <span>{{item.docName}}</span>
          </p>
          <p>
            <span>咨询费用</span>
            <span style="color:red">￥{{item.price}}</span>
          </p>
          <p>
              <span>患病时长</span>
              <span>￥{{item.ilnessTime}}</span>
            </p>
          <p>
            <span>咨询内容</span>
            <span>{{item.text}}</span>
          </p>
          <p>
            <span></span>
            <span>
              <Button type="success" @click.stop="payment(item)" v-bind:disabled="isDisabl" >去支付</Button>
            </span>
          </p>
        </div>
      </div>
      <div class="content" v-for="(item,index) in orderListes" :key="index" >
        <div class="lineItem" v-if="orderListes.length!==0">
          <div>
            <p>
              <span>滦平县妇幼保健院</span>
              <span v-if="item.status==2&&item.pj==0&&time <= item.regdate">待评价</span>
              <span v-if="item.status==2&&item.pj==1">已评价</span>
            </p>
            <p>
                <span>订单号</span>
                <span>{{item.tradeno}}</span>
            </p>
            <p>
              <span>卡号</span>
              <span>{{item.cardno}}</span>
            </p>
            <p>
              <span>患者姓名</span>
              <span>{{item.name}}</span>
            </p>
            <p>
              <span>订单时间</span>
              <span>{{item.orderTime}}</span>
            </p>
            <p>
              <span>医生姓名</span>
              <span>{{item.hosdocname}}</span>
            </p>
            <p>
              <span>咨询费用</span>
              <span style="color:red">￥{{item.price}}</span>
            </p>
            <p>
              <span>患病时长</span>
              <span>{{item.registerfee}}</span>
            </p>
            <p>
              <span>咨询内容</span>
              <span>{{item.regcode}}</span>
            </p>
            <p>
              <span></span>
              <span>
                <Button type="info" v-if="item.status==2&&item.pj==0&&time <=item.regdate" @click.stop="evaluate(item)">评价</Button>
              </span>
            </p>
          </div>
          </div>
          
      </div>
    </div>
    <!-- </div>
  </pull-refresh> -->
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show='isloading'></loading>
  </div>
</template>
<script>
//医生头像
import personicon from "../../common/personicon"
//底部公共组件
import tabbar from "../../common/tabbar";
// 加载动画
import loading from "../../common/loading";
//下拉刷新
// import pullRefresh from "../common/scrollRefresh";
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
var tiemr = year + "-" + month+ "-" + day
//当前年月日
export default {
  components: {
    personicon,
    tabbar,
    loading,
  },
  data() {
    return {
      isloading:false,
      //顶单列表
      orderList: [{
          tradeno:'202010103030',
          cardno:'130506354',
          name:'孟良',
          regdate:'2020-01-03',
          hosdocname:'刘淑琴',
          registerfee:0.01,
          regcode:'感冒'
      }],
      orderListes:[],
      fsorderListes:[],
      cityList: [], //select数据
      cardlist: [], //存放所有的绑定卡，没有激活的卡不算
      model1: "",
      //卡号
      cardno: "",
      //订单号
      tradeno: "",
      //弹出框
      modal10: false,
      modal101:false,
      isDisable: false,
      currentIndex: "",
      miaomi:0,
      times:'',
      isDisabl:false,
      isbinen:true,
      value1:'',
      isDisables:false,
      time:tiemr,
      size:10
       
    };
  },

  methods: {
   
    //返回上一层
    tobackdetail(){
        this.$router.push('/Myaccount');
    },
    //时间转换
    getLocalTime(timestamp) {
      // 如果以秒为单位
      // var dateObj = new Date(timestamp * 1000);
      // 如果以毫秒为单位
      var dateObj = new Date(timestamp);
      return dateObj.getFullYear() + '-' +
        (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-' +
        ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate());
    },
    //时间转换
    ampm(dateObj) {
      // 如果以秒为单位
      // var dateObj = new Date(timestamp * 1000);
      // 如果以毫秒为单位
      return dateObj.getFullYear() + '-' +
        (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-' +
        ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate());
    },
    //清空
    qingkong(){
      if(this.value1!= ''&&this.value1!=null ){
        this.value1= '';
        this.Tobeevaluated();
        this.updated();
      }else{
        
      }
    },
    selecter(){
      if(this.value1==null){
        this.value1= '';
        this.size=10;
      }else{
          this.value1= this.datatime(this.value1);
      }
      this.updated();
      this.Tobeevaluated()
    },
    //获取未支付订单列表
    updated() {
      var that = this;
      // var url = "http://192.168.33.159:8080/register/getRegisterInfo.do";
      var url = that.$store.getters.getUrl + "orders/queryNoPayOrder.do";
      // that.$Loading.start();
      var cardno =  localStorage.getItem("cardno");
      that.isloading=true;
      that.orderList=[]
      let ajaxTimeOut =$.ajax({
        url: url,
        type: "post",
        timeout: 15000, //通过timeout属性，设置超时时间
        // dataType: "json",
        // async: false,
        data: {
          //卡号
          cardno: cardno
        },
        success: function(data) {
          that.orderList=[];
          if(data.code==200){
            
            that.orderList=JSON.parse(data.data);
          }else{
            that.orderList=[];
          }
           that.isloading=false;
        },
        error: function(data) {
          //关闭加载动画
          that.$Loading.finish();
          that.isloading=false;
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
      });
    },
    //标准时间转换
    datatime(data) {
      if(data!==''){
        var d = data;
      }else{
        var d = currentDay;
      }
      
      var y = this.p(d.getFullYear());
      var m = this.p(d.getMonth() + 1);
      var t = this.p(d.getDate());
      var resDate = y + "-" + m;
      return resDate;
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    //获取待评价关注列表
    Tobeevaluated(){
       var that = this;
        var url = that.$store.getters.getUrl + "/orders/queryPayedOrders.do";
        var cardno =  localStorage.getItem("cardno");
        var time =that.value1;;
        var size = that.size; 
      that.isloading=true;
      let ajaxTimeOut =$.ajax({
        url: url,
        type: "post",
        timeout: 15000, //通过timeout属性，设置超时时间
        // dataType: "json",
        // async: false,
        data: {
          //卡号
          cardno: cardno,
          month:time,
          size:size
        },
        success: function(data) {
          that.orderListes=[];  
          that.isloading=false;
        },
        error: function(data) {
          //关闭加载动画
          // that.$Loading.finish();
          that.isloading=false;
          // that.isloading=false;
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
      });
    },
    //进入评价页面
    evaluate(item) {
      if(item!=undefined&&item!=null&&item!=''){
        //进入评论 将医生的姓名带过去
        this.$store.commit("setDoctornam", item.hosdocname);
        //进入评论页将医生所属科室带过去
        this.$store.commit("setReview", item.hosdepname);
        //进入评论页面将医生的编号带过去
        this.$store.commit("setDoccode", item.hosdoccode);
        //进入评论页将订单号带过去
        var items  = JSON.stringify(item);
        localStorage.setItem('pingitems', items);
        //进入评论页将患者姓名带过去
        this.$store.commit("setName", item.name);
        //跳转到评论页面
        this.$router.push("/evaluate");
      }
      
    },
    //前往支付页面
    payment(item) {
      var that =this;
      if(item!=undefined&&item!=null&&item!=''){
         //将localStorage里的订单号替换
          localStorage.setItem("tradeno", item.tradeno);
          //将vuex里的费用替换
          that.$store.commit("setRegprice", item.price);
          //将vuex里的卡号替换
          that.$store.commit("setCardCode", item.cardno);
      }
     
      localStorage.setItem("body", '咨询医生');
      localStorage.setItem('time', item.orderTime);
      //跳转到支付页面
      var url  =  that.$store.getters.getUrl + "orders/qureyOrderOutTime.do";
      let cardno=item.cardno;
      let doctorno =item.docCode;
      let ajaxTimeOut = $.ajax({
        url:url,
        type:'post',
        dataType:'json',
        timeout: 15000, //通过timeout属性，设置超时时间
        data:{
          cardno:cardno,
          doccode:doctorno
        },
        success:function(data){
          if(data.code==200){
            that.$router.push("/payment");
          }else if(data.code==500){
            that.updated();
            that.btnTimer("支付超时，请重新预约",0);
            // that.$Message.success("");
          }else if(data.status==-1){
            that.btnTimer("请求异常",0);
          }
        },error:function(data){

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
     //按钮弹窗在点击后1.5秒不能再次弹出（1.5秒是弹窗默认出现消失的时间）
    //第一个text是弹窗内的文本 必须是字符串
    //第二个参数是弹窗类型 0/1/2 警告/错误/成功
    //全局必须有一个控制按钮可不可点击的属性 isDisabl:false,
    btnTimer(text,type){
      //警告窗口
      let timer = null;//控制按钮在弹窗结束前多次点击无效
      let _this = this;
      _this.isDisabl = true;
        if(_this.isDisabl == true){
           if(type === 0){
             _this.$Message.warning(text);
           }else if(type == 1){
             _this.$Message.error(text);
           }else if(type == 2){
             _this.$Message.success(text);
           }
          timer = setInterval(function(){
              _this.isDisabl = false;
              clearInterval(timer);
          },1400)
        }
    },
  },
  mounted(){
    let that=this
    // that.isloading = true;
    const el = document.querySelector('.orderLists');
    const offsetHeight = el.offsetHeight;
    setInterval(function(){
      el.onscroll = () => {
         const scrollTop = el.scrollTop;
         const scrollHeight = el.scrollHeight;
         if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
            //每次滚动到底部size+10
            that.size+=5;
            // that.updated();
            that.Tobeevaluated();
        }
      }
    },1000)
  },
  //调用渲染
  created() {
    //请求数据列表
    
    this.updated();
    // this.Tobeevaluated();
     let that=this
    const requesturl=that.$store.getters.getUrl + "SweepCode.do";
    hidemenu(requesturl);
    // this.timeFn(this.orderList.data[0].starttime);
  }
};
</script>
<style scoped>
.xuanze {
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  background: #fff;
}
.xuanze span {
  font-size: 16px;
  display: inline-block;
  /* padding: 10px; */
  margin-left: 5%;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.orderLists{
  height: 100%;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 50px;
  overflow: auto;
}
.orderList-page {
  /* height: 100%; */
  overflow: auto;
  padding: 0 0 70px 0;
}
.tittle {
  background: rgb(40, 184, 161);
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  font-family: PingFangSC-regular;
  font-weight: 900;
      position: relative;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.content {
  width: 100%;
  display: inline-block;
  padding: 10px 5%;
  border-bottom: 7px solid #ccc;
  
}
.PersonSeekingMedicalService {
  position: relative;
  padding: 20px 0;
  font-size: 18px;
}
.PersonSeekingMedicalService span:nth-child(2) {
  position: absolute;
  right: 10%;
  font-size: 18px;
}
.PersonSeekingMedicalService span:nth-child(2) a {
  text-decoration: none;
  color: #28b8a1;
}
.lineItem p {
  padding: 5px 0;
  position: relative;
}
.lineItem p:nth-of-type(1) {
  position: relative;
}
.lineItem p:nth-of-type(1) span:nth-of-type(2) {
  position: absolute;
  right: 0%;
  font-weight: 900;
}
.lineItem p:nth-of-type(10) span:nth-of-type(2) {
  display: inline-block;
  position: absolute;
  right: 0%;
  bottom: 0px;
}
.green {
  position: absolute;
  right: 0%;
  color: #28b8a1;
  font-weight: 900;
}
.lineItem p:nth-of-type(1) span:nth-of-type(1) {
  font-weight: 600;
}
.lineItem p span:nth-of-type(1) {
  display: inline-block;
  color: #7f7f7f;
  width: 29%;
}

.lineItem p:nth-of-type(2) span:nth-of-type(2) {
  display: inline-block;
  padding: 0 0 0 15px;
  font-weight: 600;
}
.lineItem p:nth-of-type(3) span:nth-of-type(1) {
  display: inline-block;
  padding: 0 15px 0 0;
  color: #7f7f7f;
}
.lineItem p:nth-of-type(3) span:nth-of-type(2) {
  display: inline-block;
  padding: 0 0 0 15px;
  font-weight: 600;
}

#select {
  color: #28b8a1;
  background: white;
}
option {
  color: #28b8a1;
}
.lineItem p span:nth-of-type(2) {
  display: inline-block;
  text-align: left;
  padding: 0 !important;
}
.titlei{
  position: fixed;
  width: 100%;
  z-index: 888
}
.contenttt{
  padding-top: 100px;
}
</style>