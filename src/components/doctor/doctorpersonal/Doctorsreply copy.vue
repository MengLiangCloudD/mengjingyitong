<template>
    <div class="sdk" ref="sdk">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon">
                <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">{{name}}</span>
            </div>
        </div>
        <div class="contents">
            <div class="content"  v-for="(item,index) in neirong" :key="index">
                <div class="comment" v-if="item.type==1">
                    <div class="content1" >
                        <img src="./../../../assets/avatar.png" alt="" width="40px;" style="vertical-align: top;margin:0 15px;float: right;" />
                        <div class="send" v-if="item.ctxtype==0">
                            <p>{{item.content}}</p> 
                            <div class="arrow"></div>
                        </div>
                        <div class="send" :style="{width:item.len<=20?'25%':(item.len<=40?'35%':'45%')}" v-if="item.ctxtype==1" @click="playvoice(item,index)">
                            
                            <voiceanimate :isshow="index==currentindex?voicestate:'up'" rotationstate></voiceanimate>
                            <span>{{item.len}}''</span>
                            <div class="arrow"></div>
                        </div>
                        <div class="send" style="background:rgb(255,255,255);padding-right:0;text-align:right" v-if="item.ctxtype==2">
                            <img :class="'item'+index" @click="previewimage(item)"  :src="item.content" alt="" width="150">
                        </div>
                    </div> 
                </div>
                <div class="comment"  v-if="item.type==0">
                    <div class="content1">
                        <img src="./../../../assets/toux.png" alt="" width="40px;" style="vertical-align: top;margin:0 15px;" >
                        <div class="send1" v-if="item.ctxtype==0">
                            <p>{{item.content}}</p> 
                            <div class="arrow1"></div>
                        </div>
                        <div class="send1" :style="{width:item.len<=20?'25%':(item.len<=40?'35%':'50%')}" v-if="item.ctxtype==1" @click="playvoice(item,index)">
                            <span>{{item.len}}''</span>
                            <voiceanimate :isshow="index==currentindex?voicestate:'up'"></voiceanimate> 
                            <div class="arrow1"></div>
                        </div>
                        <div class="send1" style="background:rgb(255,255,255);padding-left:0;text-align:left" v-if="item.ctxtype==2">
                            <img @click="previewimage(item)" :src="item.content" alt="" width="150">
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer1">
                 <!-- 切换到语音 -->
                <span v-if="!toggleState" @click="toggle">
                   <Icon type="ios-mic-outline" size="35"/>
                </span>
                <!-- 点击切换到输入文字  -->
                <span v-if="toggleState" @click="toggle">
                   <Icon type="ios-keypad" size="35"/>
                </span>
                <!-- 输入文字 -->
                 <span v-if="!toggleState" class="inputbox"> 
                     <input v-model="value" placeholder="" style=" vertical-align: middle;" @blur.prevent="inputLoseFocus"/>
                </span> 
                <span v-if="!toggleState">
                    <Button type="info" @click="sendmsg(0,1)">发送</Button> 
                </span>
                <!-- 录入语音 -->
                <span class="inputvoice" v-if="toggleState" @touchstart.prevent="startvoice" @touchend="endvoice" style=" vertical-align: middle;display: inline-block; background: rgb(255, 255, 255);padding:8px 0;border-radius:5px;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;">按住说话</span>
                <!-- 视频 -->
                <a href="https://q.tenchong.com:3004/" v-if="!toggleState">
                    <Icon type="ios-videocam-outline" size="40"/>
                </a> 
                <!-- 上传图片 -->
                 <span @click="chooseimg" v-if="!toggleState">
                     <Icon type="md-image" size="40"/>
                 </span>
            </div>
        </div>
        <div class="mask" v-show="isShowVoiceAnimat">
            <div class="voice-animate">
                <div class="imghua">
                    <img class="voice-img" src="../../../assets/ic_record@2x.png" alt="">
                </div>
                <div class="bars">
                    <div class="bar" v-for="(item,index) in bars" :key="index" :style="{width:item.len+'px',height:'10px',background:item.color}"></div>
                </div>
            </div>
        </div>
        <audio ref="audio" src="" ></audio>
    </div>
</template>

