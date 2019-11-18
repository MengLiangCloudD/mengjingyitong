<template>
    <div class="register">
        <h1>滦平县妇幼保健院微信挂号攻略</h1>
        <helpItem class="helpitems" v-for="(item,index) in aticle" :key="index" :msg="item"></helpItem>
    </div>
</template>

<script>
import helpItem from "./item"
export default {
    data(){
        return{
            aticle:[
               {
                    outtitle:"1.点击",
                    title:"挂号",
                    info:"进入微信公众号会话页面，点击底部菜单“服务”按钮,选择“患者挂号”",
                    img:"../../../static/help/register/register-1.jpg"
                },
                {
                    outtitle:"2.",
                    title:"选择对应科室的医生",
                    info:"选择您要就诊的科室和医生",
                    img:"../../../static/help/register/register-2.jpg"
                },
                {
                    outtitle:"3.",
                    title:"预约医生",
                    img:"../../../static/help/register/register-3.jpg",
                    tip:"温馨提示",
                    tipcontent:[
                        "1.在时间选择上,一定要提前安排好自己的日程安排，尽量避免因为时间冲突而遗憾退号。"
                        ]
                },
                {
                    outtitle:"4.",
                    title:"选择就诊人，点击确认挂号",
                    img:"../../../static/help/register/register-4.jpg"
                },
                {
                    outtitle:"5.",
                    title:"点击支付",
                    img:"../../../static/help/register/register-5.jpg",
                    tip:"温馨提示",
                    tipcontent:[
                        "1.锁定的号源需在5分钟内完成支付，否则该号源将会被系统自动取消，很有可能在你重新操作期间就被人挂走了。",
                        "2.目前,微信挂号仅支持微信支付的方式。"
                        ]
                },
                {
                    outtitle:"6.",
                    title:"查询挂号信息",
                    info:"点点击“我的”按钮进入个人中心界面，选择我的挂号查询我的挂号信息。",
                    img:"../../../static/help/register/register-6.jpg",
                },
                {
                    outtitle:"7.",
                    title:"挂号成功",
                    info:"挂号成功，核对挂号订单信息",
                    img:"../../../static/help/register/register-7.jpg"
                }
            ]
        }
    },
    components:{
        helpItem
    },
    methods:{
        scrollto(index){
            var container =document.getElementsByClassName("shortcutenter")[0];
            container.scrollTop=+window.innerHeight*index
        }
    },
    created(){
    }
}
</script>

<style scoped>
.register{
    overflow: auto;
    height: 100%;
}
.register h1{
    text-align: center;
    margin: 3vh;
    font-size: 18px;
}
.helpitems{
    margin-bottom: 3vh;
}
</style>