<template>
    <div class="settingup">
        <div class="titlei" >
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            设置
          </div>
          <div class="contenter">
            <p style="display: flex;"  v-if="!claear"><span style="flex:1;">行医资格证：</span> <span style="color:blue" @click="gotouchstart">编辑</span></p> 
             <p style="display: flex;" v-if="claear"><span style="flex:1;">行医资格证：</span> <span style="color:blue" @click="gotouchstart">完成</span></p> 
        </div>
        </div>
        
        <div class="content">
           <div class="content1">
                <div class="Patient1" style="text-align: center;" v-for="(item,index) in imagers" :key="index" >
                    <img :src="item.imageUrl" alt="" width="100%" >
                <div class="Patient3" style="text-align: center;position:absolute;top: 0;right: 0;" v-if="claear">
                    <p @click="tis(index)"><svg t="1576563665563" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5338" width="50" height="50"><path d="M912 214.6H109.6c-21.1 0-38.2 17.1-38.2 38.2S88.5 291 109.6 291h88.6v469.1c0 90.7 73.8 164.5 164.5 164.5h296.2c90.7 0 164.5-73.8 164.5-164.5V290.9H912c21.1 0 38.2-17.1 38.2-38.2 0-21-17.1-38.1-38.2-38.1zM462.5 683c0 21.1-17.1 38.2-38.2 38.2s-38.2-17.1-38.2-38.2V443.1c0-21.1 17.1-38.2 38.2-38.2s38.2 17.1 38.2 38.2V683z m172.9 0c0 21.1-17.1 38.2-38.2 38.2S559 704.1 559 683V443.1c0-21.1 17.1-38.2 38.2-38.2s38.2 17.1 38.2 38.2V683zM364.5 174.6h292.6c21.1 0 38.2-17.1 38.2-38.2s-17.1-38.2-38.2-38.2H364.5c-21.1 0-38.2 17.1-38.2 38.2s17.1 38.2 38.2 38.2z" p-id="5339" fill="#ffffff"></path></svg></p>
                    <p>删除图片</p>
                </div>
                </div>
            </div>
           <div class="content1">
                <div class="Patient1" style="text-align: center;" @click="shngchua">
                    <p><svg t="1566457223344" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4050" width="50" height="50"><path d="M853.95951925 475.5066105h-310.08967642v-300.83326917c0-13.88461268-13.88461268-32.39742862-32.39742936-32.39742862-18.51281666 0-32.39742862 18.51281666-32.39742861 37.02563333v300.83326844H178.2417157c-18.51281666-4.62820399-37.02563333 13.88461268-37.02563262 32.39742934s18.51281666 32.39742862 32.39742863 32.39742861h300.83326916v300.83326845c4.62820399 18.51281666 18.51281666 37.02563333 37.02563261 37.02563334s32.39742862-18.51281666 32.39742935-32.39742862v-305.46147317h305.46147243c18.51281666 0 32.39742862-18.51281666 32.39742934-32.39742861s-9.25640796-37.02563333-27.76922535-37.02563333z" fill="#e6e6e6" p-id="4051"></path></svg></p>
                    <p>添加图片</p>
                </div>
            </div>
        </div>
        <Modal
                v-model="tismods"
                @on-ok="delateImage"
                title="提示">
                <p>您确认删除吗!</p>
            </Modal>
    </div>
</template>

