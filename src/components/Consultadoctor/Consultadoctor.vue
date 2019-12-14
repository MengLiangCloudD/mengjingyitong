<template>
    <div class="sdk" ref="sdk">
        <div class="tittle" style="background: rgb(255, 255, 255);">
            <div class="arrow-icon">
                <Icon size="30" type="ios-arrow-back" color="" @click.prevent="goback"/>
                <span style="font-size:18px;">
                    <!-- {{name}} -->
                    张清北医生
                </span>
            </div>
        </div>
        <div class="contents">
            <div style="background:rgb(243, 253, 251)">
                <div style="color:rgb(26,214,190);padding:10px;text-align:center;font-size:14px;">
                    正在咨询中，此咨询将在23小时后结束
                </div>
            </div>
            <div>
                <div style="background:rgb(242,242,242);padding:10px;border-radius:20px;font-size:12px;margin:0 10px;text-align:center">
                    为了医生的判断准确，请按照您的真实情况回答问题
                </div>
            </div>
            <div class="content"  v-for="(item,index) in neirong" :key="index">
                <div class="comment" v-if="item.role=='p'">
                    <div class="content1" >
                        <img src="./../../assets/avatar.png" alt="" width="40px;" style="vertical-align: top;margin:0 15px;float: right;border-radius:50%;" />
                        <div class="send" v-if="item.ctxtype==0">
                            <p>{{item.content}}</p> 
                        </div>
                        <div class="send" :style="{width:item.len<=20?'25%':(item.len<=40?'35%':'45%')}" v-if="item.ctxtype==1" @click="playvoice(item,index)">
                            <voiceanimate :isshow="index==currentindex?voicestate:'up'" rotationstate></voiceanimate>
                            <span>{{item.len}}''</span>
                        </div>
                        <div class="send" style="background:rgb(255,255,255);padding-right:0;text-align:right" v-if="item.ctxtype==2">
                            <img :class="'item'+index" @click="previewimage(item)"  :src="item.content" alt="" width="150">
                        </div>
                    </div> 
                </div>
                <div class="comment"  v-if="item.role=='d'">
                    <div class="content1">
                        <img src="./../../assets/toux.png" alt="" width="40px;" style="vertical-align: top;margin:0 15px;border-radius:50%;" >
                        <div class="send1" v-if="item.ctxtype==0">
                            <p>{{item.content}}</p> 
                        </div>
                        <div class="send1" :style="{width:item.len<=20?'25%':(item.len<=40?'35%':'50%')}" v-if="item.ctxtype==1" @click="playvoice(item,index)">
                            <span>{{item.len}}''</span>
                            <voiceanimate :isshow="index==currentindex?voicestate:'up'"></voiceanimate> 
                        </div>
                        <div class="send1" style="background:rgb(255,255,255);padding-left:0;text-align:center;" v-if="item.ctxtype==2">
                            <img style="margin-left:5px;"  @click="previewimage(item)" :src="item.content" alt="" width="150">
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer1">
                 <!-- 切换到语音 -->
                <span v-if="!toggleState" @click="toggle">
                   <Icon type="md-mic"  size="30" color="rgb(204,204,204)"/>
                </span>
                <!-- 点击切换到输入文字  -->
                <span v-if="toggleState" @click="toggle">
                   <Icon type="ios-keypad" size="30" color="rgb(204,204,204)"/>
                </span>
                <!-- 输入文字 -->
                 <span v-if="!toggleState" class="inputbox" style="position:relative"> 
                     <input 
                      ref="input"
                      v-model="value" 
                      placeholder="" 
                      style=" vertical-align: middle;background:rgb(253,253,253);border:1px solid rgb(244,244,244);outline:none;-webkit-appearance: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" 
                      @blur.prevent="inputLoseFocus"
                      />
                     <button :style="{background:value?'rgb(0,200,171)':'rgb(204,204,204)'}" style="outline: none;background:rgb(0,200,171);position: absolute;top:2px;right:5px;color:rgb(255,255,255);height:35px;padding:2px;font-size:12px;border-radius:20px;border:none;width:60px;" @click="sendmsg(0,1)">发送</button>
                </span> 
                <!-- <span v-if="!toggleState">
                    <Button type="info" @click="sendmsg(0,1)">发送</Button> 
                </span> -->
                <!-- 录入语音 -->
                <input class="inputvoice"
                    value="按住说话"
                    type="button"
                    v-if="toggleState" 
                    @touchstart.prevent="startvoice" 
                    @touchend="endvoice" 
                    style="height:40px; border:none;vertical-align: middle;display: inline-block; padding: 10px;border-radius:20px;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;"
                    :style="{background:bgacol}"
                 >
                <!-- 视频 -->
                <a href="https://q.tenchong.com:3004/" >
                    <Icon type="ios-videocam-outline" size="30" color="rgb(204,204,204)"/>
                </a> 
                <!-- 上传图片 -->
                 <span @click="chooseimg" >
                     <Icon type="md-image" size="30" color="rgb(204,204,204)"/>
                 </span>
            </div>
        </div>
        <div class="mask" v-show="isShowVoiceAnimat">
            <div class="voice-animate">
                <div class="imghua">
                    <img class="voice-img" src="../../assets/ic_record@2x.png" alt="">
                </div>
                <div class="bars">
                    <div class="bar" v-for="(item,index) in bars" :key="index" :style="{width:item.len+'px',height:'10px',background:item.color}"></div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="countDownState">
            <div class="voice-animate">
                <countdown></countdown>
            </div>
        </div>
        <audio ref="audio" src="" ></audio>
    </div>
