<template>
    <div style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            患者权限管理
          </div>
        </div>
        <div class="text" v-if="adminLevel<2">
            <div class="list-content" v-if="deptorList.length>0">
                <div class="item-box" v-for="(item,index) in deptorList" :key="index">
                    <div class="text-content">{{item.deptName}}病历查看</div>
                    <div size="large" class="switchopen" :class="{'activeswitchopen':item.patientReport=='0'}" @click="ischangestates(item)">
                        {{item.patientReport=='1'?"ON":"OFF"}}
                        <div class="circle" :class="{'activecircle':item.patientReport=='0'}"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text" v-if="adminLevel>1&&adminLevel<4">
            <div class="list-content" >
                <div class="item-box" style="background:#00bbbb;color:#fff;border:0">
                    <div class="text-content">{{biao}}病历查看</div>
                    <div size="large" class="switchopen" :class="{'activeswitchopen' :allswites=='0'}" @click="ischangestates()">
                        {{allswites=='1'?"ON":"OFF"}}
                        <div class="circle" :class="{'activecircle':allswites=='0'}"></div>
                    </div>
                </div>
            </div>
            <!-- <div class="content" > -->
            <div class="list-content" v-if="doctorList.length>0">
                <div class="item-box" v-for="(item,index) in doctorList" :key="index">
                    <div class="text-content">{{item.name}}病历查看</div>
                    <div size="large" class="switchopen" :class="{'activeswitchopen':item.patientReport=='0'}" @click="ischangestate(item)">
                        {{item.patientReport=='1'?"ON":"OFF"}}
                        <div class="circle" :class="{'activecircle':item.patientReport=='0'}"></div>
                    </div>
                </div>
            </div>
            <!-- </div> -->
        </div>
        <div class="text" v-if="adminLevel>3">
           <div class="list-content" >
                <div class="item-box" style="background:#00bbbb;color:#fff;border:0">
                    <div class="text-content">患者病历查看</div>
                    <div size="large" class="switchopen" :class="{'activeswitchopen' :patientReport=='0'}" @click="ischangestate(Administrator)">
                        {{patientReport=='1'?"ON":"OFF"}}
                        <div class="circle" :class="{'activecircle':patientReport=='0'}"></div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="statemodel"  @on-ok="updatedquan" title="提示信息">
            <p>请确认是否修改！</p>
        </Modal>
        <Modal v-model="statemodeles"  @on-ok="updatedkequan" title="提示信息">
            <p>请确认是否修改！</p>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                Administrator:'',
                adminLevel:'',
                biao:'',
                doctorList:[],
                swites:false,
                switees:true,
                allswites:'',
                patientReport:'',
                statemodel:false,
                statemodeles:false,
                currentitem:{},
                deptorList:[]
            }
        },
        methods:{
            ischangestate(item){
                debugger
                this.currentitem=item
                this.statemodel=true
            },
            ischangestates(item){
                if(this.Administrator.adminLevel<=1){
                    this.currentitem=item
                }
                
                this.statemodeles=true
            },
            //返回上一层
            tobackdetail(){
                this.$router.push('/admin');
            },
            //查询医生
            docList(value){
              var that =this;
                var url = 'http://192.168.33.22:8081/admin/doctor/getDoctorInfoList'
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
            // 修改科室权限
            updatedkequan(){
                 var that =this;
                var url = 'http://192.168.33.22:8081/admin/doctor/editPatientReportByDeptCode';
                if(that.Administrator.adminLevel<=1){
                    var deptCode =that.currentitem.deptCode
                }else if(that.Administrator.adminLevel>1&&that.Administrator.adminLevel<4){
                    var deptCode =that.Administrator.deptCode
                }
                if(that.allswites==0){
                    var patientReport =1;
                }else if(that.allswites==1){
                    var patientReport =0;
                }
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {patientReport,deptCode},
                    success:function(data){
                      if(data.code==200){
                          if(that.Administrator.adminLevel>1&&that.Administrator.adminLevel<4){
                            that.selectquan(that.Administrator.deptCode);
                            that.docList({value:that.Administrator.deptCode});
                          }else if(that.Administrator.adminLevel<=1){
                              that.DeptInfoList()
                          }
                       
                      }
                    },
                    error:function(data){
                      
                    }
                })
            },
            //根据科室编码查看患者权限
            selectquan(value){
                var that =this;
                var url = 'http://192.168.33.22:8081/admin/doctor/getPatientReportByDeptCode';
                var deptCode = value;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {deptCode},
                    success:function(data){
                      if(data.code==200){
                            that.allswites=data.data;
                      }
                    },
                    error:function(data){
                      
                    }
                })
            },
            //修改单个医生
            updatedquan(){
                var that =this;
                var url = 'http://192.168.33.22:8081/admin/doctor/editPatientReportByUserName';
                var userName =that.currentitem.userName;
                if(that.currentitem.patientReport==0){
                    var patientReport =1;
                }else if(that.currentitem.patientReport==1){
                    var patientReport =0;
                }

                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {patientReport,userName},
                    success:function(data){
                      if(data.code==200){
                          if(that.Administrator.adminLevel>1&&that.Administrator.adminLevel<4){
                              that.selectquan(that.Administrator.deptCode);
                            that.docList({value:that.Administrator.deptCode});
                          }else if(that.Administrator.adminLevel>3){
                              if(that.patientReport==1){
                                  that.patientReport=0;
                              }else if(that.patientReport==0){
                                  that.patientReport=1;
                              }
                              
                          }
                        
                      }
                    },
                    error:function(data){
                      
                    }
                })
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
                this.deptorList=[]
                this.deptorList.push({ deptName: "妇科门诊", gynaecology:gynaecology,deptCode:'100101'});
                this.deptorList.push({ deptName: "产科门诊", obstetrics:obstetrics,deptCode:'100102'});
                this.deptorList.push({ deptName: "儿科门诊", pediatrics:pediatrics,deptCode:'100103'});
                for (let j = 0; j < other.length; j++) {
                    if (other[j].deptName == "皮肤科") {
                    this.deptorList.push({deptName: "皮肤科",deptCode:other[j].deptCode});
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
                    this.deptorList.push(depitem);
                    }
                }
            },
            // 查询科室
            DeptInfoList(){
                var that =this;
                var url = 'http://192.168.33.22:8081/admin/dept/getDeptInfoList'
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
            }
        },
        mounted(){
            if(localStorage.getItem('Administrator')!=undefined&&localStorage.getItem('Administrator')!=''){
                    this.Administrator=JSON.parse(localStorage.getItem('Administrator'));
                    this.adminLevel=this.Administrator.adminLevel;
                    if(this.Administrator.adminLevel>1&&this.Administrator.adminLevel<4){
                        this.biao =this.Administrator.deptName;
                        // //查询医生
                        this.docList({value:this.Administrator.deptCode});
                        this.selectquan(this.Administrator.deptCode);
                    }
                    if(this.Administrator.adminLevel>3){
                        this.patientReport=this.Administrator.patientReport;
                    }
                    if(this.Administrator.adminLevel<=1){
                        this.DeptInfoList()
                    }
            }
        }
    }
</script>

<style scoped>
.title {
 background: rgb(0, 187, 187);
  font-size: 20px;
  color: white;
  padding: 10px 0;
  text-align: center;
      position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 8px;
}
.content{

    height: 50px;
    border:1px solid rgb(156, 153, 153);
    border-radius: 5px;
    margin: 10px;
     position: relative;
}
 .text-content{
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    padding: 0 10px;
   
}
.switchopen1{
position: absolute;
  top: 12px;
  right: 10px;
}
 .item-box{
    position: relative;
    height: 50px;
    border:1px solid rgb(156, 153, 153);
    border-radius: 5px;
    margin: 10px;
}
.item-box .text-content{
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    padding: 0 10px;
}
.switchopen{
  height: 25px;
  width: 70px;
  border-radius: 15px;
  background: #2d8cf0;
  line-height: 25px;
  font-size: 12px;
  text-align: left;
  padding: 0 10px;
  position: absolute;
  top: 12px;
  right: 10px;
  color: white;
}
.circle{
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgb(255,255,255);
  position: absolute;
  top: 3px;
  right:4px;
}
.activecircle{
  left: 4px;
}
.activeswitchopen{
  text-align: right;
  background: rgb(160,165,170);
} 
</style>