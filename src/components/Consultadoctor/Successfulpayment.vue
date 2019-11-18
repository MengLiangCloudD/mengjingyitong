<template>
    <div style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">支付成功</span>
            </div>
        </div>
        <div class="content">
            <div class="content1">
                   <Steps :current="2" direction="vertical" style="font-size: 16px">
                    <Step title="订单支付成功" ></Step>
                    <Step title="等待医生就诊" content="已为您通知医生接诊，请耐心等待"></Step>
                    <Step title="医生接诊" content="如果医生24小时内未回复，将全额退款"></Step>
                </Steps>
            </div>
            <div class="content3">
                 <Button type="primary" style="width: 40%;padding: 10px 0;margin: 10px;font-size: 15px;background:rgb(0,187,187);border:none" @click="goConsultadoctor()">进入咨询</Button>
                 <Button type="primary" ghost style="width: 40%;padding: 10px 0;margin: 10px;font-size: 15px;border:1px solid rgb(0,187,187);color:rgb(0,187,187)" @click="goOrderdetails()">查看订单</Button>
            </div>
             <p style="text-align: left;font-size:22px;padding: 10px 5%;padding-left:5%;font-weight: 900">推荐医生 <span style="text-align: left;font-size:16px;padding: 10px 0;padding-left:15px;font-weight: 100">获取更多诊疗建议</span></p>
            <div class="content2">
                <div class="doctort" v-for="(item,index) in doctorlist" :key="index">
                    <img class="avatar" src="./../../assets/toux.png" alt="" height="14%">
                    <div class="docto">
                       <p><span style="font-weight: 900;font-size:20px;">{{item.doctorname}}</span><span style="font-weight: 500;font-size:18px;padding: 0px 10px;display: inline-block;">{{item.zhi}}</span></p>
                       <p  style="font-size:16px;"><span>滦平县妇幼保健院</span><span style="padding: 0px 10px;display: inline-block;">{{item.debname}}</span></p>
                       <p @click="showdetail(index)" style="font-size:16px;" class="ppoo" :class="{ppo:currentindex==index}"><span>擅长：</span><span >{{item.job}}</span></p>
                       <p><span style="font-size:20px;color:#00BBBB">￥{{item.preouds}}</span><span><Button shape="circle" class="btn" @click="goDescribecondition()">问医生</Button></span></p> 
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
                currentindex:1,
                doctorlist:[{
                    doctorname:'刘淑琴',
                    job:'妇产生孩子旺sssss手术室手术室所旺我的方订单',
                    debname:'产科',
                    preouds:'49.00',
                    zhi:'副主任医师'
                },{
                    doctorname:'刘淑琴',
                    job:'妇产生孩子旺sssss手术室手术室所旺我的方订单',
                    debname:'产科',
                    preouds:'49.00',
                    zhi:'副主任医师'
                },{
                    doctorname:'刘淑琴',
                    job:'妇产生孩子旺sssss手术室手术室所旺我的方订单',
                    debname:'产科',
                    preouds:'49.00',
                    zhi:'副主任医师'
                },{
                    doctorname:'刘淑琴',
                    job:'妇产生孩子旺sssss手术室手术室所旺我的方订单',
                    debname:'产科',
                    preouds:'49.00',
                    zhi:'副主任医师'
                },]
            }
        },
         methods:{
            //返回上一层
            tobackdetail(){
                // this.$router.push('/selectionpatients');
            },
            //前往订单详情
            goOrderdetails(){
                // this.$router.push('/Orderdetails');
            },
            //前往咨询
            goConsultadoctor(){
                var zixundoctor =JSON.parse(localStorage.getItem('zixundoctor'));
                // localStorage.setItem('dddName',zixundoctor.docname);
                localStorage.setItem('dddName','刘淑琴');
                this.$router.push({name:'consultadoctor'});
            },
             //问医生
            goDescribecondition(){
               this.$router.push('/describecondition');
            },
            showdetail(index){
                this.currentindex=index
            }
        }
    }
</script>

<style scoped>
.content1>>>.ivu-steps-status-process .ivu-steps-head-inner{
    border-color: rgb(0, 187, 187);
    background: rgb(0, 187, 187);
}
.content1>>>.ivu-steps-head-inner .ivu-steps-icon{
    color: rgb(0, 187, 187)
}
.content1>>>.ivu-steps-head-inner{
    border-color: rgb(0, 187, 187)
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
.content{
    
}
.content1{
    padding: 20px 30px;
    font-size: 20px;
}
.content3{
    text-align: center;
    
}
.doctort{
    padding: 10px 5% 10px 5%;
    width: 100%;
    border-bottom: 1px solid #eee;
}
.docto{
    display: inline-block;
    vertical-align: top;
    padding: 0px 0px 0px 5%;
    position: relative;
    width: 85%;
}
.ppoo{
    width:100%;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.ppo{
    overflow:unset;
    text-overflow:unset;
    white-space:unset;
    
}
.avatar{
    vertical-align: top;
    margin-top: 8px;
    width: 14%;
}
.docto p{
    line-height: 2;
}
.btn{
    position: absolute;
    bottom: 0;
    right: 5%;
    background: #00BBBB;
    color: #ffffff;
    width: 100px;
}
</style>