</template>

<script>
import {websocket} from "../doctor/websocket.js"
import voiceanimate from "../../common/voice"
import countdown from "../../common/countdown"
    export default {
        // 数据结构，网络原理，组成原理
        name:"consultadoctor",
        components:{
            voiceanimate,
            countdown
        },
        data(){
            return {
                timervoice:"",
                countDownState:false,
                // 0 文本 1 语音 2图片
                bgacol:"rgb(244,244,244)",
                startTime:"",
                endTime:"",
                currentindex:-1,
                endedstate:"",
                voicestate:"up",
                neirong:[],
                localid:[],//临时存储图片语音路径
                value:'',
                name:'',
                toggleState:false,
                isShowVoiceAnimat:false,
                barnum:4,
                bars:[
                        {len:50,color:"rgb(122,135,114)"},
                        {len:40,color:"rgb(122,135,114)"},
                        {len:30,color:"rgb(122,135,114)"},
                        {len:20,color:"rgb(122,135,114)"},
                        {len:10,color:"#fff"}
                    ],
                appId : "", // 必填,公众号的唯一标识
                timestamp :"",// 必填,生成签名的时间戳
                nonceStr : "", // 必填,生成签名的随机串
                signature : ""
            }
        },
        methods:{
            goback(){
                this.$router.push("/pReplylist")
            },
            inputLoseFocus(){
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    }, 100);
            },
            toggle(){
                this.toggleState=!this.toggleState
            },
            reply(type,value,role,timestamp,len){
                let _this=this
                if(type==0){
                    this.neirong.push({
                        content:value,
                        ctxtype:0,
                        role:role,
                        timestamp:timestamp
                    })
                    this.value=""
                }else if(type==1){
                    this.neirong.push({
                        content:value,
                        ctxtype:1,
                        len:len,
                        role:role,
                        timestamp:timestamp
                    })
                }else{
                    this.neirong.push({
                        content:value,
                        ctxtype:2,
                        role:role,
                        timestamp:timestamp
                    })
                }
                this.scrolBottome()
            },
            sendmsg(type,type1,value){
                let _this=this
                if(type==0){
                    if(_this.value.trim()){
                        let _timestamp =(new Date()).getTime()
                        // this.neirong.push({
                        //     content:_this.value,
                        //     ctxtype:0,
                        //     role:"p",
                        //     timestamp:_timestamp
                        // })
                        let ctx={
                                content:_this.value,
                                ctxtype:0,
                                role:"p",
                                timestamp:_timestamp
                            }
                        _this.addchatrecord({
                            sender: "123",
                            receiver: "000QB",
                            content:JSON.stringify(ctx) ,
                            chatTime: _timestamp,
                            patStatus: "1",
                            docStatus: "1",
                            cpsId: "1"
                        })
                        window.websocketobj.send(JSON.stringify({to:'d',content:_this.value,ctxtype:0,role:"p",timestamp:_timestamp}));
                    }
                    this.value=""
                }else if(type==1){
                        let time=Math.floor((_this.endTime-_this.startTime)/1000)
                        let _timestamp =(new Date()).getTime()
                        // this.neirong.push({
                        //     content:value,
                        //     type:type1,
                        //     ctxtype:1,
                        //     len:time,
                        //     role:"p",
                        //     timestamp:_timestamp
                        // })
                        let ctx={
                                content:value,
                                ctxtype:1,
                                role:"p",
                                len:time,
                                timestamp:_timestamp
                            }
                        _this.addchatrecord({
                            sender: "123",
                            receiver: "000QB",
                            content:JSON.stringify(ctx) ,
                            chatTime: _timestamp,
                            patStatus: "1",
                            docStatus: "1",
                            cpsId: "1"
                        })
                        window.websocketobj.send(JSON.stringify({to:'d',content:value,ctxtype:1,role:"p",timestamp:_timestamp,len:time}));
                }else{
                        let _timestamp =(new Date()).getTime()
                        // this.neirong.push({
                        //     content:value,
                        //     type:type1,
                        //     ctxtype:2,
                        //     role:"p",
                        //     timestamp:_timestamp
                        // })
                        let ctx={
                                content:value,
                                ctxtype:2,
                                role:"p",
                                timestamp:_timestamp
                            }
                        _this.addchatrecord({
                            sender: "123",
                            receiver: "000QB",
                            content:JSON.stringify(ctx) ,
                            chatTime: _timestamp,
                            patStatus: "1",
                            docStatus: "1",
                            cpsId: "1"
                        })
                        // alert("开始发送websocket")
                        window.websocketobj.send(JSON.stringify({to:'d',content:value,ctxtype:2,role:"p",timestamp:_timestamp}));
                        // window.websocketobj.send(JSON.stripngify({to:'d',content:value,ctxtype:2,role:"p",timestamp:_timestamp}));
                        // alert(JSON.stringify(ctx))
                        // alert("websocket已发送")
                }
                this.scrolBottome()
                // 发送信息到websocket
            },
            chooseimg(){
                let _this=this
                this.stopplayaudio()
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        wx.uploadImage({
                            localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                var serverId = res.serverId; //返回图片的服务器端ID
                                $.ajax({
                                    url:_this.$store.getters.getUrl+"down/downPic.do",
                                    type: "post",
                                    dataType: "json",
                                    async: true,
                                    data:{mediaId:serverId},
                                    success: function(data) {
                                        let imgpath=_this.$store.getters.getUrl+data.data.slice(1)
                                        _this.sendmsg(2,1,imgpath)
                                    },
                                    error: function(data) {
                                    }
                                });
                            }
                        });
                    }
                });
            },
            previewimage(item){
                this.stopplayaudio()
                let currentImg=item.content
                let imgArr=[]
                imgArr.push(currentImg)
                wx.previewImage({
                    current: currentImg, // 当前显示图片的http链接
                    urls: imgArr // 需要预览的图片http链接列表
                });
            },
            //开始录音
            startvoice(){
                let _this=this
                this.stopplayaudio()
                let time=new Date()
                this.startTime=time.getTime()
                this.isShowVoiceAnimat=true
                this.bgacol="rgb(205, 205, 205)"
                clearInterval(_this.counttimerout)
                _this.counttimerout=setTimeout(function() {
                    if(!_this.isShowVoiceAnimat){
                        //关闭录音动画
                         clearInterval(_this.counttimerout)
                    }else{
                        _this.isShowVoiceAnimat=false
                        _this.countDownState=true//显示倒计时
                        clearInterval(_this.counttimerout)
                    }
                },50000)
                wx.startRecord();
            },
            uploadVoice(localId){
                let _this=this
                wx.uploadVoice({
                    localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; // 返回音频的服务器端ID
                        $.ajax({
                            url:_this.$store.getters.getUrl+"down/downVoice.do",
                            type: "post",
                            dataType: "json",
                            async: true,
                            data:{mediaId:serverId},
                            success: function(data) {
                                //获取图片路径voicePath
                                let voicePath=_this.$store.getters.getUrl+data.data.slice(1)
                                _this.sendmsg(1,1,voicePath)
                            },
                            error: function(data) {
                                
                            }
                        });
                    }
                });
            },
            //结束录音
            endvoice(){
                let _this=this
                this.isShowVoiceAnimat=false
                let time=new Date()
                _this.endTime=time.getTime()
                this.bgacol="rgb(244, 244, 244)",
                wx.stopRecord({
                    success: function (res) {
                        if(_this.endTime-_this.startTime<1000){
                            return
                        }
                        let localId = res.localId;
                        _this.uploadVoice(localId)
                    }
                })
            },
            onVoiceRecordEnd(){
                let _this=this
                wx.onVoiceRecordEnd({
                    success: function (res) {
                        _this.countDownState=false
                        let time=new Date()
                        _this.endTime=time.getTime()
                        var localId = res.localId; // 返回音频的本地ID
                        _this.uploadVoice(localId)
                    }
                })
            },
            timer(){

            },
            stopplayaudio(){
                this.$refs.audio.pause()
                clearInterval(this.timervoice)
                this.voicestate="up"
            },
            //播放语音
            playvoice(item,index){
                let _this=this
                _this.currentindex=index
                let states=["mute","down","up"]
                let statesindex=0
                this.$refs.audio.src=item.content
                this.$refs.audio.play()
                _this.voicestate="mute"
                clearInterval(_this.timervoice)
                _this.timervoice=setInterval(function() {
                   _this.voicestate=states[statesindex] 
                   if(_this.$refs.audio.ended){
                        _this.voicestate="up"
                        clearInterval(_this.timervoice)
                   }
                   statesindex++
                   if(statesindex==3){
                       statesindex=0
                   }
                },250)

            },
            setconfig(){
                let _this=this
                let url=location.href 
                let reurl=this.$store.getters.getUrl + "SweepCode.do";
                $.ajax({
                    url: reurl,
                    type: "post",
                    dataType: "json",
                    async: true,
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
                            _this.onVoiceRecordEnd()
                        }
                    })
                    wx.hideMenuItems({// 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                        menuList: ["menuItem:setFont"]
                    });
                })
            },
            initVoiceAnimate(){
                let _this=this
                setInterval(function(){
                    _this.barnum--
                    if(_this.barnum<0){
                        _this.barnum=4
                        for(let i=0;i<_this.bars.length;i++){
                            _this.bars[i].color="rgb(122,135,114)"
                        }
                    }
                    _this.bars[_this.barnum].color="rgb(255,255,255)"
                },100)
            },
            initWebsocketOnmassage(){
                let _this=this
                window.websocketobj.onmessage=function(event) {    //心跳检测重置
                // alert("websocket接收到了消息")
                // alert(event.data)
                    let obj=JSON.parse(event.data)
                    console.log(event.data)
                    _this.reply(obj.ctxtype,obj.content,obj.role,obj.timestamp,obj.len)
                }
            },
            scrolBottome(){
                setTimeout(function() {
                    var container =document.getElementsByClassName("contents")[0];
                    container.scrollTop=container.scrollHeight
                },200)
            },
            //添加聊天内容
            addchatrecord(msg){
                var url = this.$store.getters.getUrl + "chat/addchatrecord.do";
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    contentType:"application/json",
                    async: true,
                    data:JSON.stringify(msg),
                    success: function(data) {
                    },
                    error: function(data) {

                    }
                });
            },
            getchatrecord(){
                let _this=this
                var url = this.$store.getters.getUrl + "chat/getchatrecord.do";
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    // contentType:"application/json",
                    async: true,
                    data:{cpsid:"1"},
                    success: function(data) {
                        if(data.code==200){
                            let recordarr=data.data.map(function(item) {
                                return JSON.parse(item.content)
                            })
                            _this.neirong=recordarr
                        }
                    },
                    error: function(data) {

                    }
                });
            }
        },
        created(){
            if(!localStorage.getItem("patientchatstate")){
                localStorage.setItem("patientchatstate","1")
                location.reload()
            }
            websocket("p")
            let _this=this
            this.initWebsocketOnmassage()
            this.setconfig()
            //语音动画
            _this.initVoiceAnimate()
        },
        mounted(){
            let _this=this
            this.getchatrecord()
            // this.reply(1,"http://up_mp4.t57.cn/2018/1/03m/13/396131232171.m4a",50)
            // this.reply(1,"http://up_mp4.t57.cn/2018/1/03m/13/396131232171.m4a",50)
            // this.reply(2,"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572586103773&di=4f21c3b576fb719750ab7f3b1c4e5868&imgtype=0&src=http%3A%2F%2Fpic.lvmama.com%2Fuploads%2Fpc%2Fplace2%2F2014-11-10%2F1415604500644.jpg")
            // this.reply(0,"http://up_mp4.t57.cn/2018/1/03m/13/396131232171.m4a")
            // this.name = localStorage.getItem('ReplyName')
        },
        destroyed(){
            
        }
    }
