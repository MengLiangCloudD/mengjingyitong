<template>
    <div style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            患者权限管理
          </div>
        </div>
        <div class="text">
            <div class="content">
                <div class="text-content">妇科病历查看</div>
                <div class="switchopen">
                    <Switchs size="large">
                        <span slot="open">ON</span>
                        <span slot="close">OFF</span>
                    </Switchs>
                </div>
            </div>
            <div class="content">
                <div class="text-content">儿科病历查看</div>
                <div class="switchopen">
                    <Switchs size="large">
                        <span slot="open">ON</span>
                        <span slot="close">OFF</span>
                    </Switchs>
                </div>
            </div>
            <div class="content">
                <div class="text-content">产科病历查看</div>
                <div class="switchopen">
                    <Switchs size="large">
                        <span slot="open">ON</span>
                        <span slot="close">OFF</span>
                    </Switchs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            //返回上一层
            tobackdetail(){
                this.$router.push('/admin');
            },
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
.content{

    height: 50px;
    border:1px solid rgb(156, 153, 153);
    border-radius: 5px;
    margin: 10px;
     position: relative;
}
 .text-content{
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    padding: 0 10px;
   
}
.switchopen{
position: absolute;
  top: 12px;
  right: 10px;
}
 
</style>