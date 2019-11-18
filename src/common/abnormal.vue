<template>
    <div style="  height: 100%; overflow: auto;">
       <p>请求异常,请退出重新访问<span id="timre">{{time}}</span> 秒后自动<span class="p" @click="tiao"> 跳转</span> </p> 
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time:6,
                tame:''
            }
        },
        methods: {
            daoji(){
                var that =this;
              
                   that.tame =setInterval(() => {
                          if(that.time>0){
                        that.time--
                        $('#timre').html(that.time);
                    
                }else if(that.time<=0){
                    clearInterval(that.tame);
                    history.go(-2)
                }
                }, 1000);
            },
            tiao(){
                 history.go(-2);
                 clearInterval(this.tame)
            }
        },
        mounted() {
            this.daoji();
        },
    }
</script>

<style scoped>
p{
    text-align: center;
    font-size: 16px;
    padding: 50px 0;
}
.p{
    color: blue;
}
</style>