</script>

<style  scoped>
.inputvoice{
    flex: 1;
    
    margin: 0 10px;
}
.inputbox{
    flex: 1;
    margin: 0 5px;
}
.inputbox input{
    height: 40px;
    border-radius: 20px;
    border: none;
    outline: none;
    padding: 10px;
    width: 100%;
}
.bar{
    margin: 10px 0;
}
.tittle {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
  width: 100%;
  z-index: 100;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
  
  
}
.send {
    position:relative;
    background:rgb(237,247,245);
    border-radius:20px; /* 圆角 */
    border-top-right-radius: 0px;
    margin: 0 1px;
    display: inline-block;
    word-wrap: break-word;
    word-break: break-all;
    padding:10px 5px;
    float: right;
    max-width: 50%;
    font-size: 16px;
}
.send1{
    text-align: right;
    position:relative;
    background:rgb(255,255,255);
    border-radius:20px; /* 圆角 */
    border-top-left-radius: 0;
    /* margin:30px auto 0; */
    display: inline-block;
    word-wrap: break-word;
    word-break: break-all;
    max-width: 50%;
    padding:10px 5px;
    font-size: 16px;
}
.send1 p{
    padding: 0;
    margin: 0;
}
.send p{
    padding: 0;
    margin: 0;
}
 .arrow1 {
    position:absolute;
    top:5px;
    left:-16px; /* 圆角的位置需要细心调试哦 */
    width:0;
    height:0;
    font-size:0;
    border:solid 8px;
    border-color:#fff #F8C301 #fff #fff;
    color: black;
}
 .arrow {
    position:absolute;
    top:5px;
    right:-16px; /* 圆角的位置需要细心调试哦 */
    width:0;
    height:0;
    font-size:0;
    border:solid 8px;
    border-color:#fff #fff #fff #F8C301;
    color: black;
}
.comment{
    width: 100%;
    position: relative;
}
.content1{
    overflow: hidden;
    margin: 21px 0;
}
.footer{
    width: 100%;
    bottom: 0;
    background: rgb(255, 255, 255);
    vertical-align:middle;
    
}
.footer1{
    text-align: center;
    margin: 10px 0;
    display: flex;
    align-items: center;
    /* padding: 10px 2%; */
    
}
.contents{
    flex:1;
    overflow: auto;
}
.sdk{
    position: relative;
    height: 100%;
    overflow: hidden !important;
    display: flex;
    flex-direction: column;
    background: rgb(249,249,249)
}
.mask{
    position: fixed;
    left: 50%;
    margin-left: -100px;
    top: 100px;
}
.voice-animate{
    width: 200px;
    height: 200px;
    background: rgb(84, 84, 84);
    border-radius: 10px;
    margin: auto;
    display: flex;
    padding: 20px;
    justify-content: center;
}
.voice-img{
    width: 50px;
    margin: 10px;
}
.imghua{

}
.bars{

}
</style>