<template>
    <div class="register">
        <h1>滦平县妇幼保健院微信咨询攻略</h1>
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
                    outtitle:"1.",
                    title:"选择科室或医生",
                    info:"进入咨询首页选择科室或推荐的医生",
                    img:"../../../static/help/askdoctor/askdoctor-1.jpg"
                },
                {
                    outtitle:"2.",
                    title:"点击支付",
                    img:"../../../static/help/askdoctor/askdoctor-2.jpg"
                },
                {
                    outtitle:"3.",
                    title:"填写病情",
                    info:"患者填写病情描述信息。",
                    img:"../../../static/help/askdoctor/askdoctor-3.jpg",
                    tip:"温馨提示",
                    tipcontent:[
                        "1.患者请填写详细的信息，以便于医师快速了解患者病情，尽快给出患者治疗方案。"
                        ]
                },
                {
                    outtitle:"4.",
                    title:"选择患者的就诊卡",
                    img:"../../../static/help/askdoctor/askdoctor-4.jpg",
                    tip:"温馨提示",
                    tipcontent:[
                        "1.请确认选择的患者就诊卡。"
                        ]
                },
                {
                    outtitle:"5.",
                    title:"向医生进行咨询",
                    info:"可以通过上传图片,语音，文字来向医师进行咨询",
                    img:"../../../static/help/askdoctor/askdoctor-5.jpg",
                    tip:"温馨提示"
                },
                {
                    outtitle:"6.",
                    title:"咨询列表",
                    info:"选择对应的医师来继续咨询",
                    img:"../../../static/help/askdoctor/askdoctor-6.jpg",
                },
                {
                    outtitle:"7.",
                    title:"咨询页面",
                    img:"../../../static/help/askdoctor/askdoctor-7.jpg"
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