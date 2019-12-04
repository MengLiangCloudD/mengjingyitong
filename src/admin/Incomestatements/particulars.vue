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
            <span style="color:rgb(40, 184, 161);font-size:16px;">总收入：￥{{tong.money}}</span><br>
            <span style="color:rgb(40, 184, 161);font-size:16px;">共计：{{tong.count}}笔</span>
            <el-date-picker
                v-model="value1"
                type="month"
                style="width:30%; border:0; position: absolute;right: 5%;top: 15px;"
                placeholder="选择月份"
                :editable="false"
                :clearable="false"
                size="small"
                @change="selecttime()"
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
                <p style="font-size:16px;font-weight: 500;">来自{{item.name}}挂号费用</p>
                <!-- <p>{{item.time}}</p> -->
            </div>
            <div style="position: absolute;right:5%;font-size:16px;color:#F4A460;">
              ￥{{item.money}}
            </div>
          </div>
        </div>
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
    export default {
      components: {
        //加载动画
        loading
      },
        data(){
            return {
                value1:currentDay,
                payList:[],
                selectery:'',
                depcode:'',
                tong:{},
                size:15,
                isshowloading:false
            }
        },
         methods:{
            //返回上一层
            tobackdetail(){
               history.go(-1);
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
              //日期筛选
              selecttime(){
                var that =this;
                if(that.selectery==1){
                  that.selectke()
                }else if(that.selectery==2){
                  that.selectdoc()
                }else if(that.selectery==0){
                  that.selectyuan()
                }
                
              },
            //查询科室
            selectke(){
               var that =this;
                var url = 'http://192.168.33.22:8081/admin/clinic/getDeptClinicInfoByMonth'
                var month =that.datatime(that.value1);
                var deptCode = that.depcode;
                var size = that.size;
                that.isshowloading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {month,deptCode,size},
                    success:function(data){
                      that.isshowloading=false;
                      if(data.code==200){
                        that.payList=data.data.clinicInfoList;
                        that.tong=data.data.clinicTotal;
                        if(that.tong.money==null||that.tong.money==''){
                          that.tong.money=0.00
                        }
                      }
                    },
                    error:function(data){
                      that.isshowloading=false;
                    }
                })
            },
            //查询医生
            selectdoc(){
              var that =this;
                var url = 'http://192.168.33.22:8081/admin/clinic/getDoctorClinicInfoByMonth'
                var month =that.datatime(that.value1);
                var doctor = that.depcode;
                var size = that.size;
                that.isshowloading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {month,doctor,size},
                    success:function(data){
                      that.isshowloading=false;
                      if(data.code==200){
                        that.payList=data.data.clinicInfoList;
                        that.tong=data.data.clinicTotal;
                      }
                    },
                    error:function(data){
                      that.isshowloading=false;
                    }
                })
            },
            //查询医院
            selectyuan(){
              var that =this;
                var url = 'http://192.168.33.22:8081/admin/clinic/getAllClinicInfoByMonth'
                var month =that.datatime(that.value1);
                var doctor = that.depcode;
                var size = that.size;
                that.isshowloading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {month,size},
                    success:function(data){
                      that.isshowloading=false;
                      if(data.code==200){
                        that.payList=data.data.clinicInfoList;
                        that.tong=data.data.clinicTotal;
                      }
                    },
                    error:function(data){
                      that.isshowloading=false;
                    }
                })
            },
         },
         created(){
           let that=this
           const requesturl=that.$store.getters.getUrl + "SweepCode.do";
            hidemenu(requesturl);
         },
         mounted(){
           let that=this;
           that.selectery=that.$route.query.selectery;
           that.depcode=that.$route.query.depcode;
           const el = document.querySelector('.qwer');
            const offsetHeight = el.offsetHeight;
            setInterval(function(){
              el.onscroll = () => {
                const scrollTop = el.scrollTop;
                const scrollHeight = el.scrollHeight;
                if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
                    //每次滚动到底部size+10
                    that.size+=10;
                    if(that.selectery==1){
                      that.selectke()
                    }else if(that.selectery==2){
                      that.selectdoc()
                    }else if(that.selectery==0){
                        that.selectyuan();
                    }
                }
              }
            },1000)
           if(that.selectery==1){
             that.selectke()
           }else if(that.selectery==2){
             that.selectdoc()
           }else if(that.selectery==0){
              that.selectyuan();
           }
         }
    }
</script>

<style scoped>
.qwer{
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
  padding: 2vw 0;
  border-bottom: 1px solid #ccc;
  background: #fff;
}
.xuanze span {
  font-size: 14px;
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