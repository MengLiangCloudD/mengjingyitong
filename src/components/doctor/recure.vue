<template>
    <div class="recure">
        <div class="header-title">
          产后评估
          <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
          </div>
        </div>
        <!-- 项目 -->
        <div class="wrapper">
            <div class="title">项目名称</div>
            <div class="contaniner">
                <Select v-model="itemname" @on-change="changeoption">
                    <Option v-for="item in itemslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </div>
        <!-- 评估内容 -->
        <div class="wrapper">
            <div class="title">评估内容</div>
            <div class="contaniner">
                <CheckboxGroup v-model="checkAllGroup" @on-change="changeCheckboxGroup">
                    <Checkbox v-for="(item,index) in inititem.evals" :key="index" :label="item.evalContext" style="display:block"></Checkbox>
                </CheckboxGroup>
            </div>
        </div>
        <!-- 主管医生处理原则 -->
        <div class="wrapper">
            <div class="title">主管医生处理原则</div>
                <div class="contaniner">
                    <Select v-model="textname" multiple >
                        <Option v-for="item in currentHandlers" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
        <!--评估时间-->
        <div class="wrapper">
            <div class="title">选择评估时间</div>
             <div class="contaniner">
                <Select v-model="time" @on-change="selectAssTime">
                    <Option v-for="item in timelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </div>
        <!-- 出院前评估 -->
        <div class="wrapper">
            <!-- 功能保健 -->
            <div class="contaniner" v-if="radio!=''">
                <div class="pinggu" v-for="(item,index) in currentAssessContextsList" :key="index">
                    <div class="itemname">
                        <div>{{item.name}}</div>
                    </div>
                    <RadioGroup v-model="item.result" class="radiogroup" >
                        <Radio class="radio" v-for="(radioitem,index) in  item.ass[radio]" :key="index" :label="radioitem"></Radio>
                    </RadioGroup>
                </div>
                
            </div>
            <!-- 其他 -->
            <!-- <div class="contaniner" v-if="inititem.isshow">
                <RadioGroup v-model="result">
                    <Radio v-for="(item,index) in inititem.testlist" :key="index" :label="item"></Radio>
                </RadioGroup>
            </div> -->
        </div>
        <div class="wrapper">
            <div class="btnwrapper">
                <div class="btn" @click="submit">提交评估</div>
            </div>
        </div>
        <loading v-show="isshowloading"></loading>
    </div>
</template>

