<template>
  <div class="orderLists">
  <pull-refresh :next="refresh">
    <div slot="list" class="orderList-page">
      <div class="tittle">
        <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>挂号列表</div>
      <div class="xuanze"  style="position: relative;">
         <div style="display:inline-block;width:100%">
          <span style="color:rgb(40, 184, 161);font-size:20px;">选择日期:</span>
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
      <div  v-if="orderList.length<=0&&orderListes.length<=0">
        <p style="text-align: center;font-size:18px;margin-top:30px;">您还未创建订单</p>
      </div>
      <div
        class="content"
        v-for="(item,index) in orderList"
        :key="index"
      >
        <div class="lineItem" v-if="orderList.length!==0">
          <p>
            <span>滦平县妇幼保健院</span>
            <span  class="green">待支付</span>
            <span v-if="item.status==1" class="green">待就诊</span>
            <span v-if="item.status==2">待评价</span>
            <span v-if="item.status==3">已评价</span>
            <span v-if="item.status==4" style="color:red">已退款</span>
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
            <span>挂号时间</span>
            <span>{{item.regdate}}</span>
          </p>
          <p>
            <span>医生姓名</span>
            <span>{{item.hosdocname}}</span>
          </p>
          <p>
            <span>挂号费用</span>
            <span style="color:red">￥{{item.registerfee}}</span>
          </p>
          <p>
            <span>科室名称</span>
            <span>{{item.hosdepname}}</span>
          </p>
          <p>
            <span>挂号科目</span>
            <span>{{item.regcode}}</span>
          </p>
          <p>
            <span></span>
            <span>
              <Button type="success" @click.stop="payment(item)" v-bind:disabled="isDisabl" >去支付</Button>
              <Button type="info" v-if="item.status==2||item.pj==0" @click.stop="evaluate(item)">评价</Button>
              <!-- <Button type="warning" v-if="item.status==4||item.status==3||item.status==0" @click.stop="tests(index)">删除订单</Button> -->
              <!-- <Modal v-model="modal101" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>删除订单</span>
                </p>
                <div style="text-align:center">
                  <p>您确认要删除订单吗</p>
                </div>
                <div slot="footer">
                  <Button type="success" size="large" long @click="topayments()">确定</Button>
                </div>
              </Modal> -->
            </span>
          </p>
        </div>
      </div>
      <div class="content" v-for="(item,index) in orderListes" :key="index" >
        <div class="lineItem" v-if="orderListes.length!==0">
          <p>
            <span>滦平县妇幼保健院</span>
            <span v-if="item.status==1&&item.doctorno==0" class="green">待就诊</span>
            <span v-if="item.status==2&&item.pj==0">待评价</span>
            <span v-if="item.status==2&&item.pj==1">已评价</span>
          </p>
          <p></p>
          <p>
            <span>卡号</span>
            <span>{{item.cardno}}</span>
          </p>
          <p>
            <span>患者姓名</span>
            <span>{{item.name}}</span>
          </p>
          <p>
            <span>挂号时间</span>
            <span>{{item.regdate}}</span>
          </p>
          <p>
            <span>医生姓名</span>
            <span>{{item.hosdocname}}</span>
          </p>
          <p>
            <span>挂号费用</span>
            <span style="color:red">￥{{item.registerfee}}</span>
          </p>
          <p>
            <span>科室名称</span>
            <span>{{item.hosdepname}}</span>
          </p>
          <p>
            <span>挂号科目</span>
            <span>{{item.regcode}}</span>
          </p>
           <p>
            <span></span>
            <span>
              <Button type="info" v-if="item.status==2&&item.pj==0" @click.stop="evaluate(item)">评价</Button>
              <Button type="info" v-if="item.doctorno==0&&item.operator=='wx'" @click.stop="test(index)">取消挂号</Button>
              <!-- <Button type="warning" v-if="item.status==4||item.status==3||item.status==0" @click.stop="tests(index)">删除订单</Button> -->
              <!-- <Modal v-model="modal101" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>删除订单</span>
                </p>
                <div style="text-align:center">
                  <p>您确认要删除订单吗</p>
                </div>
                <div slot="footer">
                  <Button type="success" size="large" long @click="topayments()">确定</Button>
                </div>
              </Modal> -->
              <Modal v-model="modal10" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>取消挂号</span>
                </p>
                <div style="text-align:center">
                  <p>您确认要取消挂号吗</p>
                </div>
                <div slot="footer">
                  <Button type="success" size="large" long @click="topayment()">确定</Button>
                </div>
              </Modal>
            </span>
          </p>
        </div>
      </div>
    </div>
  </pull-refresh>
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show='isloading'></loading>
  </div>
