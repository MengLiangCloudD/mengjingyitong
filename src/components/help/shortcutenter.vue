<template>
    <div class="register">
        <h1>滦平县妇幼保健院公众号快捷方式攻略</h1>
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
                    title:"第一步",
                    img:"../../../static/help/shortcutenter/shortcutenter-1.jpg"
                },
                {
                    outtitle:"2.",
                    title:"第二步",
                    img:"../../../static/help/shortcutenter/shortcutenter-2.jpg"
                },
                {
                    outtitle:"3.",
                    title:"第三步",
                    img:"../../../static/help/shortcutenter/shortcutenter-3.jpg"
                },
                {
                    outtitle:"4.",
                    title:"第四步",
                    img:"../../../static/help/shortcutenter/shortcutenter-4.jpg"
                },
                {
                    outtitle:"5.",
                    title:"第五步",
                    img:"../../../static/help/shortcutenter/shortcutenter-5.jpg",
                },
                {
                    outtitle:"6.",
                    title:"第六步",
                    img:"../../../static/help/shortcutenter/shortcutenter-6.jpg",
                },
                {
                    outtitle:"7.",
                    title:"第七步",
                    img:"../../../static/help/shortcutenter/shortcutenter-7.jpg"
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