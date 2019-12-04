<template>
    <div style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            {{biao}}
          </div>
        </div>
        <div class="content">
            <div class="input">
                <Form ref="formInline" :model="formInline"  :label-width="80">
                    <FormItem label="姓名：">
                        <Input v-model="formInline.user" placeholder="" style="width:200px" :disabled='true'/>
                    </FormItem>
                    <FormItem label="电话：">
                        <Input v-model="formInline.tel" placeholder="" style="width:200px" :disabled='true'/>
                    </FormItem>
                    <!-- <FormItem label="邮箱：">
                        <Input v-model="formInline.email" placeholder="" style="width:200px"/>
                    </FormItem> -->
                    <FormItem label="身份证：">
                        <Input v-model="formInline.id" placeholder="" style="width:200px" :disabled='true'/>
                    </FormItem>
                    <FormItem label="科室：">
                        <Select v-model="formInline.dep" style="width:200px" :disabled='true'>
                            <Option v-for="item in depList" :value="item.value" :key="item.value">{{item.label }}</Option>
                        </Select>
                    </FormItem>
                    <!-- <FormItem label="性别：">
                        <Select v-model="formInline.sex" style="width:200px">
                            <Option value="nan">男</Option>
                            <Option value="nv">女</Option>
                        </Select>
                    </!--> 
                    <FormItem label="权限：">
                        <Select v-model="formInline.jurisdiction" filterable multiple allow-create @on-create="handleCreate2" style="width:200px" @on-change="changejurisdiction">
                            <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="身份：">
                        <Select v-model="formInline.identity" style="width:200px" :disabled="disabled">
                            <Option v-for="item in cityList5" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="医生描述：">
                        <Input v-model="formInline.msg" type="textarea"  placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" long style="width:200px" @click="Submiter">提交</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        <loading v-show="isshowloading" class="loading"></loading>
    </div>
</template>

<script>
import loading from "../../common/loading";
    export default {
        components: {
        //加载动画
        loading
      },
         data () {
            return {
                docinforItem:[],
                disabled:false,
                biao:'修改科室',
                formInline: {
                    user:'',
                    tel:"",
                    id:"",
                    msg:"",
                    dep:'',
                    identity:'',
                    jurisdiction:[]
                },
                cityList4: [
                    {
                        value: '0',
                        label: '复诊'
                    },
                    {
                        value: '1',
                        label: '咨询'
                    },
                    {
                        value: '2',
                        label: '出诊'
                    },
                ],
                cityList5: [
                    {
                        value: '0',
                        label: '超级管理员'
                    },
                    {
                        value: '1',
                        label: '副院长'
                    },
                    {
                        value: '2',
                        label: '科主任'
                    },
                    {
                        value: '3',
                        label: '副主任'
                    },
                    {
                        value: '4',
                        label: '普通医生'
                    },
                    {
                        value: '5',
                        label: '无权限'
                    },
                ],
                depList:[],
                isshowloading:false
            }
        },
        methods: {
            //科室分类
            _dealdata(data){
                var that = this;
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
                 var deptorList = []
                deptorList.push({ deptName: "妇科门诊", gynaecology:gynaecology,deptCode:'100101'});
                deptorList.push({ deptName: "产科门诊", obstetrics:obstetrics,deptCode:'100102'});
                deptorList.push({ deptName: "儿科门诊", pediatrics:pediatrics,deptCode:'100103'});
                for (let j = 0; j < other.length; j++) {
                    if (other[j].deptName == "皮肤科") {
                      deptorList.push({deptName: "皮肤科",deptCode:other[j].deptCode});
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
                      deptorList.push(depitem);
                    }
                }
                for(var i =0;i<deptorList.length;i++){
                  let depname = "";
                  let depCode = ''
                  depname = deptorList[i].deptName;
                  depCode=deptorList[i].deptCode;
                  let depitem = {
                      //合并科室的名称
                      label: depname,
                      value:depCode
                    };
                    that.depList.push(depitem)
                }
            },
            //查询科室
            DeptInfoList(){
                var that =this;
                var url = 'http://192.168.33.22:8081/admin/dept/getDeptInfoList'
                that.isshowloading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: '',
                    success:function(data){
                        that.isshowloading=false;
                        if(data.code=='200'){
                            that._dealdata(data.data);
                        }
                        
                    },
                    error:function(data){
                        that.isshowloading=false;
                    }
                })
            },
            handleCreate2 (val) {
                this.cityList4.push({
                    value: val,
                    label: val
                });
            },
            //返回上一层
            tobackdetail(){
                if(this.$route.query.start==0){
                    this.$router.push('/doctormanagement');
                }else if(this.$route.query.start==1){
                    this.$router.push('/admin');
                }
            },
            //选择权限
            changejurisdiction(val){

            },
            //修改医生
            Submiter(){
                var that = this;
                var userName = that.docinforItem.userName;
                var deptCode = that.docinforItem.deptCode;
                var expertJob = that.formInline.msg;
                var adminLevel = that.formInline.identity;
                var doctorRole  =JSON.stringify(that.formInline.jurisdiction);
                var url = 'http://192.168.33.22:8081/admin/doctor/editDoctorInfoByUserName';
                that.isshowloading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {userName,deptCode,expertJob,adminLevel,doctorRole},
                    success:function(data){
                        that.isshowloading=false;
                        if(data.code=='200'){
                            that._dealdata(data.data);
                        }
                    },
                    error:function(data){
                        that.isshowloading=false;
                    }
                })
            }
        },
        created(){
            if(localStorage.getItem('Administrator')!=undefined&&localStorage.getItem('Administrator')!=''){
            this.Administrator=JSON.parse(localStorage.getItem('Administrator'));
                if(this.Administrator.adminLevel>1){
                this.disabled=true;
                    
                }
          }
            if(this.$route.query.start==0){
                this.biao="修改医生"
                this.docinforItem=JSON.parse(localStorage.getItem('docinforItem'));
                var docinforItem =this.docinforItem;
                if(docinforItem.name!=undefined){
                    this.formInline.user=docinforItem.name;
                }else{
                    this.formInline.user='';
                }
                if(docinforItem.phoneNo!=undefined){
                   this.formInline.tel=docinforItem.phoneNo;
                }else{
                    this.formInline.tel='';
                }
                if(docinforItem.cardNo!=undefined){
                   this.formInline.id=docinforItem.cardNo;
                }else{
                    this.formInline.id='';
                }
                if(docinforItem.expertJob!=undefined){
                   this.formInline.msg=docinforItem.expertJob;
                }else{
                    this.formInline.msg='';
                }
                if(docinforItem.deptCode!=undefined){
                   this.formInline.dep=docinforItem.deptCode; 
                }else{
                    this.formInline.dep='';
                }
                if(docinforItem.doctorRole!=undefined){
                   this.formInline.jurisdiction=JSON.parse( docinforItem.doctorRole); 
                }else{
                    this.formInline.jurisdiction='';
                }
                if(docinforItem.adminLevel!=undefined){
                   this.formInline.identity=docinforItem.adminLevel; 
                }else{
                    this.formInline.identity='';
                }
            }else if(this.$route.query.start==1){
                this.biao="添加医生"
            }
            this.DeptInfoList()
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
.input{
    width: 80%;
    margin: 20px auto;
}
</style>