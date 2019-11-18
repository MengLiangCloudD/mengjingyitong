<template>
    <div style="height: 100%;overflow: auto;">
        <div class="title" >
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
          产后评估
        </div>
        <div class="top">
            <div class="usercontent">
                <div class="name">
                    <p><span>姓名：</span><span>王明香</span></p>
                </div>
                <div class="sex">
                    <p><span>年龄：</span><span>26</span></p>
                </div>
            </div>
            <div class="usercontent">
                <div class="name">
                    <p><span>科室：</span><span>妇产科</span></p>
                </div>
                <div class="sex">
                    <p><span>主管医生：</span><span>刘淑琴</span></p>
                </div>
            </div>
            <div class="usercontent">
                <div class="name">
                    <p><span>分娩日期：</span><span>2019-09-27</span></p>
                </div>
                <div class="sex">
                    <p><span>转诊日期：</span><span>2019-09-27</span></p>
                </div>
            </div>
        </div>
        <div class="content" v-for="(item,index) in postpartumList" :key="index">
            <div class="gu " >
                <div class="guti d">项目名称</div>
                <div class="guti2">
                    <p> {{item.itemName}}</p>
                </div>
            </div>
            <div class="gu">
                <div class="guti">评估内容</div>
                <div class="guti2">
                    <p>{{item.evalContext}} </p>
                    <!-- <p>2、产后出血</p>
                    <p>3、羊水栓塞</p> -->
                </div>
            </div>
            <div class="gu">
                <div class="guti">处理原则</div>
                <div class="guti2">
                    <p>{{item.handlerContext}} </p>
                    <!-- <p>2、主管医生按照急危重症抢救流程进行诊疗</p> -->
                </div>
            </div>
            <div class="gu" v-if="item.leavHosBefPg!=''&&item.leavHosBefPg!=null&&item.leavHosBefPg!=undefined">
                <div class="guti">出院前评估</div>
                <div class="guti2">
                    <p>{{item.leavHosBefPg}} </p>
                </div>
            </div>
            <div class="gu" v-if="item.chailAftSeven!=''&&item.chailAftSeven!=null&&item.chailAftSeven!=undefined">
                <div class="guti">产后7天评估</div>
                <div class="guti2">
                    <p>{{item.chailAftSeven}} </p>
                </div>
            </div>
            <div class="gu" v-if="item.chailAftFourteen!=''&&item.chailAftFourteen!=null&&item.chailAftFourteen!=undefined">
                <div class="guti">产后14天评估</div>
                <div class="guti2">
                    <p>{{item.chailAftFourteen}} </p>
                    
                </div>
            </div>
            <div class="gu" v-if="item.chailAftTwentyEight!=''&&item.chailAftTwentyEight!=null&&item.chailAftTwentyEight!=undefined">
                <div class="guti">产后28天、42天评估</div>
                <div class="guti2">
                    <p>{{item.chailAftTwentyEight}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                theme1: 'light',
                name:2,
                postpartumList:[]
            }
        },
        methods: {
            //返回上一层
            tobackdetail(){
                this.$router.push('/Myaccount');
            },
            postpartum(){
                var that  =this;
                var url =  that.$store.getters.getUrl + "DoctorAfterChildbirthEval/doctorEvalByCardnoAndCreateTime.do";
                var cardno = '123'
                var time='2019-10-16'
                 $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    // async: false,
                    data: {
                        cardno: cardno,
                        time:time
                    },
                    success:function(data){
                        that.postpartumList=data;
                    },
                    error:function(data){
                    }
                })
            },
            
        },
        mounted() {
                this.postpartum()
         },
    }
</script>

<style scoped>

.title {
  background: rgb(40, 184, 161);
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
.top{
    padding: 5px 5px;
    font-size: 15px;
    border-bottom: 5px solid #ccc;
}
.usercontent{
    display: flex;
     padding: 2px 10px;
     
}
.name{
    
    display: inline-block;
    flex: 1;
}
.name span:nth-of-type(1){
    font-weight: 900;
}
.sex span:nth-of-type(1){
    font-weight: 900;
}
.sex{
    width: 50%;
    display: inline-block;
    
}
.ivu-menu-horizontal .ivu-menu-item{
    padding: 0 2.5%;
}
.gu{
    display: flex;
    font-size: 15px;
    /* padding: 10px; */
    border-bottom:1px solid #ccc;
}
.guti{
    flex:1;
    display: inline-block;
    vertical-align: middle;
    font-weight: 500;
     padding: 10px;
   
}
.guti2{
    display: inline-block;
    vertical-align: middle;
     width: 50%;
     border-left: 1px  solid #ccc;
     padding: 10px;
}
.content{
    border-bottom: 3px solid #ccc;
}
.d{
    font-weight: 900;
}

</style>