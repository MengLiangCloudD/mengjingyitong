<template>
    <div  style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            医生管理
            <div style=" position: absolute;right: 5%;top:15px" @click="goaddDoctor">
                <svg t="1574489296024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4002" width="24" height="24"><path d="M906.212134 565.732986 565.732986 565.732986 565.732986 906.212134C565.732986 926.013685 541.666486 959.972 511.97312 959.972 482.297674 959.972 458.213254 926.013685 458.213254 906.212134L458.213254 565.732986 117.734106 565.732986C97.950475 565.732986 63.97424 541.666486 63.97424 511.97312 63.97424 482.279754 97.950475 458.213254 117.734106 458.213254L458.213254 458.213254 458.213254 117.734106C458.213254 97.950475 482.297674 63.97424 511.97312 63.97424 541.666486 63.97424 565.732986 97.950475 565.732986 117.734106L565.732986 458.213254 906.212134 458.213254C925.995765 458.213254 959.972 482.279754 959.972 511.97312 959.972 541.666486 925.995765 565.732986 906.212134 565.732986Z" p-id="4003" fill="#ffffff"></path></svg>
            </div>
          </div>
        </div>
        <div class="content">
            <div class="contenter" v-for="(item,index) in doctorList" :key="index" >
                <div class="doctor">
                    <img class="avatar" src="./../../assets/avatar.png" alt="" width="40px;"  >
                    <div class="xinxi">
                        <p><span>医生姓名：</span><span>{{item.doctorName}}</span></p>
                        <p><span>医生职称：</span><span>{{item.job}}</span></p>
                    </div>
                    <div class="operate">
                        <Button type="primary" size="small" @click="goaddDoctor">修改</Button>
                        <Button type="error" size="small">删除</Button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                doctorList:[
                    {
                        doctorName:'刘淑琴',
                        doctorCode:'000LSQ',
                        depName:'产科门诊',
                        depCode:'100213',
                        job:'产科专家'
                    },{
                        doctorName:'刘淑琴',
                        doctorCode:'000LSQ',
                        depName:'产科门诊',
                        depCode:'100213',
                        job:'产科专家'
                    },{
                        doctorName:'刘淑琴',
                        doctorCode:'000LSQ',
                        depName:'产科门诊',
                        depCode:'100213',
                        job:'产科专家'
                    },{
                        doctorName:'刘淑琴',
                        doctorCode:'000LSQ',
                        depName:'产科门诊',
                        depCode:'100213',
                        job:'产科专家'
                    },
                ]
            }
        },
        methods:{
            //返回上一层
            tobackdetail(){
                this.$router.push('/admin');
            },
            goaddDoctor(){
                this.$router.push('/addDoctor');
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
.doctor{
  display: flex;
  height: 50px;
  /* font-size: 14px; */
  align-items: center;
  padding: 30px 20px;
  /* border-radius: 5px; */
  border-bottom: 1px solid rgb(178, 178, 178);
  position: relative;
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
}
</style>