<template>
    <div  style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <span style="font-size:20px;">快速问诊</span>
        </div>
        <div class="nav">
            <p class="nav_p" style="display:flex">
                 <span style="flex:1">
                    <svg style="vertical-align: middle;" t="1578463630167" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5169" width="20" height="20"><path d="M662 565.2H552.9v-109c0-22.5-18.4-40.9-40.9-40.9s-40.9 18.4-40.9 40.9v109.1H362c-22.5 0-40.9 18.4-40.9 40.9s18.4 40.9 40.9 40.9h109.1v109.1c0 22.5 18.4 40.9 40.9 40.9s40.9-18.4 40.9-40.9V647.1H662c22.5 0 40.9-18.4 40.9-40.9s-18.4-41-40.9-41z" fill="#FFFF27" p-id="5170"></path><path d="M512 810.7c-30.1 0-54.5-24.5-54.5-54.5v-95.5H362c-30.1 0-54.5-24.5-54.5-54.5s24.5-54.5 54.5-54.5h95.5v-95.5c0-30.1 24.5-54.5 54.5-54.5 30.1 0 54.5 24.5 54.5 54.5v95.5H662c30.1 0 54.5 24.5 54.5 54.5S692 660.7 662 660.7h-95.5v95.5c0 30-24.4 54.5-54.5 54.5zM362 578.9c-15 0-27.3 12.2-27.3 27.3s12.2 27.3 27.3 27.3h109.1c7.5 0 13.6 6.1 13.6 13.6v109.1c0 15 12.2 27.3 27.3 27.3 15 0 27.3-12.2 27.3-27.3V647.1c0-7.5 6.1-13.6 13.6-13.6H662c15 0 27.3-12.2 27.3-27.3S677 578.9 662 578.9H552.9c-7.5 0-13.6-6.1-13.6-13.6V456.2c0-15-12.2-27.3-27.3-27.3-15 0-27.3 12.2-27.3 27.3v109.1c0 7.5-6.1 13.6-13.6 13.6H362z" fill="#41B3F9" p-id="5171"></path><path d="M880.2 937.9H143.8c-45.1 0-81.8-36.7-81.8-81.8V356.2c0-45.1 36.7-81.8 81.8-81.8h736.4c45.1 0 81.8 36.7 81.8 81.8V856c0 45.2-36.7 81.9-81.8 81.9zM143.8 301.7c-30.1 0-54.5 24.5-54.5 54.5V856c0 30.1 24.5 54.5 54.5 54.5h736.4c30.1 0 54.5-24.5 54.5-54.5V356.2c0-30.1-24.5-54.5-54.5-54.5H143.8z" fill="#41B3F9" p-id="5172"></path><path d="M721 301.7H303c-7.5 0-13.6-6.1-13.6-13.6V172.5c0-47.6 38.7-86.4 86.4-86.4h272.5c47.6 0 86.4 38.7 86.4 86.4v115.6c-0.1 7.5-6.2 13.6-13.7 13.6z m-404.3-27.3h390.7V172.5c0-32.6-26.5-59.1-59.1-59.1H375.7c-32.6 0-59.1 26.5-59.1 59.1v101.9z" fill="#41B3F9" p-id="5173"></path><path d="M246.7 299.9h-58.4c-7.5 0-13.6-6.1-13.6-13.6v-20.4c0-7.5 6.1-13.6 13.6-13.6h58.4c7.5 0 13.6 6.1 13.6 13.6v20.4c0 7.5-6.1 13.6-13.6 13.6zM835.8 299.9h-58.4c-7.5 0-13.6-6.1-13.6-13.6v-20.4c0-7.5 6.1-13.6 13.6-13.6h58.4c7.5 0 13.6 6.1 13.6 13.6v20.4c0 7.5-6.1 13.6-13.6 13.6z" fill="#41B3F9" p-id="5174"></path></svg>
               
                    指定医师，一对一专业指导
                </span>
                <span style="color:#28b8a1;" @click="goConsultationHome">
                    查看医师>
                </span>     
            </p>
        </div>
        <div class="content">
            <div class="content1">
                <p style="text-align: left;font-size:22px;padding: 10px 5%;padding-left:5%;font-weight: 900">请描述您的病情</p>
                <div class="inp">
                    <Input v-model="value6" type="textarea" :rows="5" placeholder="请详细描述您的病情症状+持续时间+看病，用药情况" style="width:100%;"/>
                </div>
            </div>
            <div class="content1">
                <p style="text-align: left;font-size:18px;padding: 10px 5%;padding-left:5%;font-weight: 400">本次患病多久了</p>
                <div class="rad">
                    <RadioGroup v-model="button4" type="button" size="large">
                        <Radio label="一周内"></Radio>
                        <Radio label="一月内"></Radio>
                        <Radio label="半年内"></Radio>
                        <Radio label="大半年"></Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="content1">
                <div class="But">
                    <Button shape="circle" class="circle" @click="goSelectionpatients()">提交信息</Button>
                </div>  
                
            </div>
        </div>
        <Modal
            v-model="modal1"
            title="提示信息">
            <p>提交信息成功，</p>
        </Modal>
    </div>
</template>

<script>
    export default {
        name:"describecondition",
        data(){
            return {
                value6:'',
                button4:'',
                modal1:false
            }
        },
        methods:{
            //前往医师主界面
            goConsultationHome(){
               this.$router.push('/ConsultationHome');
            },
            //选择患者
            goSelectionpatients(){
                var that =this;
                if(that.value6!=''&&that.button4!=''){
                    // var patients = {};
                    // patients.content= that.value6;
                    // patients.timer = that.button4;
                    // localStorage.setItem('patients',JSON.stringify(patients));
                    // that.$router.push({name:'selectionpatients'});
                    that.modal1=true;
                }else if(that.value6==''){
                    that.$Modal.warning({     //超时提示：网络不稳定
                        title: '友情提示',
                        content: '请描述病情信息',
                    });
                }else if(that.button4==''){
                    that.$Modal.warning({     //超时提示：网络不稳定
                        title: '友情提示',
                        content: '请填写患病时常',
                    });
                }
                
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
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.inp{
     padding: 10px 5% 10px 5%;
}
.rad{
   padding: 10px 5% 10px 5%;
   text-align: center;  
}
.circle{
    width: 90%;
    background: #28b8a1;
    color: #ffffff;
    font-size: 16px;
    padding: 8px 0;
}
.But{
    text-align: center;
    padding: 80px 0;
}
.nav{
        padding: 10px 5% 0 5%;
        font-size: 16px;
}
</style>