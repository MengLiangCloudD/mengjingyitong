<template>
    <div class="writecheck-page">
        <!-- <div class="title">
            <div  @click="topath"  class="title-arrow-icon">
                <Icon  size="20" color="rgb(255,255,255)" type="ios-arrow-back"/>
            </div>
            <p>病历</p>
        </div> -->
        <div class="content" v-show="isshowcontent">
            <div class="item-wrapper">
                <div class="title-tip">
                    患者姓名:
                </div>
                <Input class="input" v-model="patientinname" disabled/>
            </div>
            <div class="item-wrapper" @click="showinput('illnessdesc','主诉')">
                <div class="title-tip">
                    主诉:
                </div>
                <Input class="input" v-model="form.illnessdesc"  @on-blur.prevent="inputLoseFocus" disabled/>
            </div>
            <div class="item-wrapper" @click="showinput('anamnesis','既往史')">
                <div class="title-tip">
                    既往史:
                </div>
                <Input class="input" v-model="form.anamnesis"  @on-blur.prevent="inputLoseFocus" disabled/>
            </div>
            <div class="item-wrapper" @click="showinput('maternity','婚孕史')">
                <div class="title-tip">
                    婚孕史:
                </div>
                <Input class="input" v-model="form.maternity"  @on-blur.prevent="inputLoseFocus" disabled/>
            </div>
            <!-- <div class="item-wrapper">
                <div class="title-tip">
                    婚姻:
                </div>
                <Select v-model="form.marrital" placeholder=''>
                    <Option value="已婚">已婚</Option>
                    <Option value="未婚">未婚</Option>
                </Select>
            </div> -->
            <div class="item-wrapper" @click="showinput('menses','月经史')">
                <div class="title-tip">
                    月经史:
                </div>
                <Input class="input" v-model="form.menses"  @on-blur.prevent="inputLoseFocus" disabled/>
            </div>
            <div class="item-wrapper" @click="showinput('individual','过敏史')">
                <div class="title-tip">
                    过敏史:
                </div>
                <Input class="input" style="border:none" v-model="form.individual"  @on-blur.prevent="inputLoseFocus" disabled/>
            </div>
            <div class="item-wrapper" @click="showinput('familyall','家族史')">
                <div class="title-tip">
                    家族史:
                </div>
                <Input class="input" v-model="form.familyall"  @on-blur.prevent="inputLoseFocus" disabled/>
            </div>
            <div class="item-wrapper" @click="showinput('medhistory','现病史')">
                <div class="title-tip">
                    现病史:
                </div>
                <Input class="input" v-model="form.medhistory"   @on-blur.prevent="inputLoseFocus" disabled/>
            </div>
            <div class="item-wrapper" @click="showinput('operationrecord','处理')">
                <div class="title-tip">
                    处理:
                </div>
                <Input class="input" v-model="form.operationrecord" @on-blur.prevent="inputLoseFocus" disabled/>
            </div>
            <!-- <div class="item-wrapper" @click="showinput('bodyexam','查体')">
                <div class="title-tip" >
                    查体:
                </div>
                <Input class="input" v-model="form.bodyexam"  @on-blur.prevent="inputLoseFocus" disabled />
            </div> -->
            <!-- <div class="item-wrapper" @click="showinput('medicalrecord','辅助检查')">
                <div class="title-tip">
                    辅助检查:
                </div>
                <Input class="input" v-model="form.medicalrecord"  @on-blur.prevent="inputLoseFocus" disabled/>
            </div> -->
            <div class="item-wrapper" @click="showinput('diagdesc','诊断')">
                <div class="title-tip">
                    诊断:
                </div>
                <Input class="input" v-model="form.diagdesc"  @on-blur.prevent="inputLoseFocus" disabled/>
            </div>
            <!-- <div class="item-wrapper" @click="showinput('advice','建议')">
                <div class="title-tip">
                    建议:
                </div>
                <Input class="input" v-model="form.advice"  @on-blur.prevent="inputLoseFocus" disabled/>
            </div> -->
            <div class="item-wrapper" @click="showinput('memo','备注')">
                <div class="title-tip">
                    备注:
                </div>
                <Input class="input" v-model="form.memo"  @on-blur.prevent="inputLoseFocus" disabled/>
            </div>
            <!-- <div class="item-wrapper">
                <div class="title-tip">
                    医生:
                </div>
                <Input class="input" v-model="form.doctor" disabled  @on-blur.prevent="inputLoseFocus"/>
            </div> -->
        </div>
        <div>
            <div :style="{opacity: opacity}" @touchstart='touchstart' @touchend='touchend'  @click="issubmit('formValidate')"   class="primarybtn">
                {{ysrecordstate==1?'提交':'修改病历'}}
            </div>
        </div>
        <Modal
            v-model="isshowinput"
            :title="modalcurrentvalue"
            :closable=false
            fullscreen
            @on-ok="changeisshowcontent"
            @on-cancel="changeisshowcontent"
        >
            <!-- <div class="content"> -->
            <Form ref="formValidate" :model="form" :rules="ruleValidate" >
                <FormItem  prop="patientinname" v-show="currentvalue=='patientinname'">
                    <Input v-model="patientinname" disabled/>
                </FormItem>
                <FormItem   prop="illnessdesc" v-show="currentvalue=='illnessdesc'">
                    <Input v-model="form.illnessdesc" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus" />
                </FormItem>
                <FormItem   prop="anamnesis" v-show="currentvalue=='anamnesis'">
                    <Input v-model="form.anamnesis" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem  prop="maternity" v-show="currentvalue=='maternity'">
                    <Input v-model="form.maternity" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem prop="marrital" v-show="currentvalue=='marrital'">
                    <Select v-model="form.marrital">
                        <Option value="已婚">已婚</Option>
                        <Option value="未婚">未婚</Option>
                    </Select>
                </FormItem>
                <FormItem   prop="menses" v-show="currentvalue=='menses'">
                    <Input v-model="form.menses" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem  prop="individual" v-show="currentvalue=='individual'">
                    <Input v-model="form.individual" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem   prop="familyall" v-show="currentvalue=='familyall'">
                    <Input v-model="form.familyall" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem   prop="medhistory" v-show="currentvalue=='medhistory'">
                    <Input v-model="form.medhistory" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem   prop="operationrecord" v-show="currentvalue=='operationrecord'">
                    <Input v-model="form.operationrecord" type="textarea" :autosize="inputsize " @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem  prop="bodyexam" v-show="currentvalue=='bodyexam'">
                    <Input v-model="form.bodyexam" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem   prop="medicalrecord" v-show="currentvalue=='medicalrecord'">
                    <Input v-model="form.medicalrecord" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem  prop="diagdesc" v-show="currentvalue=='diagdesc'">
                    <Input v-model="form.diagdesc" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem  prop="advice" v-show="currentvalue=='advice'">
                    <Input v-model="form.advice" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem   prop="memo" v-show="currentvalue=='memo'">
                    <Input v-model="form.memo" type="textarea" :autosize="inputsize"  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
                <FormItem   prop="doctor" v-show="currentvalue=='doctor'">
                    <Input v-model="form.doctor" disabled  @on-blur.prevent="inputLoseFocus"/>
                </FormItem>
            </Form>
        <!-- </div> -->
        </Modal>
        <Modal
            v-model="questmodel"
            title="提示">
            {{infomsg}}
        </Modal>
        <Modal
            v-model="modal1"
            title="提示">
            请填写诊断！
        </Modal>
        <Modal
            v-model="issubmitstate"
            title="提示"
            @on-ok="submit('formValidate')"
            >
            请确认是否提交！
        </Modal>
        <loading v-show="isshowloading"></loading>
    </div>
