<template>
  <div class="registeredlistpage">
    <!-- 标题 -->
    <div class="title" >
      <div class="quite"  @click="goPersonalcenter">
        <img class="avatar" src="../../assets/avatar.png" width="45" alt>
      </div>
      挂号患者列表
      <!-- <div size="large" class="switchopen" :class="{'activeswitchopen':!active}" @click="toggleswitch">
        {{active?"出诊":"未出诊"}}
        <div class="circle" :class="{'activecircle':!active}"></div>
      </div> -->
      <div style="display: inline-block;position: absolute;right: 18px;" class="bottom">
              <Poptip title="切换身份" content="content" placement="bottom-end">
              <svg t="1573797783705" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4388" width="20" height="20"><path d="M960 414.72l-81.92-18.432c-6.144-20.48-14.848-39.936-24.576-58.88l44.544-74.24c16.384-26.624 25.088-65.536 0-90.624l-45.056-45.056c-12.288-11.776-28.16-17.92-45.056-17.408-16.896 0-34.304 5.632-47.616 14.336l-72.192 46.08c-18.944-9.728-38.4-17.92-58.368-24.576l-18.432-82.944C605.696 32.768 579.072 0 543.744 0H479.744c-35.328 0-56.832 33.28-64 64l-20.48 81.92c-21.504 6.656-42.496 15.872-62.464 26.112l-73.728-47.104c-13.824-9.216-30.72-14.336-47.616-14.336-16.896-0.512-32.768 5.632-45.056 17.408l-45.056 45.056c-25.088 25.088-16.384 64 0 90.624l46.592 77.824c-8.704 17.92-16.384 35.84-22.528 54.784l-81.92 18.432C32.768 420.352 0 446.976 0 482.304v64c0 35.328 33.28 56.832 64 64l82.944 20.48c5.632 17.408 12.8 34.304 20.992 51.2l-46.592 77.824c-16.384 26.624-25.088 65.536 0 90.624l45.056 45.056c12.288 12.288 28.672 17.408 45.056 17.408 16.896 0 34.304-5.632 47.616-14.336l73.728-47.104c19.968 10.752 40.96 19.456 62.464 26.112l20.48 81.92c7.168 30.72 28.672 64 64 64h64c35.328 0 61.952-32.768 67.584-63.488l18.432-83.456c19.968-6.656 39.424-14.848 57.856-24.064l72.192 46.08c12.8 8.704 30.208 14.336 47.616 14.336 16.896 0.512 33.28-5.632 45.056-17.408l45.056-45.056c25.088-25.088 16.384-64 0-90.624l-44.544-74.24c8.704-17.408 16.896-35.84 23.04-54.784l82.944-20.48c30.72-7.168 64-28.672 64-64V482.304c0.512-35.328-32.768-61.952-62.976-67.584z m-447.488 251.904c-85.504 0-154.624-69.12-154.624-154.112 0-85.504 69.12-154.624 154.624-154.624s154.624 69.12 154.624 154.624c0 84.992-69.12 154.112-154.624 154.112z" p-id="4389" fill="#ffffff"></path></svg>
              <div class="api" slot="content" >
              <div size="large" class="switchopen" :class="{'activeswitchopen':visitstatus==false}" @click="ischangestate()">
                {{visitstatus==true?"患者":"医生"}}
                <div class="circle" :class="{'activecircle':visitstatus==false}"></div>
            </div>
            </div> 
          </Poptip>
        </div>
    </div>

    <!-- 切换按钮 -->
    <div class="btn-warapper">
      <div @click="changetabstatu(false)" :class="{ active: !tabstatu,disactive: tabstatu}">待就诊</div>
      <div @click="changetabstatu(true)" :class="{ active: tabstatu,disactive: !tabstatu }">已就诊</div>
    </div>

    <!-- 已就诊列表 -->
    <div class="list-wrapper" v-if="tabstatu">
      <div class="list-item" v-for="(item,index) in seekedpatientlist" :key="index"  @click="todetail(item,5)">
        <div class="patient-info" >
          <img class="avatar" src="../../assets/toux.png" width="50" alt>
          <span class="item-name">{{item.name}}</span>
          <div class="sky"></div>
          <span>&nbsp;</span>
          <span class="item-name">{{item.starttime}}</span>
        </div>
      </div>
    </div>

    <!-- 未就诊列表 -->
    <div class="list-wrapper" v-if="!tabstatu">
      <div class="list-item" v-for="(item,index) in failurepatientlist" :key="index"  @click="todetail(item,1)">
        <div class="patient-info">
          <img class="avatar" src="../../assets/toux.png" width="50" alt>
          <span class="item-name">{{item.name}}</span>
          <div class="sky"></div>
          <span>&nbsp;</span>
          <span class="item-name">{{item.starttime}}</span>
        </div>
      </div>
    </div>
    <Modal
        v-model="infomodel"
        title="提示">
        <p>{{infomsg}}</p>
    </Modal>
    <Modal v-model="statemodel"  @on-ok="changestate" title="挂号提示信息">
            <p>请确认是否切换！</p>
        </Modal>
    <loading v-show="isShowLoading"></loading>
  </div>

  
</template>

