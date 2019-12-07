<template>
    <div class="settingup">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            设置
          </div>
        </div>
        <div class="content">
           <p>行医资格证：</p> 
           <div class="content1">
                <div class="Patient1" style="text-align: center;">
                    <p><svg t="1566457223344" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4050" width="50" height="50"><path d="M853.95951925 475.5066105h-310.08967642v-300.83326917c0-13.88461268-13.88461268-32.39742862-32.39742936-32.39742862-18.51281666 0-32.39742862 18.51281666-32.39742861 37.02563333v300.83326844H178.2417157c-18.51281666-4.62820399-37.02563333 13.88461268-37.02563262 32.39742934s18.51281666 32.39742862 32.39742863 32.39742861h300.83326916v300.83326845c4.62820399 18.51281666 18.51281666 37.02563333 37.02563261 37.02563334s32.39742862-18.51281666 32.39742935-32.39742862v-305.46147317h305.46147243c18.51281666 0 32.39742862-18.51281666 32.39742934-32.39742861s-9.25640796-37.02563333-27.76922535-37.02563333z" fill="#e6e6e6" p-id="4051"></path></svg></p>
                    <p>添加图片</p>
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
                this.$router.push('/Personalcenter');
            },
            //上传图片
            shngchua(){
                var that = this;
                wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                       wx.uploadImage({
                            localId:localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                serverId = res.serverId;
                                var url =that.$store.getters.getUrl+"down/downPic.do"
                                $.ajax({
                                    url: url,
                                    dataType: "json",
                                    async:true,
                                    type: "post",
                                    data: {mediaId:serverId},
                                    timeout: 30000,
                                    success: function (data, textStatus) {
                                        alert(data)
                                        // $('#imgUrl').val(data);
                                        // $.toast('上传成功', 'text');
                                    },
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        $.toast('上传错误,请稍候重试!', 'text');
                                    }
                                });
                            },
                            fail: function (error) {
                                $.toast('上传错误,请稍候重试!', 'text');
                            }
                        });
                       
                    },error:function(res){
                    }
                })
            },
            uploadImg(e){
                var that = this;
            },
            setconfig(){
                let _this=this
                let url=location.href 
                let reurl=this.$store.getters.getUrl + "SweepCode.do";
                $.ajax({
                    url: reurl,
                    type: "post",
                    dataType: "json",
                    async: false,
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
                })
            },
        },
        created() {
            // this.setconfig();
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
}
.Patient1{
    width: 90%;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: inline-block;
    text-align: center;
    padding: 10px 15px;
    font-size: 16px;
    position: relative;
    margin-top: 20px;
}
.Patient1 p{
    line-height: 1;
}
.content p{
    padding: 10px;
    font-size:18px;
}
</style>