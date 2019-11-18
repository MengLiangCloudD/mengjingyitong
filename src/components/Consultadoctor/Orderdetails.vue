<template>
    <div style="height: 100%;overflow: auto;">
         <div class="tittle" style="background: #fff;">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">订单详情</span>
            </div>
        </div>
        <div class="content">
            <div class="content1">
                <p style=" font-weight:900;">订单待接诊</p>
                <p style="font-size: 14px;">订单支付成功，正在等待医生接诊</p>
            </div>
            <div class="content2">
                <p><span style=" font-weight:600;">订单类型</span><span style=" margin-left: 20px;">专家问诊</span></p>
            </div>
            <div class="content3" style="font-size: 14px;">
               <img class="avatar" src="./../../assets/toux.png" alt="" height="50" style="vertical-align: middle;">
               <div class="yishi">
                   <p><span style=" font-weight:600;">刘淑琴</span><span>副主任医师</span></p>
                   <p><span>滦平妇幼保健院</span><span>产科</span></p>
               </div>
               <p class="yishi jian">
                   <svg t="1566631356614" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4711" width="25" height="25" style="vertical-align: middle;"><path d="M748.032 487.936l-424.96-427.008c-12.8-12.8-34.304-12.8-47.104 0s-12.8 34.304 0 47.616l401.92 403.456-401.92 403.456c-12.8 12.8-12.8 34.304 0 47.616 12.8 12.8 34.304 12.8 47.104 0l424.96-427.008c6.656-6.656 9.728-15.36 9.728-24.064 0-8.704-3.072-17.408-9.728-24.064z" p-id="4712" fill="#8a8a8a"></path></svg>
               </p>
            </div>
            <div class="content4">
                <p style=" font-weight:900;">咨询内容</p>
                <p><span>患者信息</span><span>李明明&nbsp;&nbsp;&nbsp;&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;32岁</span></p>
                <p><span>患病时间</span><span>一周内</span></p>
                <p><span>病情描述</span><span>腹痛腹泻&nbsp;&nbsp;&nbsp;&nbsp;胃部有些痉挛</span></p>
            </div>
            <div class="content4">
                <p style=" font-weight:900;">订单详情</p>
                <p><span>订单编号</span><span>4025201907040253666</span></p>
                <p><span>下单时间</span><span>2019-07-08&nbsp;&nbsp;&nbsp;&nbsp;09:55:54</span></p>
                <p><span>应付款  </span><span>¥49.00</span></p>
                <p><span>实际支付</span><span>¥49.00</span></p>
                <p><span>支付时间 </span><span>2019-07-08&nbsp;&nbsp;&nbsp;&nbsp;09:55:54</span></p>
                <p><span>支付方式 </span><span>微信支付</span></p>
            </div>
        </div>
        <div class="footer">
            <div class="x"></div>
            <div class="buton">
                <Button shape="circle" style="border:1px solid  #28b8a1;color: #28b8a1;">取消订单</Button>
                <Button shape="circle" style="background: #28b8a1;color: #fff;">联系医生</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            //返回上一层
            tobackdetail(){
                this.$router.push('/Successfulpayment');
            },
        }
    }
</script>

<style scoped>
.tittle {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
  position: relative;
  font-weight: 600;
  
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.content1{
    text-align: center;
    background: #28b8a1;
    padding: 10px 0;
}
.content1 p{
    line-height: 1.5;
    font-size: 18px;
    color: white;
    
}
.content2{
    padding: 20px 8%;
    font-size: 14px;
}
.yishi{
    display: inline-block;
    vertical-align: middle;
}
.content3{
    padding: 10px 8%;
    position: relative;
}
.jian{
    position: absolute;
    right: 8%;
    top: 20px
}
.yishi p{
    line-height: 1.5;
    padding: 0 10px;
}
.yishi p span{
    display: inline-block;
    padding: 0 10px;
}
.content4{
     padding: 10px 8%;
}
.content4 p{
    line-height: 2;
}
.content4 p span{
    display: inline-block;
    padding-right:10px;
}
.content4 p span:nth-of-type(1){
    color: #ccc
}
.footer{
    padding: 10px 0;
    border-top: 1px solid #eee;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
}
.x{
    display: inline-block;
    flex:1;
}
.buton{
    display: inline-block;
    margin-right: 8%;
}
</style>