</template>

<script>
    import loading from '../../common/loading'
    import xss from 'xss'
    export default {
        components:{
            loading
        },
        data(){
            return{
                infomsg:"",
                questmodel:false,
                isshowcontent:true,
                issubmitstate:false,
                isshowloading:false,
                ysrecordstate:1,
                btnvalue:'提交',
                modalcurrentvalue:"",
                currentvalue:'',
                isshowinput:false,
                // tradeno:'',
                modal1:false,
                inputsize:{ minRows: 8, maxRows: 8 },
                littleinputsize:{minRows: 3, maxRows: 3},
                opacity:1,
                value11:'',
                marry:'',
                form:{
                    cardno: "",//卡号
                    visitdate: "",//就诊时间
                    visitno:' ',//就诊号
                    illnessdesc: "",//主诉
                    anamnesis:'',//既往史
                    familyall: "",//家族史
                    marrital:"",//婚姻
                    individual:"",//过敏史
                    menses:"",//月经史
                    medhistory:'',//现病史
                    bodyexam:"",//查体
                    diagdesc:"",//诊断
                    advice:"",//建议
                    doctor: "",//医生
                    ordinal:"1",//病历序号
                    operationrecord:"",//处理
                    medicalrecord:"",//辅助检查
                    doctorno:"",//医生编码
                    memo:"",//备注
                    maternity:"",//婚孕史
                },
                ruleValidate:{
                    illnessdesc: [
                        { type: 'string', max: 100, message: '主诉不能多于100个字', trigger: 'change' }
                    ],
                    anamnesis: [
                        { type: 'string', max: 100, message: '既往史不能多于100个字', trigger: 'change' }
                    ],
                    maternity: [
                        { type: 'string', max: 40, message: '婚孕史不能多于40个字', trigger: 'change' }
                    ],
                    marrital: [
                        { type: 'string', max: 2, message: '婚姻不能多于2个字', trigger: 'change' }
                    ],
                    menses: [
                        { type: 'string', max: 40, message: '月经史不能多于40个字', trigger: 'change' }
                    ],
                    individual: [
                        { type: 'string', max: 40, message: '过敏史不能多于40个字', trigger: 'change' }
                    ],
                    familyall: [
                        { type: 'string', max: 40, message: '主诉不能多于40个字', trigger: 'change' }
                    ],
                    medhistory: [
                        { type: 'string', max: 1000, message: '现病史不能多于1000个字', trigger: 'change' }
                    ],
                    operationrecord: [
                        { type: 'string', max: 1000, message: '处理不能多于1000个字', trigger: 'change' }
                    ],
                    bodyexam: [
                        { type: 'string', max: 500, message: '主诉不能多于500个字', trigger: 'change' }
                    ],
                    medicalrecord: [
                        { type: 'string', max: 1000, message: '辅助检查不能多于1000个字', trigger: 'change' }
                    ],
                    diagdesc: [
                        { type: 'string', max: 80, message: '诊断不能多于80个字', trigger: 'change' }
                    ],
                    advice: [
                        { type: 'string', max: 80, message: '建议不能多于80个字', trigger: 'change' }
                    ],
                    memo: [
                        { type: 'string', max: 80, message: '备注不能多于80个字', trigger: 'change' }
                    ],
                    doctor: [
                        { type: 'string', max: 80, message: '备注不能多于80个字', trigger: 'change' }
                    ],
                },
                patientinname:''
            }
        },
        methods:{
            issubmit(){
                this.issubmitstate=true
            },
            changeisshowcontent(){
                this.isshowcontent=true
            },
            showinput(value,tip){
                this.isshowcontent=false
                this.focusstate=false
                this.isshowinput=true
                this.currentvalue=value
                this.modalcurrentvalue=tip
            },
            //弹出键盘问题
            inputLoseFocus() {
                setTimeout(() => {
                window.scrollTo(0, 0);
                }, 100);
            },
            touchstart(){
                this.opacity=0.5
            },
            touchend(){
                this.opacity=1
            },
            topath(){
                this.$router.push('/registeredlist')
            },
            editinsert(data){
                let _this=this
                if(data.diagdesc==""){
                    this.modal1=true
                    return
                }
                let url=_this.$store.getters.getUrl+'medicalrecord/updatemedicalrecord.do'
                _this.isshowloading=true
                var cardno = data.cardno;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: false,
                    data:{
                        cardno: xss(data.cardno),//卡号
                        visitno:data.visitno,//就诊号
                        illnessdesc:data.illnessdesc,//主诉
                        anamnesis:data.anamnesis,//既往史
                        familyall:data.familyall,//家族史
                        marrital:data.marrital,//婚姻
                        individual:data.individual,//过敏史
                        menses:data.menses,//月经史
                        medhistory:data.medhistory,//现病史
                        bodyexam:data.bodyexam,//查体
                        diagdesc:data.diagdesc,//诊断
                        advice:data.advice,//建议
                        operationrecord:data.operationrecord,//处理
                        medicalrecord:data.medicalrecord,//辅助检查
                        memo:data.memo,//备注
                        maternity:data.maternity,//婚孕史
                    },
                    success: function(data) {
                        _this.isshowloading=false
                        if(data.status=='1'){
                            _this.$Message.info('修改成功！')
                            window.websocketobj.send(JSON.stringify({cardno:_this.form.cardno,massege:'123'}))
                        }else{
                            _this.questmodel=true
                            _this.infomsg="修改病历失败！"
                        }
                    },
                    error: function(data) {
                            _this.isshowloading=false
                            _this.questmodel=true
                            _this.infomsg="请求发送失败失败！"
                    }
                });
            },
            insert(data){
                // return
                let _this=this
                let url=_this.$store.getters.getUrl+'medicalrecord/insertmedicalrecord.do'
                if(data.diagdesc==""){
                    this.modal1=true
                    return
                }
                this.isshowloading=true
                var cardno = data.cardno;
                var data1 = {
                        // tradeno:_this.tradeno,
                        cardno: data.cardno,//卡号
                        visitdate: data.visitdate,//就诊时间
                        visitno:data.visitno,//就诊号
                        illnessdesc: data.illnessdesc,//主诉
                        anamnesis:data.anamnesis,//既往史
                        familyall:data.familyall,//家族史
                        marrital:data.marrital,//婚姻
                        individual:data.individual,//过敏史
                        menses:data.menses,//月经史
                        medhistory:data.medhistory,//现病史
                        bodyexam:data.bodyexam,//查体
                        diagdesc:data.diagdesc,//诊断
                        advice:data.advice,//建议
                        doctor: data.doctor,//医生
                        ordinal:"1",//病历序号
                        operationrecord:data.operationrecord,//处理
                        medicalrecord:data.medicalrecord,//辅助检查
                        doctorno:data.doctor,//医生编码
                        memo:data.memo,//备注
                        maternity:data.maternity//婚孕史
                    }
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: false,
                    contentType: 'application/json',
                    data:JSON.stringify(data1),
                    success: function(data) {
                        _this.isshowloading=false
                        if(data.status=="1"){
                            _this.$Message.info('病历提交成功');
                            localStorage.setItem('ysrecordstate',5)
                            _this.ysrecordstate=5
                            window.websocketobj.send(JSON.stringify({cardno:_this.form.cardno,massege:'123'}))
                        }else{
                            _this.questmodel=true
                            _this.infomsg="病历提交失败！"
                        }
                    },
                    error: function(data) {
                        _this.isshowloading=false
                        _this.questmodel=true
                        _this.infomsg="请求发送失败失败！"
                    }
                });
            },
            submit(name){
                this.issubmitstate=false
                let now=new Date();
                let y = now.getFullYear();
                let m = now.getMonth() + 1;
                let d = now.getDate();
                if(m<10){
                    m='0'+m
                }
                if(d<10){
                    d="0"+d
                }
                this.form.visitdate=y+'-'+m+'-'+d;
                this.$refs[name].validate((valid) => {
                        if (valid) {
                            if(localStorage.getItem('ysrecordstate')==1){
                                this.insert(this.form);
                            }else{
                                this.editinsert(this.form);
                            }
                        } 
                        
                    })
            },
            async unrecord(){
                let _this=this
                var data  =JSON.parse(localStorage.getItem('yspatientinfo'))
                this.form.docName=data.hosdocname//申请医生
                this.form.doctorno=data.doctor//申请医生编码
                this.form.doctor=data.hosdocname//申请科室
                // this.tradeno=data.tradeno
                const MedicalLast=await this.fetchMegetMedicalLast()
                if(MedicalLast.status=="1"){
                    let _MedicalLast=MedicalLast.data[0]
                    if(_MedicalLast.medhistory){
                            this.form.medhistory=_MedicalLast.medhistory
                        }else{
                            this.form.medhistory=''
                        }
                        if(_MedicalLast.anamnesis){
                            this.form.anamnesis=_MedicalLast.anamnesis
                        }else{
                            this.form.anamnesis=''
                        }
                        if(_MedicalLast.individual){
                            this.form.individual=_MedicalLast.individual
                        }else{
                            this.form.individual=''
                        }
                        if(_MedicalLast.menses){
                            this.form.menses=_MedicalLast.menses
                        }else{
                            this.form.menses=''
                        }if(_MedicalLast.familyill){
                             this.form.familyall=_MedicalLast.familyill
                        }else{
                            this.form.familyall='';
                        }
                       
                    }else if(MedicalLast.status==5){
                        _this.questmodel=true
                        _this.infomsg="请求发送失败"
                    }else if(MedicalLast.status=="0"){
                    }else{
                        _this.questmodel=true
                        _this.infomsg="获取病史系统异常"
                    }
            },
            getcurrentdayrecord(){
                let _this = this;
                const yspatientinfo=JSON.parse(localStorage.getItem("yspatientinfo"));
                let patientid=yspatientinfo.patientid
                let visitno=yspatientinfo.visitno
                let now=new Date();
                let y = now.getFullYear();
                let m = now.getMonth() + 1;
                let d = now.getDate();
                if(m<10){
                    m='0'+m
                }
                if(d<10){
                    d="0"+d
                }
                let visitdate=y+'-'+m+'-'+d;
                let doccode=yspatientinfo.doctor
                
                let url =_this.$store.getters.getUrl + "medicalrecord/getthesamedayoutpmr.do";
                    let ajaxTimeOut =$.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    timeout: 15000, //通过timeout属性，设置超时时间
                    async: true,
                    data: { patientid,visitdate,doccode,visitno },
                    success: function(data) {
                        _this.isshowloading=false
                        if(data.status=="1"){
                            _this.ysrecordstate=5
                            localStorage.setItem('ysrecordstate',5)
                            let recordinfo=data.data[0]
                            for(var item in recordinfo){
                                for(var foritem in _this.form){
                                    if(item==foritem){
                                        _this.form[foritem]=recordinfo[item]
                                    }else if(item=='maternitl'){
                                        _this.form.maternity=recordinfo.maternitl
                                    }else if(item=='familyill'){
                                        _this.form.familyall=recordinfo.familyill
                                    }else if(item=='openrationrecord'){
                                        _this.form.operationrecord=recordinfo.openrationrecord
                                    }else if(item=='bodymeax'){
                                        _this.form.bodyexam=recordinfo.bodymeax
                                    }
                                }
                            }
                        }else if(data.status=="0"){
                            _this.ysrecordstate=1
                            localStorage.setItem('ysrecordstate',1)
                            _this.unrecord()
                        }else if(data.status==-1){
                            _this.$router.push("/abnormal");
                        }else{
                            _this.infomsg="病历获取系统异常"
                            _this.questmodel=true
                        }
                        
                    },
                    error: function(data) {
                            _this.isshowloading=false
                            _this.infomsg="请求发送失败"
                            _this.questmodel=true
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
                },
            fetchMegetMedicalLast(){
                return new Promise((resolve,reject)=>{
                    let _this = this;
                    const yspatientinfo=JSON.parse(localStorage.getItem("yspatientinfo"));
                    let cardno=yspatientinfo.patientid
                    let url =_this.$store.getters.getUrl + "medicalrecord/MegetMedicalLast.do";
                    _this.isshowloading=true
                    let ajaxTimeOut =$.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: true,
                        timeout: 15000, //通过timeout属性，设置超时时间
                        data: {cardno},
                        success: function(data) {
                            _this.isshowloading=false
                            resolve(data)
                        },
                        error: function(data) {
                            
                            _this.isshowloading=false
                            let _data={status:5}
                            resolve(_data)
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
                })
            },
            async init(){
                // this.ysrecordstate=localStorage.getItem('ysrecordstate')
                // let state=this.ysrecordstate
                let patientinfo=localStorage.getItem('yspatientinfo')
                let data=JSON.parse(patientinfo)
                this.patientinname=data.name//患者姓名
                this.form.cardno=data.patientid//患者卡号
                this.form.visitno=data.visitno
                this.getcurrentdayrecord()
            },
        },
        mounted(){
            let _this=this
            setTimeout(function(){
                _this.init()
            },10)
            
        },
    }
