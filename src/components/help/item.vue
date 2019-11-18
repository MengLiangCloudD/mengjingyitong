<template>
   <div class="help-item">
       <header>
            <h2>
                <span v-if="msg.outtitle">{{msg.outtitle}}</span>
                <span>
                    <!-- <i class="top-i"></i>
                    <i class="left-i"></i> -->
                    {{msg.title}}
                    <!-- <i class="bottom-i"></i>
                    <i class="right-i"></i> -->
                </span>
            </h2>
       </header>
        
        <section class="info" v-if="msg.info">
            <p>{{msg.info}}</p>
        </section>
        <img :src="msg.img" alt="">
        <section class="tip" v-if="msg.tip">
            <h2>{{msg.tip}}</h2>
            <div class="tipcontent">
                <p v-for="(item,index) in msg.tipcontent" :key="index">{{item}}</p>
            </div>
        </section>
   </div>
</template>

<script>
export default {
    props:{
         msg: {
            type: Object,
            // 对象或数组默认值必须从一个工厂函数获取
            default: function () {
                return {
                    outtitle:"1.点击",
                    title:"挂号",
                    info:"进入微信公众号会话页面，点击底部菜单“就诊服务”按钮,选择“挂号”",
                    img:"../../../static/help/register/register-1.jpg",
                    tip:"温馨提示",
                    tipcontent:[
                        "1.在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上",
                        "2.同时在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上在时间选择上"
                        ]
                }
            }
        }
    }
}
</script>

<style>
.help-item{
    padding:0 10vw;
    margin: 2vh 0;
}
.help-item header {
    color: rgb(0,187,187);
}
.help-item header h2{
    font-size:5vw;
    line-height: 6vw;
}

.top-i{
    position: absolute;
    display: inline-block;
    top: 0;
    left: -2vw;
    width: 2vw;
    height: 1vw;
    background:rgb(0,187,187);
}
.left-i{
    position: absolute;
    display: inline-block;
    top: 0;
    left: -2vw;
    width:1vw ;
    height: 3vw;
    background: rgb(0,187,187);
}
.help-item header span{
    position: relative;
    height: 6vw;
    line-height: 6vw;
    display: inline-block;
}
.bottom-i{
    position: absolute;
    display: inline-block;
    bottom: 0;
    right: -2vw;
    width: 2vw;
    height: 1vw;
    background: rgb(0,187,187);
}
.right-i{
    position: absolute;
    display: inline-block;
    bottom: 0;
    right: -2vw;
    width:1vw ;
    height: 3vw;
    background: rgb(0,187,187);
}
/*  */
.help-item .info{
    font-size: 4vw;
    color: black;
    margin: 2vh 0;
}
.help-item img{
    width: 70vw;
    display:block;
    margin: 2vh auto;
    border:0.2vw solid rgb(233,233,233)
}
.help-item .tip{

}
.help-item .tip h2{
    padding-left: 2vw;
    border-left: 1vw solid rgb(0,187,187);
}
.help-item .tip div{
    padding-left: 2.9vw;
    border-left: 0.1vw solid rgb(0,187,187);
}
.help-item .tip div p{
    padding:2vh 0;
}
</style>