<script>
import loading from "../../common/loading.vue"
import {getEvaluateContent,submitEvaluate} from "./js/recure"
export default {
    data(){
        return{
            isshowloading:false,
            radio:"",
            time:"",
            timelist:[
                {
                    value: '出院前评估',
                    label: '出院前评估'
                },
                {
                    value: '产后7天评估',
                    label: '产后7天评估'
                },
                {
                    value: '产后14天评估',
                    label: '产后14天评估'
                },
                {
                    value: '产后28天,42天评估',
                    label: '产后28天,42天评估'
                }
            ],
            itemname:"",//项目名称
            textname:"",//处理原则
            checkAllGroup:[],//评估内容
            result:"",//评估结果
            itemslist:[
                {
                    value: '重症急救',
                    label: '重症急救'
                },
                {
                    value: '疾病治疗',
                    label: '疾病治疗'
                },
                {
                    value: '损伤康复',
                    label: '损伤康复'
                },
                {
                    value: '功能保健',
                    label: '功能保健'
                },
                {
                    value: '保健预防',
                    label: '保健预防'
                }
            ],
            currentHandlers:[],
            currentAssessContextsList:[],
            currentAss:[],
            inititem:{},
            isinititem:{},
            _excel:[],
            indexExcel:[]
        }
    },
    components:{
        loading
    },
    methods:{
        tobackdetail(){
            history.go(-1)
        },
        selectAssTime(value){
            if(value=="出院前评估"){
                this.radio="leavHosBefPg"
            }else if(value=="产后7天评估"){
                this.radio="leavHosBefPg"
            }else if(value=="产后14天评估"){
                this.radio="chailAftFourteen"
            }else{
                this.radio="chailAftTwentyEight"
            }
        },
        changeoption(value){
            this.radio=""
            let inititem=this._excel.findIndex(function(item){return item.itemname==value})
            let _this=this
            this._excel.forEach(item=>{
                if(item.itemName==value){
                    _this.inititem=item
                    _this.currentHandlers=[]
                    item.handlers.forEach(item=>{
                        _this.currentHandlers.push({
                            value:item.handlerContext,
                            label:item.handlerContext
                        })
                    })
                }
            })
            
            this.checkAllGroup=[]
            this.result=""
            this.textname=""
        },
        changeCheckboxGroup(value){
            let _this=this
            _this.currentAssessContextsList=[]
            console.log(this.inititem.evals)
            this.inititem.evals.forEach(item=>{
                if(value.indexOf(item.evalContext)>-1){
                    _this.currentAssessContextsList.push({name:item.evalContext,ass:item.assessContexts})
                }
            })
        },

        objDuplicateRemoval(arr,newItem,type){
                let selectArr=["evalContext","handlerContext"]
                let test=selectArr[type]
                let handle=true
                arr.forEach(item=>{
                    if(item[test]==newItem[test]){
                        handle=false
                    }
                })
                if(!handle){
                    return false
                }else{
                    return true
                }
        },
        addAssessContexts(assessContexts){
            let indexExcel=this.indexExcel
            let _this=this
             assessContexts.forEach(function(item){
                const index=indexExcel.indexOf(item.itemCode)
                for(let i=0;i<_this._excel[index].evals.length;i++){
                        if(_this._excel[index].evals[i].evalCode==item.evalCode){
                            if(_this._excel[index].evals[i].hasOwnProperty("assessContexts")){
                                _this._excel[index].evals[i].assessContexts.leavHosBefPg.push(item.leavHosBefPg)
                                _this._excel[index].evals[i].assessContexts.chailAftFourteen.push(item.chailAftFourteen)
                                _this._excel[index].evals[i].assessContexts.chailAftTwentyEight.push(item.chailAftTwentyEight)
                                _this._excel[index].evals[i].assessContexts.chailAftSenven.push(item.chailAftSenven)
                            }else{
                                _this._excel[index].evals[i].assessContexts={}
                                _this._excel[index].evals[i].assessContexts.leavHosBefPg=[]
                                _this._excel[index].evals[i].assessContexts.chailAftFourteen=[]
                                _this._excel[index].evals[i].assessContexts.chailAftTwentyEight=[]
                                _this._excel[index].evals[i].assessContexts.chailAftSenven=[]
                                _this._excel[index].evals[i].assessContexts.leavHosBefPg.push(item.leavHosBefPg)
                                _this._excel[index].evals[i].assessContexts.chailAftFourteen.push(item.chailAftFourteen)
                                _this._excel[index].evals[i].assessContexts.chailAftTwentyEight.push(item.chailAftTwentyEight)
                                _this._excel[index].evals[i].assessContexts.chailAftSenven.push(item.chailAftSenven)
                            }
                    }
                }
                
            });
        },
        addHandlers(handlers){
            let indexExcel=this.indexExcel
            let _this=this
            handlers.forEach(function(item){
                const index=indexExcel.indexOf(item.itemCode)
                if(_this._excel[index].handlers.length>0){
                    const res=_this.objDuplicateRemoval(_this._excel[index].handlers,item,1)
                    if(res){
                        _this._excel[index].handlers.push(item) 
                    }
                }else{
                   _this._excel[index].handlers.push(item) 
                }
            });
        },
        addEvals(evals){
            let indexExcel=this.indexExcel
            let _this=this
            evals.forEach(function(item){
                const index=indexExcel.indexOf(item.itemCode)
                if(_this._excel[index].evals.length>0){
                    const res=_this.objDuplicateRemoval(_this._excel[index].evals,item,0)
                    if(res){
                        _this._excel[index].evals.push(item) 
                    }
                }else{
                   _this._excel[index].evals.push(item) 
                }
            });
        },
        getItems(data){
            let Items=data.items
            this._excel=[]
            this.itemslist=[]
            for(let i=0;i<Items.length;i++) {
                this._excel.push({
                        itemName:Items[i].itemName,
                        itemCode:Items[i].itemCode,
                        evals:[],
                        handlers:[]
                    })
                this.indexExcel.push(Items[i].itemCode)
                this.itemslist.push({
                    value:Items[i].itemName,
                    label:Items[i].itemName
                })
            }
        },
        async getEvaluateContent(){
            this.isshowloading=true
            let url=this.$store.getters.getUrl+'DoctorAfterChildbirthEval/items.do'
            let result
            try{
                
                result=await getEvaluateContent(url)
            }catch(e){
                console.log(e)
                this.isshowloading=false
            }
            
            // localStorage.setItem("data",JSON.stringify(result))
            // let result=JSON.parse(localStorage.getItem("data"))
            this.getItems(result)
            this.addEvals(result.eval)
            this.addHandlers(result.handlers)
            this.addAssessContexts(result.assessContexts)
            this.isshowloading=false
            console.log(this._excel)
        },
        async submit(){
            let url=this.$store.getters.getUrl+'DoctorAfterChildbirthEval/addDoctorEval.do'
            let _leavHosBefPg=''
            let arr=this.currentAssessContextsList
            console.log(typeof this.time)
            console.log(this.time=="出院前评估")
            let data={
                itemName:this.itemname,
                evalContext:this.checkAllGroup,
                handlerContext:this.textname,
                leavHosBefPg:"",
                chailAftSeven:"",
                chailAftFourteen:"",
                chailAftTwentyEight:"",
                doctorCode:456,
                cardno:123
            }
            let timeAttribut=""
            if(this.time=="出院前评估"){
                timeAttribut="leavHosBefPg"
            }else if(this.time=="产后7天评估"){
                timeAttribut="chailAftSeven"
            }else if(this.time=="产后14天评估"){
                timeAttribut="chailAftFourteen"
            }else{
                timeAttribut="chailAftTwentyEight"
            }
            for (let i = 0; i < this.currentAssessContextsList.length; i++) {
                console.log(this.currentAssessContextsList)
                _leavHosBefPg+=this.currentAssessContextsList[i].result+","
            }
            data[timeAttribut]=_leavHosBefPg.slice(0,_leavHosBefPg.length-1)
            
            const res=await submitEvaluate(data,url)
            this.$router.push("/doctorckeck")
            console.log(data)
        }
    },
    created(){
        this.getEvaluateContent()
    }
}
</script>