</template>
<script>
//医生头像
import personicon from "../common/personicon";
//底部公共组件
import tabbar from "../common/tabbar";
// 加载动画
import loading from "../common/loading";
//下拉刷新
import pullRefresh from "../common/scrollRefresh";
import {hidemenu} from "../common/js/hide"
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
export default {
  components: {
    personicon,
    tabbar,
    loading,
    pullRefresh
  },
  data() {
    return {
      isloading:false,
      //顶单列表
      orderList: [],
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
       value1:currentDay,
       isDisables:false,
       
    };
  },

  methods: {
    //下拉刷新
    refresh() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.updated();
            this.Tobeevaluated();
          resolve();
        }, 2000);
      });
    },
    //返回上一层
    tobackdetail(){
        this.$router.push('/Myaccount');
    },
    //点击开启弹窗 取消挂号
    test(index) {
      this.currentIndex = index;
      this.modal10 = true;
    },
    //删除订单
    tests(index) {
      this.currentIndex = index;
      this.modal101 = true;
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
    selecter(){
      this.updated();
      this.Tobeevaluated()
    },
    //获取未支付订单列表
    updated() {
      var that = this;
      // var url = "http://192.168.33.159:8080/register/getRegisterInfo.do";
      var url = that.$store.getters.getUrl + "register/getRegisterRedis.do";
      // that.$Loading.start();
      var cardno =  localStorage.getItem("cardno");
      that.isloading=true;
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
           that.isloading=false;
          if(data.length>0){
            var dept=JSON.parse(data);
             //获取到订单列表的数据
            for(var i = 0;i<dept.length;i++){
               if( /\d{4}-\d{1,2}/g.exec(dept[i].regdate)[0]==that.datatime(that.value1)){
               that.orderList.push(dept[i]);
             }else{
               that.orderList=[]
             }
            }
            
          //关闭加载动画
          // that.$Loading.finish();
          }else{
               that.orderList=[]
             }
         
        },
        error: function(data) {
          //关闭加载动画
          that.$Loading.finish();
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
    //标准时间转换
    datatime(data) {
      var d = data;
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
        var url = that.$store.getters.getUrl + "register/getRegisterInfo.do";
        var cardno =  localStorage.getItem("cardno");
        var time =that.datatime(that.value1);
      that.isloading=true;
      let ajaxTimeOut =$.ajax({
        url: url,
        type: "post",
         timeout: 15000, //通过timeout属性，设置超时时间
        // dataType: "json",
        // async: false,
        data: {
          //卡号
          patientId: cardno,
          time:time
        },
        success: function(data) {
          that.orderListes=[];     
          that.isloading=false;
             //获取到订单列表的数据
             var datas= JSON.parse(data);
             if(datas.status==1){
                that.fsorderListes=datas.data;
                var visitnoArr=[];
                for(var i = 0;i<datas.data.length;i++){
                  visitnoArr.push(datas.data[i].visitno);
                }
                if(visitnoArr.length>0){
                  var url1 = that.$store.getters.getUrl + "register/getTradenoVisitno.do";
                  var visitnoArr =JSON.stringify(visitnoArr).replace(/\[|]/g,'');
                  var type = '微信挂号';
                  $.ajax({
                      url: url1,
                      type: "post",
                      timeout: 15000, //通过timeout属性，设置超时时间
                      // dataType: "json",
                      // async: false,
                      data: {
                        //卡号
                        visitnoArr: visitnoArr,
                        type:type
                      },
                      success:function(data1){
                        if(JSON.parse(data1).status==1){
                          var obj =that.fsorderListes;
                          var obj1=JSON.parse(data1).data;
                          var obj2=[];
                          for(var i = 0;i<obj.length;i++){
                              var p ={}
                              for(var j = 0;j<obj1.length;j++){
                                  if(obj[i].visitno==obj1[j].visitno){
                                      p.name=obj[i].name;
                                      p.age=obj[i].age;
                                      p.amorpm=obj[i].amorpm;
                                      p.birthdate=obj[i].birthdate;
                                      p.cardname=obj[i].cardname;
                                      p.cardno=obj[i].cardno;
                                      p.clinicno=obj[i].clinicno;
                                      p.doctorno=obj[i].doctorno;
                                      p.hosdepcode=obj[i].hosdepcode;
                                      p.hosdepname=obj[i].hosdepname;
                                      p.hosdoccode=obj[i].hosdoccode;
                                      p.hosdocname=obj[i].hosdocname;
                                      p.idno=obj[i].idno;
                                      p.operator=obj[i].operator;
                                      p.pj=obj[i].pj;
                                      p.regcode=obj[i].regcode;
                                      p.regdate=obj[i].regdate;
                                      p.registerfee=obj[i].registerfee;
                                      p.sex=obj[i].sex;
                                      p.status=obj[i].status;
                                      p.visitno=obj[i].visitno;
                                      p.tradeno=obj1[j].tradeno;
                                      obj2.push(p);
                                  }
                              }
                          }
                           that.orderListes=obj2;
                        }
                      },
                      error:function(data){
                      }
                  })
                }else{
                  that.orderListes=[]
                }
             }else if(datas.status==-1){
               that.orderListes=[]
                that.$Message.warning(datas.message);
             }else{
                that.orderListes=[]
             }
          //关闭加载动画
          // that.$Loading.finish();
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
    //取消挂号 并退款
    refund() {
      let _this = this;
      //判断点的是第几个
      let index = _this.currentIndex;
      //关闭弹窗
      _this.modal10 = false;
      let obj = {};
      //卡号
      obj.cardno = _this.orderListes[index].cardno;
      //科室编码
      obj.deptcode = _this.orderListes[index].hosdepcode;
      //挂号时间
      obj.visitdate = _this.orderListes[index].regdate;
      //订单号
      obj.tradeno = _this.orderListes[index].tradeno;
      //openid
      obj.openid = _this.orderListes[index].openid;
      //患者姓名
      obj.name = _this.orderListes[index].name;
      //科室名称
      obj.hosdepname = _this.orderListes[index].hosdepname;
      //医生姓名
      obj.docname = _this.orderListes[index].hosdocname;
      //白天还是昼夜
      obj.amorpm = _this.orderListes[index].amorpm;
      //挂号支付费用
      obj.fee = _this.orderListes[index].registerfee;
      //就诊序号
      obj.visitno=_this.orderListes[index].visitno;
      var url = _this.$store.getters.getUrl + "register/registeredRefund.do";
      _this.modal10 = false;
      _this.isloading=true;
      let ajaxTimeOut =$.ajax({
        url: url,
        type: "post",
        dataType: "json",
        timeout: 15000, //通过timeout属性，设置超时时间
        // async: false,
        //传送数据
        data: obj,
        success: function(data) {
          //关闭弹窗
          _this.isloading=false;
          _this.isDisable = false;
          if (data.status == 1) {
            //返回模板信息
            //用户提示
            _this.$Message.success("您已成功取消订单");
            //刷新数据
            _this.Tobeevaluated();
          } else if (data.status == 0) {
            //退款失败提示
            _this.$Message.error("退款失败");
          }
        },
        error: function(data) {
           _this.isDisable = false;
          _this.isloading=false;
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
    },
    //当状态等于3时可以选择删除订单
    delateOrder(item) {
      let _this = this;
    },
    //点击退款时触发
    topayment() {
      //开始退款改为true，表示在isDisable为true的时候禁止用户再次点击
      if (!this.isDisable) {
        //如果isDisable为false，将它改为true
        this.isDisable = true;
        //调用取消订单的方法
        this.refund();
      } else {
        //这时isDisable为true禁止用户再次点击
        return;
      }
    },
    //点击退款时触发
    topayments() {
      //开始退款改为true，表示在isDisable为true的时候禁止用户再次点击
      if (!this.isDisables) {
        //如果isDisable为false，将它改为true
        this.isDisables = true;
        //调用取消订单的方法
        this.delatea();
      } else {
        //这时isDisable为true禁止用户再次点击
        return;
      }
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
          that.$store.commit("setRegprice", item.registerfee);
          //将vuex里的卡号替换
          that.$store.commit("setCardCode", item.cardno);
      }
     
      localStorage.setItem("body", '微信挂号');
      localStorage.setItem('time', item.starttime);
      //跳转到支付页面
      var url  =  that.$store.getters.getUrl + "register/getVerification.do";
      let cardno=that.$store.getters.getCardCode
      let doctorno =item.hosdoccode;
      let ajaxTimeOut = $.ajax({
        url:url,
        type:'post',
        dataType:'json',
        timeout: 15000, //通过timeout属性，设置超时时间
        data:{
          cardno:cardno,
          doctorno:doctorno
        },
        success:function(data){
          if(data.status==1){
            that.$router.push("/payment");
          }else if(data.status==0){
            that.updated()
            that.btnTimer("支付超时，请重新挂号",0);
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
    //删除订单
    delatea(){
      var that =this;
      var index = that.currentIndex;
      var url = that.$store.getters.getUrl + "register/cancelPay.do";
      var cardno=that.orderList.data[index].cardno;
      var tradeno=that.orderList.data[index].tradeno;
      var status=that.orderList.data[index].status;
      that.isloading=true;

       let ajaxTimeOut =$.ajax({
        type:'post',
        url:url,
        dataType:'json',
         timeout: 15000, //通过timeout属性，设置超时时间
        data:{
          cardno:cardno,
          tradeno:tradeno,
          status:status
        },
        success:function(data){
           that.isloading=false;
          that.isDisables = false;
          
          that.modal101 = false;
          if(data.status==1){
            that.$Message.success("您已成功删除订单");
            
            that.updated();
          }
          if(data.status==0){
             that.$Message.error("删除订单失败");
          }
          if(data.status==-1){
             that.$Message.error("删除异常");
          }
        },
        error:function(data){
           that.isloading=true;
          that.isDisables = false;
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
    // selector(){
      
    
    // }
  },
  //调用渲染
  created() {
    //请求数据列表
     this.updated();
    this.Tobeevaluated();
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
</style>