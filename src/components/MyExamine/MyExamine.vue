<template>
  <div class="MyExamine">
    <!-- <pull-refresh :next="refresh">
      <div slot="list" style="padding-bottom:60px"> -->
      <div class="titlei">
        <div class="title">
                <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
                我的检查结果
        </div>
        <div class="xuanze"  style="position: relative;">
           <div style="display:inline-block;width:100%">
          <span style="color:rgb(40, 184, 161);font-size:20px;" @click="qingkong">全部检查结果</span>
          <!-- <span style="color:rgb(40, 184, 161);font-size:20px;position: absolute;right:38%;top: 7px;">选择月份:</span> -->
          
          <el-date-picker
            v-model="value1"
            type="month"
            style="width:30%; border:0; position: absolute;right: 5%;top: 7px;"
            @change="shaixuan"
            placeholder="选择月份"
            :editable="false"
            :clearable="true"
             size="small"
            >
          </el-date-picker>
          </div>
        </div>
      </div>
      <div class="contenttt">
        <div class="fee-item" v-if="prescription.length<=0" style="font-size:20px; text-align: center;">
          <p style="padding:50px 0; font-size:18px">暂无数据</p>
        </div>
        <div class="fee-item" v-if="prescription!==undefined&&prescription.length>0">
          <div v-for="(item,index) in prescription" :key="index">
            <div class="content" >
                <p>
                  <span>申请序号</span>
                  <span>{{item.exam_no}}</span>
                </p>
                 <p>
                <span>患者卡号</span>
                <span>{{item.patient_id}}</span>
              </p>
                <p>
                  <span>就诊日期</span>
                  <span>{{formatDates(new Date(item.report_date_time))}}</span>
                </p>
                <p>
                  <span>项目名称</span>
                  <span>{{item.exam_item}}</span>
                </p>
                 <p>
                  <span>项目详情</span>
                  <span style="color:blue" @click="mode(index)">查看></span>
                </p>
                <Modal v-model="modal11" fullscreen title="项目详情">
                    <div style="font-size:18px;">
                <div v-if="item.impression.length>=15">
                  <p style="display: inline-block; font-weight:600;"><span>初步诊断:</span> </p>
                  <div class="qq">
                    <p v-for="(item,index) in impression.trim().split(/\s+/)" :key="index">{{item}}</p>
                  </div>
                </div>
                <p>
                  <span style=" font-weight:600;">项目描述:</span>
                  <span>{{description}}</span>
                </p>
                <!-- <p style="text-indent:2rem">{{description}}</p> -->
                    </div>
               </Modal>
            </div>
          </div>
        </div>
      </div>
      <!-- </div>
    </pull-refresh> -->
    <tabbar class="tabbar"></tabbar>
    <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>