<style scoped>
.recure{
    height: 100%;
    overflow: auto;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.header-title {
  background: rgb(0, 187, 187);
  font-size: 20px;
  color: white;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: relative;
  margin-bottom: 20px;
}
.wrapper{
    margin-bottom: 5px;
}
.title{
    font-size: 16px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: rgb(255,255,255);
    background: rgb(0, 187, 187);
}
.contaniner{
    padding: 10px;
}
.btnwrapper{
    display: flex;
    justify-content: center;
    margin: 20px 0;

}
.btn{
    height: 40px;
    width: 200px;
    background: rgb(0, 187, 187);
    line-height: 40px;
    text-align: center;
    color: rgb(255,255,255);
    border-radius: 20px;
    font-size: 16px;
}
.pinggu{
    display: flex;
}
.pinggu .itemname{
    border: 1px solid #c5c8ce;
    display: flex;
    align-items: center;
    padding: 5px;
    width: 100px;
}
.pinggu .itemname>div{

}
.radiogroup{
    flex: 1;
    border-right: 1px solid #c5c8ce;
    border-top: 1px solid #c5c8ce;
}
.radio{
    display: block;
    border-bottom: 1px solid #c5c8ce;
    margin: 0;
    padding: 5px;
}
.ys>div{
    border: 1px solid #c5c8ce;
    border-radius: 5px;
    padding: 5px;
    margin: 5px 0;
}
</style>