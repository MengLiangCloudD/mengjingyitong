<template>
    <div  style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            管理员管理
            <div style=" position: absolute;right: 5%;top:15px" @click="goaddattachment(0,1)">
                <svg t="1574489296024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4002" width="24" height="24"><path d="M906.212134 565.732986 565.732986 565.732986 565.732986 906.212134C565.732986 926.013685 541.666486 959.972 511.97312 959.972 482.297674 959.972 458.213254 926.013685 458.213254 906.212134L458.213254 565.732986 117.734106 565.732986C97.950475 565.732986 63.97424 541.666486 63.97424 511.97312 63.97424 482.279754 97.950475 458.213254 117.734106 458.213254L458.213254 458.213254 458.213254 117.734106C458.213254 97.950475 482.297674 63.97424 511.97312 63.97424 541.666486 63.97424 565.732986 97.950475 565.732986 117.734106L565.732986 458.213254 906.212134 458.213254C925.995765 458.213254 959.972 482.279754 959.972 511.97312 959.972 541.666486 925.995765 565.732986 906.212134 565.732986Z" p-id="4003" fill="#ffffff"></path></svg>
            </div>
          </div>
        </div>
        <div class="content">
            <div class="contenter" v-for="(item,index) in doctorList" :key="index" >
                <div class="doctor" @click="jiankai">
                    <svg t="1574748763472" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4857" width="40" height="40"><path d="M876.0576 769.024c5.12 34.816 34.82624 29.696 39.94624 45.056 0 9.71776-5.12 45.056-19.968 49.664-14.84288 0-34.816-5.12-49.664 0-9.71776 5.12-19.95776 9.72288-25.07776 19.96288-9.728 25.08288 9.71776 45.05088 0 54.77888-14.848 9.728-45.06112 25.088-54.784 14.848-14.84288-14.848-14.84288-34.82112-45.056-34.82112-39.94112 0-39.94112 39.94112-59.904 39.94112s-54.784-14.848-54.784-29.70112c5.12-19.96288 14.848-34.81088-5.12-54.77888-25.088-19.968-54.77888 0-65.01888-9.728-14.84288-9.728-19.96288-34.816-14.84288-49.65888s39.936-14.84288 39.936-54.78912c0-29.69088-34.816-34.81088-39.936-54.77376-5.12-14.848 5.12-39.94624 19.96288-45.06624 25.08288-9.71776 39.93088 9.728 65.01888-9.71776 14.848-14.83776 9.728-49.664 9.728-59.904 5.12-14.84288 25.07776-19.96288 39.936-19.96288 29.696 0 19.96288 34.82112 59.904 39.94112 39.936 0 34.816-14.848 54.77888-39.94112 25.08288 0 45.06112 9.72288 49.65888 19.96288 9.728 19.968-9.71776 49.664 19.968 69.63712 25.07776 14.84288 49.664-5.12 65.024 0 9.72288 5.12 14.84288 19.96288 19.96288 39.94112-9.72288 29.16352-54.78912 24.04352-49.66912 69.10976z m-179.70176-99.84c-119.80288 29.696-74.752 204.28288 39.936 184.832 115.2-25.09824 99.84-209.92-39.936-184.832z m-204.288-174.58688c-119.808 0-214.528-94.72-214.528-214.528s94.72-214.528 214.528-214.528c119.80288 0 214.52288 94.72 214.52288 214.528 0.00512 114.688-94.71488 214.528-214.52288 214.528z m174.592 49.65888s-79.88224 0-74.76224 54.784c5.12 59.904-74.752 14.83776-89.59488 65.024-19.968 59.89376 9.72288 49.65376 25.08288 89.6 9.728 25.08288-39.936 39.936-34.816 84.992 9.728 59.904 59.904 29.70624 74.75712 65.024 9.72288 29.696-25.08288 49.664-104.96 49.664-65.01888 0-189.44 0-234.496-5.12 0 0-129.536-5.12-129.536-89.6 0 0-5.12-124.928 74.752-214.528 0 0 84.992-109.56288 229.38112-109.56288l264.192 9.72288z" fill="#00BBBB" p-id="4858"></path></svg>
                    <div class="xinxi">
                        <p><span>管理员姓名：</span><span>{{item.name}}</span></p>
                        <p><span>管理员职称：</span><span>{{item.job}}</span></p>
                    </div>
                </div>
                <div class="operate">
                        <Button v-if="item.adminLevel>adminLevel" type="primary" size="small" @click="goaddattachment(item,2)">修改</Button>
                        <Button v-if="item.adminLevel<=adminLevel" :disabled="true" type="primary" size="small" @click="goaddattachment(item,2)">修改</Button>
                        <Button type="error" size="small" @click="erromodallist(item)">移除</Button>
                </div>
            </div>
            <Modal
                v-model="erromodal"
                @on-ok="removeAdmin"
                title="提示">
                <p>您确认移除该管理员吗!</p>
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
                isshowloading:false,
                adminLevel:'',
                modal11:false,
                doctorList:[],
                erromodal:false,
                culbItem:{}
            }
        },
        methods:{
            //返回上一层
            tobackdetail(){
                this.$router.push('/admin');
            },
            //添加或修改
            goaddattachment(item,data){
                if(data==2){
                  localStorage.setItem('docinforItem',JSON.stringify(item));
                  this.$router.push(`/addDoctor?start=${data}`);
                }else if(data==1){
                    this.$router.push(`docAll/?start=${data}`);
                }
                
            },
            jiankai(){
                this.modal11=true;
            },
            DeptInfoList(){
                var that =this;
                var url =that.$store.getters.getUrl + 'admin/doctor/getAdminList.do';
                var adminLevel = that.adminLevel;
                that.isshowloading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {},
                    success:function(data){
                        that.isshowloading=false;
                        if(data.code=200){
                            that.doctorList=data.data;
                        }
                    },
                    error:function(data){
                        that.isshowloading=false;
                    }
                })
            },
            erromodallist(item){
                this.erromodal=true;
                this.culbItem=item;
            },
            //移除
            removeAdmin(){
                var that =this;
                var url = that.$store.getters.getUrl +'admin/doctor/editAdminLevelByUserName.do';
                var userName = that.culbItem.userName;
                // var deptCode = that.culbItem.deptCode;
                // var expertJob = that.culbItem.expertJob;
                var adminLevel = 4;
                // var doctorRole  =that.culbItem.doctorRole
                // var deptVisible  =that.culbItem.deptVisible;
                that.isshowloading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: {userName,adminLevel},
                    success:function(data){
                        that.isshowloading=false;
                        if(data.code=='200'){
                            // that._dealdata(data.data);
                            that.$Message.info('删除成功');
                            that.DeptInfoList();

                        }else{
                            that.$Message.error('删除失败');
                        }
                    },
                    error:function(data){
                        that.isshowloading=false;
                        that.$Modal.warning({   
                            title: '提示',
                            content: '请求失败',
                        });
                    }
                })
            }
        },
        created(){
            if(localStorage.getItem('Administrator')!=undefined&&localStorage.getItem('Administrator')!=''){
                this.Administrator=JSON.parse(localStorage.getItem('Administrator'));
                this.adminLevel=this.Administrator.adminLevel;
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