<script>
import tabbar from "../../common/tabbar";
import pullRefresh from "../../common/scrollRefresh";
import loading from "../../common/loading";
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
//当前年月日
var time = year + "-" + month;
export default {
  components: {
    tabbar,
    pullRefresh,
    loading
  },
  data() {
    return {
      prescription: [],
      drugList: [],
      value3: "0",
      cardno: [],
      model1: "",
      cityList: [], //select数据
      cardlist: [],
      //弹出框
      modal11: false,
      //当前时间
      value1: '',
      //控制loading组件显示
      isshowloading: false,
      model2:'',
      impression:'',
      description:'',
      size:10
    };
  },
  methods: {
    //返回上一层
    tobackdetail(){
        this.$router.push('/Myaccount')
    },
    //打开弹窗
    mode(index){
      this.modal11 = true;
      this.impression=this.prescription[index].impression;
       this.description=this.prescription[index].description
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
    //时间转换
    formatDates(now) { 
          var year=now.getFullYear();  //取得4位数的年份
          if(now.getMonth()+1 <10){
            var month='0' + (now.getMonth()+1);
          }else{
            var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
          }
          if(now.getDate()<10){
            var date='0' + now.getDate(); 
          }else{
             var date=now.getDate();
          }
               //返回日期月份中的天数（1到31）
          var hour=now.getHours();     //返回日期中的小时数（0到23）
          var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
          var second=now.getSeconds(); //返回日期中的秒数（0到59）
          return year+"-"+month+"-"+date; 
          
    } ,
    // 小于10前面加0
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    //下拉刷新
    refresh() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.examineList();
          resolve();
        }, 2000);
      });
    },
    //清空
    qingkong(){
      if(this.value1!= ''&&this.value1!=null ){
        this.value1= '';
        this.examineList();
      }else{
        
      }
      
    },
    //日期筛选
    shaixuan(){
     if(this.value1==null){
        this.value1= '';
        this.size=10;
      }else{
          this.value1= this.datatime(this.value1);
      }
     this.examineList();
    },
    //请求结果数据
    examineList() {
      var that = this;
      var url =
        that.$store.getters.getUrl + "check/getCheckResult.do";
     var cardno =  localStorage.getItem("cardno");
      var billdate =that.value1;
      var size = that.size;
      //打开加载动画
      that.isshowloading = true;
       let ajaxTimeOut = $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        timeout: 15000, //通过timeout属性，设置超时时间
        // async: false,
        data: {
          cardno: cardno,
          reportime:billdate,
          size:size
        },
        success: function(data) {
          var prescription =[]
          //关闭加载动画
          that.isshowloading = false;
          if(data.status==1){
            that.prescription = data.data;
          }
          else if(data.status==0){
            that.prescription = [];
          }
          
        },
        error: function(data){
          that.isshowloading = false;
          that.$Message.error('请求失败');
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
  },
   //查询患者卡号
  //就诊人
  mounted(){
    let that=this
    that.isshowloading = true;
    const el = document.querySelector('.MyExamine');
    const offsetHeight = el.offsetHeight;
    setInterval(function(){
      el.onscroll = () => {
         const scrollTop = el.scrollTop;
         const scrollHeight = el.scrollHeight;
         if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
            //每次滚动到底部size+10
            that.size+=5;
            that.examineList();
        }
      }
    },1000)
    that.examineList();
   
    const requesturl=that.$store.getters.getUrl + "SweepCode.do";
    hidemenu(requesturl);
  }
};
</script>

<style scoped>
.qq{
  width: 58%;
    display: inline-block;
    vertical-align: top;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 8px;
}
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
}

.title {
  background: rgb(40, 184, 161);
  font-size: 20px;
  color: white;
  padding: 10px 0;
  text-align: center;
      position: relative;
}
.fee-item {
  /* display: flex; */
  padding: 5px 10px;
  font-size: 14px;
}
.yao {
  text-align: center;
  font-weight: 800;
  font-size: 20px;
  line-height: 2;
}
.fee-item {
  padding: 0 !important;
}
.content {
  
}
.content p {
  line-height: 2;
  display: flex;
}
.content p span:nth-of-type(2) {
  text-align: right;
  display: inline-block;
  
  /* margin-left: 20%; */
}
.content p span:nth-of-type(1) {
  font-weight: 600;
  flex:1;
  text-align: left !important; 
}
.MyExamine {
  height: 100%;
  padding-bottom: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.content {
  padding: 5px 5%;
  border-bottom: 1px solid #ccc;
}
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
.ivu-select {
  /* margin-left: 18%; */
}
.ivu-select-selection {
  color: rgb(40, 184, 161);
}
.ivu-date-picker {
  /* margin-left: 10%; */
}
.ivu-select-dropdown {
  position: absolute !important; /* will-change: top, left; */
  transform-origin: center top !important;
  top: 188px !important;
  right: 100px !important;
}
.titlei{
  position: fixed;
  width: 100%;
}
.contenttt{
  padding-top: 100px;
}
</style>