 <template>
     <div  style="height:100%;overflow: auto;background: rgb(250,250,250);">
         <div class="top">
             <div class="tittle" style="background: #28b8a1;color:white">
                <div class="arrow-icon" @click="tobackdetail">
                    <Icon size="30" type="ios-arrow-back" />
                </div>
                我的账单
            </div>
            <div class="title_top">
                <Menu mode="horizontal"  active-name="1" @on-select="updetmeun">
                    <MenuItem name="1">
                        全部账单
                    </MenuItem>
                    <MenuItem name="2">
                        已缴费账单
                    </MenuItem>
                    <MenuItem name="3">
                        未缴费账单
                    </MenuItem>
                    <MenuItem name="4">
                        已退款账单
                    </MenuItem>
                </Menu>
            </div>
         </div>
         <div class="coont">
              <div class="content" v-for="(item,index) in bilLists" :key="index">
                <p style="display: flex; border-bottom: #EEE 1px solid;padding:10px;vertical-align: middle;">
                    <span style="flex:1;">
                        滦平妇幼保健院({{item.typede}})
                    </span>
                    <span style="vertical-align: middle;" v-if="item.type==1">已缴费</span>
                    <span style="vertical-align: middle;color:orange;" v-if="item.type==0" >未缴费</span>
                    <span style="vertical-align: middle;color:red;" v-if="item.type==2">已退款</span>
                </p>
                <div class="content_tent">
                    <img src="./../../assets/logo.jpg" alt="" width="60" style="vertical-align: middle;">
                    <div class="tent">
                        <p><span>缴费时间：</span><span>{{item.time}}</span></p>
                        <p><span>总价：</span><span>{{item.jiag}}</span></p>
                    </div>
                </div>
                 
                <p v-if="item.type==1||item.type==2" style="display: flex;padding:0 10px 10px 10px;vertical-align: middle;"><span style="flex:1;"></span><span class="btt" @click="examine(index)">查看详情</span></p>
                <p v-if="item.type==0" style="display: flex;padding:0 10px 10px 10px;vertical-align: middle;"><span style="flex:1;"></span><span class="btt">去缴费</span></p>
            </div>
         </div>
           
     </div>
 </template>
 
 <script>
     export default {
         data() {
             return {
                 theme1:'',
                 bilList:[
                    {
                        type:1,
                        typede:'挂号',
                        time:'2019-10-02 22：41',
                        jiag:'98.6'
                    },{
                        type:0,
                        typede:'挂号',
                        time:'2019-10-02 22：41',
                        jiag:'98.6'
                    },{
                        type:2,
                        typede:'挂号',
                        time:'2019-10-02 22：41',
                        jiag:'98.6'
                    },{
                        type:1,
                        typede:'挂号',
                        time:'2019-10-02 22：41',
                        jiag:'98.6'
                    },{
                        type:0,
                        typede:'挂号',
                        time:'2019-10-02 22：41',
                        jiag:'98.6'
                    },{
                        type:2,
                        typede:'挂号',
                        time:'2019-10-02 22：41',
                        jiag:'98.6'
                    },{
                        type:1,
                        typede:'挂号',
                        time:'2019-10-02 22：41',
                        jiag:'98.6'
                    },{
                        type:0,
                        typede:'挂号',
                        time:'2019-10-02 22：41',
                        jiag:'98.6'
                    },{
                        type:2,
                        typede:'挂号',
                        time:'2019-10-02 22：41',
                        jiag:'98.6'
                    }
                 ],
                 bilLists:[]
             }
         },
         methods: {
             //返回上一层
            tobackdetail(){
            //    this.$router.push('/myCard');
            },
            //切换按钮
            updetmeun(value){
                if(value==1){
                    this.bilLists =this.bilList
                }
                if(value==2){
                    var bilList=this.bilList;
                    var bilLists = []
                    for(var i = 0;i<bilList.length;i++){
                        if(bilList[i].type==1){
                            bilLists.push(bilList[i]);
                        }
                    }
                    this.bilLists=bilLists;
                }
                if(value==3){
                    var bilList=this.bilList;
                    var bilLists = []
                    for(var i = 0;i<bilList.length;i++){
                        if(bilList[i].type==0){
                            bilLists.push(bilList[i]);
                        }
                    }
                    this.bilLists=bilLists;
                }
                if(value==4){
                    var bilList=this.bilList;
                    var bilLists = []
                    for(var i = 0;i<bilList.length;i++){
                        if(bilList[i].type==2){
                            bilLists.push(bilList[i]);
                        }
                    }
                    this.bilLists=bilLists;
                }
            },
            //查看详情
            examine(index){
                this.$router.push('/Billdetails');
            }
         },
         mounted(){
              this.bilLists =this.bilList;
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
.ivu-menu-item{
       padding: 0 3.63%;
}
.tent{
    display: inline-block;
    vertical-align: middle;
    padding: 0 10px;
}
.content{
    margin: 10px;
    font-size: 15px;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
}
.content_tent{
    padding: 10px;
}
.btt{
    border: 1px solid #ddd;
    padding: 5px 10px;
    border-radius: 25px
}
.top{
    position: fixed;
    width: 100%;
}
.top:after{
    content:"";
    clear: both;
    display: block;
}
.coont{
        padding-top: 30%;
}
 </style>