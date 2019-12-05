<template>
    <div  style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            科室管理
            <!-- <div style=" position: absolute;right: 5%;top:15px" @click="goaddattachment('item',1)">
                <svg t="1574489296024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4002" width="24" height="24"><path d="M906.212134 565.732986 565.732986 565.732986 565.732986 906.212134C565.732986 926.013685 541.666486 959.972 511.97312 959.972 482.297674 959.972 458.213254 926.013685 458.213254 906.212134L458.213254 565.732986 117.734106 565.732986C97.950475 565.732986 63.97424 541.666486 63.97424 511.97312 63.97424 482.279754 97.950475 458.213254 117.734106 458.213254L458.213254 458.213254 458.213254 117.734106C458.213254 97.950475 482.297674 63.97424 511.97312 63.97424 541.666486 63.97424 565.732986 97.950475 565.732986 117.734106L565.732986 458.213254 906.212134 458.213254C925.995765 458.213254 959.972 482.279754 959.972 511.97312 959.972 541.666486 925.995765 565.732986 906.212134 565.732986Z" p-id="4003" fill="#ffffff"></path></svg>
            </div> -->
          </div>
        </div>
        <div class="content">
            <div class="contenter" v-for="(item,index) in doctorList" :key="index" >
                <div class="doctor" >
                    <svg class="avatar" t="1574490551202"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4359" width="40" height="40"><path class="icon" d="M844.8 665.6c-15.36 0-25.6 10.24-25.6 25.6v204.8h-614.4v-204.8c0-15.36-10.24-25.6-25.6-25.6s-25.6 10.24-25.6 25.6v204.8c0 28.16 23.04 51.2 51.2 51.2h614.4c28.16 0 51.2-23.04 51.2-51.2v-204.8c0-15.36-10.24-25.6-25.6-25.6zM742.4 358.4h-460.8c-12.8 0-25.6 12.8-25.6 25.6s12.8 25.6 25.6 25.6h460.8c12.8 0 25.6-12.8 25.6-25.6s-12.8-25.6-25.6-25.6z" p-id="4360" fill="#00BBBB"></path><path d="M512 665.6c-12.8 0-25.6 12.8-25.6 25.6v51.2h-51.2c-12.8 0-25.6 12.8-25.6 25.6s12.8 25.6 25.6 25.6h51.2v51.2c0 12.8 12.8 25.6 25.6 25.6s25.6-12.8 25.6-25.6v-51.2h51.2c12.8 0 25.6-12.8 25.6-25.6s-12.8-25.6-25.6-25.6h-51.2v-51.2c0-12.8-12.8-25.6-25.6-25.6zM944.64 460.8l-94.72-366.08c-2.56-10.24-12.8-17.92-25.6-17.92h-627.2c-12.8 0-23.04 7.68-25.6 17.92L76.8 460.8c-2.56 7.68-2.56 17.92-2.56 25.6 0 84.48 69.12 153.6 153.6 153.6 64 0 117.76-38.4 140.8-92.16 23.04 53.76 76.8 92.16 140.8 92.16s117.76-38.4 140.8-92.16c23.04 53.76 76.8 92.16 140.8 92.16 84.48 0 153.6-69.12 153.6-153.6 2.56-7.68 2.56-17.92 0-25.6z m-151.04 128c-40.96 0-76.8-23.04-94.72-61.44-7.68-17.92-25.6-30.72-46.08-30.72s-38.4 12.8-46.08 30.72c-15.36 38.4-53.76 61.44-94.72 61.44s-76.8-23.04-94.72-61.44c-7.68-17.92-25.6-30.72-46.08-30.72s-38.4 12.8-46.08 30.72c-15.36 38.4-53.76 61.44-94.72 61.44-56.32 0-102.4-46.08-102.4-102.4v-15.36l89.6-343.04h586.24l89.6 343.04v15.36c2.56 56.32-43.52 102.4-99.84 102.4z" p-id="4361" fill="#00BBBB"></path></svg>
                    <div class="xinxi">
                        <p><span>科室名称：</span><span>{{item.deptName}}</span></p>
                        <p><span>科室编码：</span><span>{{item.deptCode}}</span></p>
                    </div>
                    
                </div>
                <div class="operate">
                    <Button type="primary" size="small" @click="jiankai(index)">查看</Button>
                </div>
            </div>
            <Modal v-model="modal11" fullscreen title="科室介绍">
                <p style="text-indent:24pt;font-size:16px" v-for="(item,index) in content.trim().split(/\s+/)" :key="index">
                    {{item}}
                </p>
            </Modal>
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
        data() {
            return {
                content:'',
                modal11:false,
                doctorList:[],
                isshowloading:false
            }
        },
        methods:{
            //返回上一层
            tobackdetail(){
                this.$router.push('/admin');
            },
            // //添加科室或修改科室
            // goaddattachment(item,data){
            //     if(data==0){
            //       localStorage.setItem('depinforItem',JSON.stringify(item));
            //     }
            //     this.$router.push(`/addattachment?start=${data}`);
            // },
            jiankai(index){
                // this.modal11=true;
                // if(this.doctorList[index].content!=undefined){
                //     this.content=this.doctorList[index].content;
                // }else{
                //     this.content ='无'
                // }
                var that =this;
                var deptCode = that.doctorList[index].deptCode;
                var url = that.$store.getters.getUrl +'admin/dept/getDeptContentByDeptCode'
                that.isshowloading=true;
                 $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data:{deptCode},
                    success:function(data){
                        that.isshowloading=false;
                        if(data.code=='200'){
                            that.modal11=true;
                            that.content = data.data
                            // that._dealdata(data.data);
                        }else if(data.code=='500'){
                            that.modal11=true;
                            that.content = '无'
                        }
                    },
                    error:function(data){
                        that.isshowloading=false;
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
                this.doctorList=[]
                this.doctorList.push({ deptName: "妇科门诊", gynaecology:gynaecology,deptCode:'100101'});
                this.doctorList.push({ deptName: "产科门诊", obstetrics:obstetrics,deptCode:'100102'});
                this.doctorList.push({ deptName: "儿科门诊", pediatrics:pediatrics,deptCode:'100103'});
                for (let j = 0; j < other.length; j++) {
                    if (other[j].deptName == "皮肤科") {
                    this.doctorList.push({deptName: "皮肤科",deptCode:other[j].deptCode});
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
                    this.doctorList.push(depitem);
                    }
                }
            },
            // 查询科室
            DeptInfoList(){
                var that =this;
                var url = that.$store.getters.getUrl +'admin/dept/getDeptInfoList'
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
            }
        },
        created(){
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
.contenter{
    position: relative;
}
.doctor{
  display: flex;
  height: 50px;
  /* font-size: 14px; */
  align-items: center;
  padding: 30px 20px;
  /* border-radius: 5px; */
  border-bottom: 1px solid rgb(178, 178, 178);
 
}
.avatar{
  border-radius: 50%
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
  line-height: 1.5;
}
.operate{
    position: absolute;
    right: 5%;
    top: 30%;
}
</style>