</script>

<style scoped>

.writecheck-page{
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
}
.title{
    background: rgb(0,187,187);
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: white;
}
.title-arrow-icon{
  position: absolute;
  left: 0px;
  top: 0px;
  height: 50px;
  width:50px;
}
.content{
    padding-left: 0px;
    flex:1;
    /* overflow: auto; */
}
/* .item-wrapper{
    display: flex;
    align-items: center;
} */
.item-wrapper{
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
    padding-right: 5px;
}
.title-tip{
    width: 80px;
    color:rgb(81, 90, 110)
}
.text-area{
    align-self:flex-start;
    margin: 10px 0;
}
.input-item{
    margin: 10px 0;
}
.project-name{
    display: block;

}
.Checkbox{
    display: block;
}
.primarybtn{
    background: rgb(0,187,187);
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    color: rgb(255,255,255);
}
.primarybtn :active{
    background: rgb(182, 152, 17);
}
.content .input >>> .ivu-input :focus{
    border: 1px solid #ffffff;
    background: #ffffff;
    outline: none;
}
.content >>> .ivu-input{
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
}
.content .input >>> .ivu-input{
    border: 1px solid #ffffff;
    background: #ffffff;
    outline: none;
    
}
.content >>> .ivu-select-selection{
    border: 1px solid #ffffff;
    box-shadow: none;
}
.content >>> .select-selection:hover {
    border-color: #ffffff;
    box-shadow: none;
}
</style>