<template>
    <div style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             咨询列表
        </div>
        <div class="content">
            <p style="padding:2px 2.66667vw;font-size:16px;border-bottom: 1px solid #eee;">
                <span style="vertical-align: middle;">
                    <svg t="1570691593180" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="853" width="30" height="30"><path d="M 860.4 263.1 H 163.6 c -54.8 0 -99.6 44.8 -99.6 99.6 v 298.7 c 0 54.8 44.8 99.6 99.6 99.6 h 696.9 c 54.8 0 99.6 -44.8 99.6 -99.6 V 362.7 c -0.1 -54.8 -44.9 -99.6 -99.7 -99.6 Z M 359.2 627.6 h -41.9 L 206.8 457.7 c -2.8 -4.3 -5.1 -8.8 -6.9 -13.4 h -1 c 0.9 4.9 1.3 15.5 1.3 31.8 v 151.5 h -37.1 V 396.4 h 44.7 l 106.7 165.9 c 4.5 6.9 7.4 11.6 8.7 14.2 h 0.6 c -1.1 -6.1 -1.6 -16.5 -1.6 -31.1 v -149 h 36.9 v 231.2 Z m 168.3 0 H 397.7 V 396.4 h 124.6 V 429 H 436 v 65.4 h 79.5 v 32.4 H 436 v 68.4 h 91.4 v 32.4 Z m 270 0 h -43.4 l -44 -161.7 c -1.8 -6.9 -3 -14.4 -3.4 -22.6 h -0.6 c -0.5 7.6 -1.8 15 -3.9 22.2 l -44.2 162 h -44.3 L 549 396.3 h 42.1 L 633 565.6 c 1.7 7.1 2.8 14.5 3.2 22.2 h 0.8 c 0.4 -5.5 1.9 -12.9 4.5 -22.2 L 689 396.4 h 39.5 L 772.4 567 c 1.5 5.8 2.6 12.7 3.4 20.6 h 0.6 c 0.3 -5.4 1.6 -12.5 3.7 -21.3 l 41.1 -169.9 h 39.7 l -63.4 231.2 Z" fill="#d81e06" p-id="854"></path></svg>
                </span> 
                <span>
                    最新消息
                </span>
                
            </p>
            <div class="mop"  v-for="(item,index) in huanList" :key="index" @click="addclick(item)">
                  <img src="./../../assets/toux.png" alt="" width="50px;" style="vertical-align: top;margin:0 15px;">
                  <div class="user">
                      <p style="color:#000;font-size: 16px;">{{item.docname}}</p>
                      <p >{{item.type}}</p>
                  </div>
                  <p class="poop">1分钟前</p>
            </div>
        </div>
        <loading v-show="isShowLoading"></loading>
    </div>
</template>

<script>
import loading from '../../common/loading'
    export default {
        components:{
            loading
        },
        data() {
            return {
                huanList:[],
                isShowLoading:false
            }
        },
        methods:{
            //返回上一层
            tobackdetail(){
              this.$router.push('/consultationHome');
            },
            addclick(item){
                localStorage.setItem('dddName',item.docname);
                localStorage.setItem('dddoccode',item.doccode);
                this.$router.push('/consultadoctor');
            },
            getuserList(){
                var that  = this;
                var url = that.$store.getters.getUrl + "orders/qureyPatientNewsList.do";
               var cardno = localStorage.getItem('cardno');
               that.isShowLoading=true;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data:{cardno:cardno},
                    success: function(data) {
                        that.isShowLoading=false;
                        that.huanList=[];
                        if(data.code==200){
                            that.huanList=data.data;
                        }else{
                            that.huanList=[];
                        }
                    },
                    error: function(data) {
                        that.isShowLoading=false;
                    }
                });
            }
        },
        created() {
            this.getuserList();
        },
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
.user{
    display: inline-block;
        width: calc(100% - 100px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.user p{
    line-height: 2;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #777;
}
.mop{
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    position: relative;
}
.poop{
  position: absolute;
  right: 5%;
  top: 5px;
  color: #aaa;
}
</style>