<script>
import {requestpatients,fetchopenid} from "./js/registeredist"
import loading from '../../common/loading'
import {hidemenu} from "../../common/js/hide"
export default {
  components:{
    loading
  },
  data() {
    return {
      failurepatientlist:[],
      seekedpatientlist:[],
      tabstatu:true,
      active:true,
      switchcotroll:false,
      infomodel:false,
      infomsg:"",
      isShowLoading:false,
      yscode:true,
      visitstatus:false,
      statemodel:false
    };
  },
  mounted() {
    let that=this
    this.isShowLoading=true
    setTimeout(function(){
      that.fetchseekedpatientlist();
      that.fetchfailurepatientlist();
      const requesturl=that.$store.getters.getUrl + "SweepCode.do";
      hidemenu(requesturl);
    },10)
  },
  methods: {
    //弹出层
    ischangestate(){
      this.statemodel=true;
    },
    //切换用户身份
    changestate(){
      this.visitstatus=!this.visitstatus
      if(this.visitstatus==true){
        this.$router.push('/Myaccount');
      }
    },
    async todetail(data,type){
      let that=this
      
      let obj={}
      let openid
      
      let url=this.$store.getters.getUrl+"check/getOpenid.do"
      const openidresult=fetchopenid(url,data.patientid,that)
      if(openidresult.status=="1"){
        openid=openidresult.data
      }else if(openidresult.status=="0"){
        openid=0
      }else{
        this.infomodel=true
        this.infomsg="openid查询异常"
        return
      }
      data.openid=openid
      let yspatientinfo = JSON.stringify(data);
      if(yspatientinfo!=undefined&&yspatientinfo!=null&&yspatientinfo!=''){
        localStorage.setItem("yspatientinfo", yspatientinfo);
        this.$router.push("/detail");
      }
    },
    changetabstatu(state){
      if(state==this.tabstatu){
        return
      }
      this.tabstatu=!this.tabstatu
    },
    hasunpatient(arr){
      let bState=true
      for(let i=0;i<arr.length;i++){
        if(arr[i].status=='1'){
          bState=false
        }
      }
      return bState
    },
    //获取已就诊列表
    async fetchseekedpatientlist() {
      let that = this;
      let url =that.$store.getters.getUrl + "doctorPatient/seekedDoctor.do";
      let doccode = localStorage.getItem("ysdoccode");
      // let depcode = localStorage.getItem("ysdepcode");
      let depcode = '%';
      const data=await requestpatients(url,depcode,doccode)
      that.isShowLoading=false
      if(typeof data=='object'){
        if(data.status=="1"){
          for (var i = 0; i < data.data.length; i++) {
            this.seekedpatientlist.push(data.data[i]);
          }
        }
        if(data.status=="-1"){
          this.infomsg="查询待就诊患者信息异常！"
          this.infomodel=true
        }
      }
      if(data==5){
        this.infomsg="请求发送失败！"
        this.infomodel=true
      }
    },
    //获取未就诊列表
    async fetchfailurepatientlist() {
      let that = this;
      let url =that.$store.getters.getUrl + "doctorPatient/failureDoctor.do";
      let doccode = localStorage.getItem("ysdoccode");
      // let depcode = localStorage.getItem("ysdepcode");
      let depcode = '%';
      const data=await requestpatients(url,depcode,doccode)
      that.isShowLoading=false
      if(typeof data=='object'){
        if(data.status=="1"){
          this.tabstatu=false;
          for (var i = 0; i < data.data.length; i++) {
            this.failurepatientlist.push(data.data[i]);
          }
        }
        if(data.status=="-1"){
          this.infomsg="查询待就诊患者信息异常！"
          this.infomodel=true
        }
      }
      if(data==5){
        this.infomsg="请求发送失败！"
        this.infomodel=true
      }
    },
    //个人中心
    goPersonalcenter(){
      this.$router.push('/Personalcenter');
    }
  }
};
</script>

<style scoped>
.registeredlistpage {
  height: 100%;
  overflow: auto;
}
.disactive{
  color: rgb(0, 0, 0);
  background: rgb(160, 165, 170);
}
.active{
  color:white;
  background: rgb(0, 166, 172);
}
.btn-warapper{
  display: flex;
  height: 50px;
}
.btn-warapper div{
  font-size: 16px;
  flex: 1;
  text-align: center;
  line-height: 50px;
}
.quite{
    position: absolute;
    left: 5%;
    top: 3px;
}
/* 标题 */
.title {
  background: rgb(0, 187, 187);
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: white;
  position: relative;
}
/* 患者列表 */
.list-wrapper {
  margin-top: 5px;
}
.list-item {
  padding:0 5px;
}
.patient-info {
  display: flex;
  height: 50px;
  font-size: 14px;
  align-items: center;
  padding: 30px 20px;
  border-radius: 5px;
  border: 1px solid rgb(178, 178, 178)
}
.avatar{
  border-radius: 50%
}
.item-name {
  font-size: 14px;
  font-weight: bold;
  margin: 0px 5px 0 30px;
}
.sky{
  flex: 1;
  width: 50px;
}
/* 开关 */
.switchopen{
  height: 25px;
  width: 70px;
  border-radius: 15px;
  background: #2d8cf0;
  line-height: 25px;
  font-size: 12px;
  text-align: left;
  padding: 0 10px;
  /* position: absolute;
  top: 12px;
  right: 10px; */
  color: white;
  display: inline-block;

}
.circle{
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgb(255,255,255);
  position: absolute;
  top: 3px;
  right: 8.06667vw
}
.api{
  position: relative;
    text-align: center;
}
.activecircle{
  left: 7.06667vw;
}
.activeswitchopen{
  text-align: right;
  background: rgb(33, 106, 179);
} 
.top,.bottom{
        text-align: center;
    }
</style>