<script>
var timeOutEvent=0;//定时器
    export default {
        data() {
                return {
                    imagers:[],
                    serverId:[],
                    claear:false,
                    tismods:false,
                    cunindex:'',
                    imgerls:[]
                }
            },
        methods:{         
            //返回上一层
            tobackdetail(){
                this.$router.push('/Personalcenter');
            },
            //上传图片至微信服务器
            shngchua(){
                var that = this;
                wx.chooseImage({
                    count: 5,
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        var serverId=[]
                        for(var i =0;i<localIds.length;i++){
                            wx.uploadImage({
                                localId:res.localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    serverId.push(res.serverId);
                                    if(serverId.length==localIds.length){
                                        that.setchaun(serverId);
                                    }
                                },
                                fail: function (error) {
                                    $.toast('上传错误,请稍候重试!', 'text');
                                }
                            });
                        }
                        that.serverId=serverId;
                        
                    },error:function(res){
                    }
                })
            },
            // 上传图片至后台
            setchaun(serverId){
                var that = this;
                console.log(serverId);
                var url =that.$store.getters.getUrl+"down/downPic.do"
                var a;
                if(serverId.length==1){
                    a = serverId[0];
                }else if(serverId.length>1){
                    a= serverId.join(',');
                }
                var mediaIds=a;
                var docCode= localStorage.getItem('ysdoccode');
                $.ajax({
                    url: url,
                    dataType: "json",
                    async:true,
                    type: "post",
                    data: {
                        mediaIds:mediaIds,
                        docCode:docCode
                    },
                        timeout: 30000,
                    success: function (data, textStatus) {
                        if(data.code==200){
                            that.$Message.info('上传成功');
                            that.uploadImg();
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        // $.toast('上传错误,请稍候重试!', 'text');
                    }
                });
            },
            //c查询图片
            uploadImg(){
                var that = this;
                var url  = that.$store.getters.getUrl+"/down/CheckCertificate.do"
                var docCode= localStorage.getItem('ysdoccode');
                 $.ajax({
                    url: url,
                    dataType: "json",
                    async:true,
                    type: "post",
                    data: {
                        docCode:docCode
                    },
                    timeout: 30000,
                    success: function (data) {
                        if(data.code==200){
                            //深拷贝
                            var newArr=JSON.parse(JSON.stringify(data.data));
                            that.imgerls=newArr;
                            //处理数据给图片拼接上域名
                            for(var i = 0;i<data.data.length;i++){
                                data.data[i].imageUrl=that.$store.getters.getUrl+data.data[i].imageUrl;
                            }
                            that.imagers=data.data;
                            if(that.imagers.length<=0){
                                that.claear=false;
                            }
                        }
                    },
                    error: function (data) {
                        
                    }
                });
            },
            //获取微信授权信息
            setconfig(){
                let _this=this
                let url=location.href 
                let reurl=this.$store.getters.getUrl + "SweepCode.do";
                $.ajax({
                    url: reurl,
                    type: "post",
                    dataType: "json",async: false,
                    timeout: 15000, //通过timeout属性，设置超时时间
                    data: { url: url },
                    success: function(data) {
                        _this.appId = data.appId; // 必填,公众号的唯一标识
                        _this.timestamp = data.timestamp; // 必填,生成签名的时间戳
                        _this.nonceStr = data.nonceStr; // 必填,生成签名的随机串
                        _this.signature = data.signature; // 必填,签名
                        wx.config({
                                debug: false,
                                appId: _this.appId, // 必填,公众号的唯一标识
                                timestamp: _this.timestamp, // 必填,生成签名的时间戳
                                nonceStr: _this.nonceStr, // 必填,生成签名的随机串
                                signature: _this.signature, // 必填,签名
                                jsApiList: [
                                    'startRecord',
                                    'stopRecord',
                                    'onVoiceRecordEnd',
                                    'translateVoice',
                                    "playVoice",
                                    "chooseImage",
                                    "previewImage",
                                    "uploadVoice",
                                    "uploadImage"
                                ] // 必填,需要使用的JS接口列表
                            });
                    },
                    error: function(data) {
                    },
                    complete: function (XMLHttpRequest, status) { //当请求完成时调用函数
                        if (status == 'timeout') {//status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
                        ajaxTimeOut.abort(); //取消请求
                        _this.$Modal.warning({     //超时提示：网络不稳定
                            title: '友情提示',
                            content: '请求超时',
                        });
                        }
                    }
                });
                wx.ready(function() {
                    wx.checkJsApi({
                        jsApiList: [
                            'startRecord',
                            'stopRecord',
                            'onVoiceRecordEnd',
                            'translateVoice',
                            "playVoice",
                            "chooseImage",
                            "previewImage",
                            "uploadVoice",
                            "uploadImage"
                        ],
                        success: function (res) {
                        }
                    })
                    wx.hideMenuItems({// 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                        menuList: ["menuItem:setFont"]
                    });
                })
            },
            tis(index){
                this.tismods=true;
                this.cunindex=index
            },
            //删除图片 
            delateImage(index){
                var that = this;
                var index=that.cunindex 
                var url  = that.$store.getters.getUrl+"/down/DelCertificate.do"
                var imageUrl= that.imgerls[index].imageUrl;
                 $.ajax({
                    url: url,
                    dataType: "json",
                    async:true,
                    type: "post",
                    data: {
                        imgUrl:imageUrl
                    },
                    timeout: 30000,
                    success: function (data) {
                        if(data.code==200){
                            that.$Message.info('删除成功');
                            that.uploadImg();
                            clearTimeout(timeOutEvent);
                        }
                    },
                    error: function (data) {
                        
                    }
                });
            },
            //编辑或完成
                gotouchstart(){
                    let that = this;
                    that.claear=!that.claear;
                    
                },
        },
        created() {
            this.setconfig();
            this.uploadImg();
        },
    }
</script>

<style scoped>
.settingup{
    height:100%;
    overflow: auto;
}
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
.content1{
    text-align: center;
    padding-bottom: 20px;
}
.Patient1{
    width: 90%;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: inline-block;
    text-align: center;
    padding: 10px;
    font-size: 16px;
    position: relative;
    margin-top: 15px;
}
.Patient1 p{
    line-height: 1;
    
}
.Patient3 p{
    line-height: 1;
    
}
.Patient3{
   width: 100%;
   height: 100%;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: inline-block;
    text-align: center;
    padding: 10px;
    font-size: 16px;
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    /* margin-top: 15px;  */
    color:#fff;
}
.content{
    padding-top: 100px;
}
.content p{
    padding: 10px;
    font-size:18px;
}
.contenter p{
    padding: 10px;
    font-size:18px;
}
.titlei{
  position: fixed;
  width: 100%;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #bbb
}
</style>