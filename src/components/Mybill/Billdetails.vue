<template>
    <div style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">账单详情</span>
            </div>
        </div> 
        <div class="content">
            <div class="content_top">
               <img src="./../../assets/logo.jpg" alt="" width="60" style="vertical-align: middle;">
               <p>付款—给滦平妇幼保健院</p>
               <p style="font-size: 30px;">12.00</p>
            </div>
            <div class="content_content">
                <p><span>当前状态&nbsp;&nbsp;&nbsp;&nbsp;</span><span>缴费成功</span> </p>
                <p><span>收款方备注</span><span>滦平妇幼保健院(挂号)</span></p>
                <p><span>支付方式&nbsp;&nbsp;&nbsp;&nbsp;</span><span>微信支付</span></p>
                <p><span>转账时间&nbsp;&nbsp;&nbsp;&nbsp;</span><span>2019-10-12 08:24:27</span></p>
                <p><span>订单号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>20190312536254</span></p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
             //返回上一层
            tobackdetail(){
                this.$router.push('/Mybill');
            },
        },
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
  
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.content_top{
    text-align: center;
    padding: 30px;
    border-bottom: 1px solid #EEE;
}
.content_top p{
    font-size: 16px;
    line-height: 2;
}
.content_content{
    padding: 35px;
}
.content_content p{
    font-size: 16px;
    line-height: 2;
}
.content_content p span:nth-of-type(2){
    padding: 20px;
    color: #000;
}
</style>