<script>
import {websocket} from "../websocket.js"
import voiceanimate from "../../../common/voice"
    export default {
        // 数据结构，网络原理，组成原理
        components:{
            voiceanimate
        },
        data(){
            return {
                // 0 文本 1 语音 2图片
                startTime:"",
                endTime:"",
                currentindex:-1,
                endedstate:"",
                voicestate:"up",
                serverId:"",
                neirong:[
                    
                    {
                        content:"http://up_mp4.t57.cn/2018/1/03m/13/396131232171.m4a",
                        type:1,
                        ctxtype:1,
                        len:50
                    },
                    {
                        content:"https://www.w3school.com.cn/i/horse.mp3",
                        type:0,
                        ctxtype:1,
                        len:30
                    }
                ],
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
            inputLoseFocus(){
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    }, 100);
            },
            toggle(){
                this.toggleState=!this.toggleState
            },
            reply(type,value,len){
                let _this=this
                if(type==0){
                    this.neirong.push({
                        content:value,
                        type:0,
                        ctxtype:0
                    })
                    this.value=""
                }else if(type==1){
                        this.neirong.push({
                            content:value,
                            type:0,
                            ctxtype:1,
                            len:len
                        })
                }else{
                        this.neirong.push({
                            content:value,
                            type:0,
                            ctxtype:2
                        })
                }
            },
            sendmsg(type,type1){
                let _this=this
                if(type==0){
                    if(_this.value.trim()){
                        this.neirong.push({
                            content:_this.value,
                            type:type1,
                            ctxtype:0
                        })
                        window.websocketobj.send(JSON.stringify({content:_this.value,ctxtype:0})+"&2");
                        this.value=""
                    }
                }else if(type==1){
                    for(let i=0;i<this.localid.length;i++){
                        let time=Math.floor((_this.endTime-_this.startTime)/1000)
                        this.neirong.push({
                            content:this.localid[i],
                            type:type1,
                            ctxtype:1,
                            len:time
                        })
                        window.websocketobj.send(JSON.stringify({content:_this.localid[i],ctxtype:1})+"&2");
                    }
                }else{
                    for(let i=0;i<this.localid.length;i++){
                        this.neirong.push({
                            content:this.localid[i],
                            type:type1,
                            ctxtype:2
                        })
                        window.websocketobj.send(JSON.stringify({content:_this.localid[i],ctxtype:2})+"&2");
                    }
                }
                this.scrolBottome()
                // 发送信息到websocket
            },
            chooseimg(){
                let _this=this
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
                                var serverId = res.serverId; // 返回图片的服务器端ID
                                $.ajax({
                                    url:_this.$store.getters.getUrl+"down/downPic.do",
                                    type: "post",
                                    dataType: "json",
                                    async: false,
                                    data:{mediaId:serverId},
                                    success: function(data) {
                                        let imgpath=_this.$store.getters.getUrl+data.data.slice(1)
                                        _this.localid.push(imgpath)
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
                let time=new Date()
                this.startTime=time.getTime()
                this.isShowVoiceAnimat=true
                wx.startRecord();
            },
            //结束录音
            endvoice(){
                let _this=this
                this.isShowVoiceAnimat=false
                let time=new Date()
                _this.endTime=time.getTime()
                wx.stopRecord({
                    success: function (res) {
                        let localId = res.localId;
                        wx.uploadVoice({
                            localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                var serverId = res.serverId; // 返回音频的服务器端ID
                                _this.serverId=serverId
                                $.ajax({
                                    url:_this.$store.getters.getUrl+"down/downVoice.do",
                                    type: "post",
                                    dataType: "json",
                                    async: true,
                                    data:{mediaId:serverId},
                                    success: function(data) {
                                        //获取图片路径voicePath
                                        _this.localid=[]
                                        let voicePath=_this.$store.getters.getUrl+data.data.slice(1)
                                        _this.localid.push(voicePath)
                                        alert(voicePath)
                                        _this.sendmsg(1,1)
                                    },
                                    error: function(data) {
                                        
                                    }
                                });
                            }
                        });
                    }
                })
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
                clearInterval(timer)
                let timer=setInterval(function() {
                   _this.voicestate=states[statesindex] 
                   if(_this.$refs.audio.ended){
                        _this.voicestate="up"
                        clearInterval(timer)
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
                    let obj=JSON.parse(event.data)
                    _this.reply(obj.ctxtype,obj.content,obj.len)
                }
            },
            scrolBottome(){
                setTimeout(function() {
                    var container =document.getElementsByClassName("sdk")[0];
                    container.scrollTop=container.scrollHeight
                },200)
            }
        },
        created(){
            websocket("1")
            let _this=this
            this.initWebsocketOnmassage()
            this.setconfig()
            //语音动画
            _this.initVoiceAnimate()
        },
        mounted(){
            this.reply(1,"http://up_mp4.t57.cn/2018/1/03m/13/396131232171.m4a",50)
            this.reply(2,"http://www.baidu.com/img/bd_logo1.png")
            this.reply(0,"http://up_mp4.t57.cn/2018/1/03m/13/396131232171.m4a")
            let _this=this
            this.name = localStorage.getItem('ReplyName')
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
  position: fixed;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
  
  
}
.send {
    position:relative;
    background:#F8C301;
    border-radius:5px; /* 圆角 */
    margin: 0 1px;
    display: inline-block;
    word-wrap: break-word;
    word-break: break-all;
    padding:10px;
    float: right;
    max-width: 50%;
    font-size: 16px;
    color: rgb(255,255,255)
}
.send1{
    text-align: right;
    position:relative;
    background:#F8C301;
    border-radius:5px; /* 圆角 */
    /* margin:30px auto 0; */
    display: inline-block;
    word-wrap: break-word;
    word-break: break-all;
    max-width: 50%;
    padding:10px;
    font-size: 16px;
    color: rgb(255,255,255)
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
    height: 80px;
    position: fixed;
    bottom: 0;
    background: rgb(245, 245, 245);
    vertical-align:middle;
}
.footer1{
    text-align: center;
    margin-top: 10px;
    display: flex;
    align-items: center;
    /* padding: 10px 2%; */
    
}
.contents{
    margin-bottom: 80px;
    margin-top: 50px;
    flex:1;
}
.sdk{
    position: relative;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
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