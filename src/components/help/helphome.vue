<template>
    <div class="helphome">
        <header>
            <div class="item" v-for="(item,index) in list" :key="index" @click="handleclick(item)">
                <div class="icon-box">
                    <Icon :type="item.icon" size="30" color="rgb(0,187,187)"/>
                </div>
                <p class="title">{{item.title}}</p>
            </div>
        </header>
        <p class="qs-title">常见问题</p>
        <div class="qs">
            <div class="item" v-for="(item,index) in qslist" :key="index">
                <div class="icon-box">
                    <Icon :type="item.icon" size="40" color="rgb(0,187,187)"/>
                </div>
                <p class="title">{{item.title}}</p>
            </div>
        </div>
        <!-- <div class="items" v-for="(item,index) in list" :key="index" @click="handleclick(item)">
             <p class="title">{{item.title}}</p>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[
                {
                    title:"创建快捷方式",
                    route:"/shortcutenter",
                    bag:"rgb(42,184,162)",
                    color:"#fff",
                    icon:"ios-card"
                },
                {
                    title:"挂号攻略",
                    route:"/register",
                    bag:"rgb(42,184,162)",
                    color:"#fff",
                    icon:"ios-leaf"
                },
                {
                    title:"咨询攻略",
                    route:"/askdoctor",
                    bag:"rgb(42,184,162)",
                    color:"#fff",
                    icon:"ios-medkit"
                }
            ],
            qslist:[
                {
                    title:"绑卡建卡",
                    route:"/shortcutenter",
                    icon:"ios-clock"
                },
                {
                    title:"挂号问题",
                    route:"/shortcutenter",
                    icon:"ios-book"
                },
                {
                    title:"儿童挂号",
                    route:"/shortcutenter",
                    icon:"md-cafe"
                },
                {
                    title:"实名认证",
                    route:"/shortcutenter",
                    icon:"md-calendar"
                },
                {
                    title:"取号问题",
                    route:"/shortcutenter",
                    icon:"md-chatbubbles"
                },
                {
                    title:"退号退费",
                    route:"/shortcutenter",
                    icon:"md-clipboard"
                },
                {
                    title:"医保报销",
                    route:"/shortcutenter",
                    icon:"ios-card" 
                },
                {
                    title:"办卡挂失",
                    route:"/shortcutenter",
                    icon:"md-color-filter"
                },
                {
                    title:"充值提现",
                    route:"/shortcutenter",
                    icon:"ios-flask"
                }
            ]
        }
    },
    methods:{
        handleclick(item){
            this.$router.push(item.route)
        },
        touchstart(item){
            item.bag="#32cdb4"
        },
        touchend(item){
            item.bag="rgb(42,184,162)"
            this.$router.push(item.route)
        }
    }
}
</script>

<style scoped>
.helphome{
    /* margin-top: 50px; */
}
/* .items{
    width: 300px;
    height: 50px;
    line-height: 50px;
    background: rgb(0,187,187);
    border-radius: 10px;
    text-align: center;
    margin: auto;
    margin-bottom: 20px;
    color: #fff;
} */
header .icon-box{
    background: #fff;
    padding: 10px;
    display: inline-block;
    border-radius: 10px;
    background-image: linear-gradient(#fff, rgba(0,187,187,0.4));
}
.helphome{
    
}
header{
    display: flex;
    background: rgb(0,187,187);
    padding: 20px 0;
}
header .item{
    flex: 1;
    text-align: center;
}
header .item p{
    margin: 10px 0;
    font-size: 14px;
    color: #fff
}
.qs{
    display: grid;
    grid-template-columns: 33vw 33vw 33vw;
    grid-template-rows: 33vw 33vw 33vw;
}
.qs-title{
    padding-left: 10px;
    margin: 10px 0;
    margin-left: 10px;
    font-size: 14px;
    border-left:2px solid rgb(244,141,0)
}
.qs .item{
    /* justify-self:center; */
    border-bottom:2px solid rgb(247,247,247);
}
.qs .icon-box{
    background: #fff;
    padding: 10px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
}
.qs .item p{
    text-align: center;
    font-size: 14px;
}
.boder-line{
    
}
.qs-title{
    
}
</style>