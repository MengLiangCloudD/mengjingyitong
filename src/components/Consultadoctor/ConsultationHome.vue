<template>
    <div  style="height: 100%;overflow: auto;padding-bottom:50px;">
        <div class="tittle" style="background: #28b8a1;color:white">
            咨询医生
            <div class="tong" @click="godoctorList()">
                <svg t="1566434472560" class="icon" viewBox="0 0 1038 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4082" width="30" height="30"><path d="M515.683453 360.978417c-29.467626 0-58.935252 22.100719-58.935252 58.935252v36.834532c0 36.834532 29.467626 58.935252 58.935252 58.935252s58.935252-22.100719 58.935252-58.935252v-36.834532c0-29.467626-29.467626-58.935252-58.935252-58.935252z" fill="#ffffff" p-id="4083"></path><path d="M1038.733813 0H0v839.827338h324.143885c7.366906 0 7.366906 0 14.733813 7.366907L515.683453 1024l176.805756-176.805755c7.366906-7.366906 7.366906-7.366906 14.733813-7.366907h331.510791V0zM957.697842 766.158273c0 44.201439 44.201439 0 0 0H663.021583l-154.705036 154.705036H515.683453l-154.705036-154.705036H73.669065c-44.201439 0 0 44.201439 0 0V81.035971 73.669065h884.028777v692.489208z" fill="#ffffff" p-id="4084"></path><path d="M287.309353 360.978417c-29.467626 0-58.935252 22.100719-58.935252 58.935252v36.834532c0 36.834532 22.100719 58.935252 58.935252 58.935252 29.467626 0 58.935252-22.100719 58.935251-58.935252v-36.834532c0-29.467626-29.467626-58.935252-58.935251-58.935252zM744.057554 360.978417c-29.467626 0-58.935252 22.100719-58.935252 58.935252v36.834532c0 36.834532 29.467626 58.935252 58.935252 58.935252s58.935252-22.100719 58.935252-58.935252v-36.834532c0-29.467626-22.100719-58.935252-58.935252-58.935252z" fill="#ffffff" p-id="4085"></path></svg>
            </div>
        </div>
        <div class="content">
            <p style="text-align: left;font-size:22px;padding: 10px 5%;padding-left:5%;font-weight: 900">全部科室</p>
            <!-- <div class="content1" >
                 <div class="Ninthpalace" v-for="(item,index) in doctorType" :key="index" @click="clickdocto(index)">
                     <svg t="1566376948291" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4462" width="40" height="40"><path d="M819.2 556.8 819.2 556.8c9.6-32 19.2-64 25.6-89.6 16-86.4-3.2-131.2-12.8-169.6-12.8-38.4-51.2-76.8-73.6-96-22.4-19.2-67.2-19.2-76.8-19.2-6.4 0-12.8-12.8-25.6-12.8s-12.8 12.8-12.8 12.8-12.8-6.4-25.6-25.6S601.6 128 563.2 89.6s-80-41.6-140.8-41.6S316.8 64 259.2 99.2 204.8 172.8 195.2 192C185.6 211.2 185.6 243.2 188.8 256 192 268.8 182.4 278.4 172.8 294.4 163.2 310.4 150.4 320 140.8 332.8c-9.6 9.6-6.4 22.4 0 25.6C150.4 364.8 153.6 368 160 371.2c6.4 3.2 0 12.8-3.2 16s-3.2 16 0 19.2c6.4 6.4 0 12.8 0 19.2s0 12.8 6.4 16 6.4 16 3.2 28.8 0 25.6 9.6 38.4c9.6 9.6 32 6.4 44.8 6.4s41.6 3.2 54.4 6.4c6.4 0 16 38.4 25.6 54.4 6.4 16 16 38.4 25.6 51.2s19.2 32 19.2 44.8c0 9.6-35.2 73.6-67.2 118.4-28.8 48-51.2 76.8-64 99.2-9.6 12.8 92.8 89.6 268.8 89.6 54.4 0 96-3.2 128-12.8 22.4 6.4 48 12.8 73.6 12.8 128 0 233.6-105.6 233.6-233.6C915.2 668.8 876.8 598.4 819.2 556.8zM569.6 428.8c12.8-9.6 28.8-25.6 48-54.4C633.6 348.8 640 326.4 640 304c-3.2-19.2-6.4-48 0-54.4C646.4 236.8 652.8 256 659.2 256s9.6-19.2 16-22.4c6.4-3.2 32 51.2 28.8 73.6s-3.2 54.4-22.4 96-86.4 99.2-86.4 99.2 86.4-25.6 89.6-6.4c0 3.2 0 9.6 0 16 0 0 0 0-3.2 0-51.2 0-99.2 16-137.6 44.8l0 0c0-3.2-3.2-3.2-6.4-6.4-19.2-22.4-16-64-19.2-83.2C518.4 448 556.8 438.4 569.6 428.8zM681.6 960c-118.4 0-211.2-96-211.2-211.2 0-118.4 96-211.2 211.2-211.2 118.4 0 211.2 96 211.2 211.2S800 960 681.6 960zM681.6 572.8c-64 0-118.4 51.2-118.4 118.4 0 60.8 44.8 108.8 102.4 115.2l0 35.2-44.8 0 0 35.2 44.8 0 0 44.8 35.2 0 0-44.8 44.8 0 0-35.2-44.8 0 0-35.2c54.4-9.6 96-57.6 96-115.2C800 624 745.6 572.8 681.6 572.8zM681.6 774.4c-44.8 0-83.2-38.4-83.2-83.2s38.4-83.2 83.2-83.2 83.2 38.4 83.2 83.2S726.4 774.4 681.6 774.4z" p-id="4463" fill="#00BBBB"></path></svg>
                    <p>{{item.depname}}</p> 
                </div> 
            </div> -->
            <Carousel v-model="carouselindex">
                <CarouselItem v-for="(item,index) in carouselarr" :key="index">
                    <div class="content1" >
                        <div class="Ninthpalace" v-for="(depitem,index1) in item" :key="index1" @click="clickdocto(depitem)">
                            <svg t="1566376948291" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4462" width="40" height="40"><path d="M819.2 556.8 819.2 556.8c9.6-32 19.2-64 25.6-89.6 16-86.4-3.2-131.2-12.8-169.6-12.8-38.4-51.2-76.8-73.6-96-22.4-19.2-67.2-19.2-76.8-19.2-6.4 0-12.8-12.8-25.6-12.8s-12.8 12.8-12.8 12.8-12.8-6.4-25.6-25.6S601.6 128 563.2 89.6s-80-41.6-140.8-41.6S316.8 64 259.2 99.2 204.8 172.8 195.2 192C185.6 211.2 185.6 243.2 188.8 256 192 268.8 182.4 278.4 172.8 294.4 163.2 310.4 150.4 320 140.8 332.8c-9.6 9.6-6.4 22.4 0 25.6C150.4 364.8 153.6 368 160 371.2c6.4 3.2 0 12.8-3.2 16s-3.2 16 0 19.2c6.4 6.4 0 12.8 0 19.2s0 12.8 6.4 16 6.4 16 3.2 28.8 0 25.6 9.6 38.4c9.6 9.6 32 6.4 44.8 6.4s41.6 3.2 54.4 6.4c6.4 0 16 38.4 25.6 54.4 6.4 16 16 38.4 25.6 51.2s19.2 32 19.2 44.8c0 9.6-35.2 73.6-67.2 118.4-28.8 48-51.2 76.8-64 99.2-9.6 12.8 92.8 89.6 268.8 89.6 54.4 0 96-3.2 128-12.8 22.4 6.4 48 12.8 73.6 12.8 128 0 233.6-105.6 233.6-233.6C915.2 668.8 876.8 598.4 819.2 556.8zM569.6 428.8c12.8-9.6 28.8-25.6 48-54.4C633.6 348.8 640 326.4 640 304c-3.2-19.2-6.4-48 0-54.4C646.4 236.8 652.8 256 659.2 256s9.6-19.2 16-22.4c6.4-3.2 32 51.2 28.8 73.6s-3.2 54.4-22.4 96-86.4 99.2-86.4 99.2 86.4-25.6 89.6-6.4c0 3.2 0 9.6 0 16 0 0 0 0-3.2 0-51.2 0-99.2 16-137.6 44.8l0 0c0-3.2-3.2-3.2-6.4-6.4-19.2-22.4-16-64-19.2-83.2C518.4 448 556.8 438.4 569.6 428.8zM681.6 960c-118.4 0-211.2-96-211.2-211.2 0-118.4 96-211.2 211.2-211.2 118.4 0 211.2 96 211.2 211.2S800 960 681.6 960zM681.6 572.8c-64 0-118.4 51.2-118.4 118.4 0 60.8 44.8 108.8 102.4 115.2l0 35.2-44.8 0 0 35.2 44.8 0 0 44.8 35.2 0 0-44.8 44.8 0 0-35.2-44.8 0 0-35.2c54.4-9.6 96-57.6 96-115.2C800 624 745.6 572.8 681.6 572.8zM681.6 774.4c-44.8 0-83.2-38.4-83.2-83.2s38.4-83.2 83.2-83.2 83.2 38.4 83.2 83.2S726.4 774.4 681.6 774.4z" p-id="4463" fill="#00BBBB"></path></svg>
                            <p>{{depitem.depname}}</p> 
                        </div> 
                    </div>
                </CarouselItem>
            </Carousel>
            <p style="text-align: left;font-size:22px;padding: 10px 5%;padding-left:5%;font-weight: 900">名医推荐 <span style="text-align: left;font-size:16px;padding: 10px 0;padding-left:15px;font-weight: 100">获取更多诊疗建议</span></p>
            <div class="content2">
                <div class="doctort" v-for="(item,index) in doctorlist" :key="index">
                    <img class="avatar" src="./../../assets/toux.png" alt="" height="14%">
                    <div class="docto">
                       <p><span style="font-weight: 900;font-size:20px;">{{item.doctorname}}</span><span style="font-weight: 500;font-size:18px;padding: 0px 10px;display: inline-block;">{{item.zhi}}</span></p>
                       <p  style="font-size:16px;"><span>滦平县妇幼保健院</span><span style="padding: 0px 10px;display: inline-block;">{{item.debname}}</span></p>
                       <p style="font-size:16px;" class="ppoo" :class="{ppo:currentindex==index}"><span>擅长：</span><span @click="showjob(index)">{{item.job}}</span></p>
                       <p><span style="font-size:20px;color:#00BBBB">￥{{item.preouds}}</span><span><Button shape="circle" class="btn" @click="goDescribecondition()">问医生</Button></span></p> 
                    </div>
                </div>
            </div>
        </div>
        <tabbar class="pubtabbar"></tabbar>
    </div>
</template>
<script>
import tabbar from "../../common/tabbar";
    export default {
        name:"consultationHome",
        components: {
            tabbar
        },
        data() {
            return {
                carouselarr:[],
                carouselindex:0,
                currentindex:-1,
                doctorlist:[
                        {
                        doctorname:'刘淑琴',
                        job:'妇产生孩子旺sssss手术室手术室所旺我的方订单',
                        debname:'产科',
                        preouds:'49.00',
                        zhi:'副主任医师'
                    },{
                        doctorname:'孟良',
                        job:'妇产生孩子旺sssss手术室手术室所旺我的方订单',
                        debname:'产科',
                        preouds:'49.00',
                        zhi:'副主任医师'
                    },{
                        doctorname:'刘淑琴',
                        job:'妇产生孩子旺sssss手术室手术室所旺我的方订单',
                        debname:'产科',
                        preouds:'49.00',
                        zhi:'副主任医师'
                    },{
                        doctorname:'刘淑琴',
                        job:'妇产生孩子旺sssss手术室手术室所旺我的方订单',
                        debname:'产科',
                        preouds:'49.00',
                        zhi:'副主任医师'
                    }
                ],
                doctorType:[
                    // {
                    //     depname:'妇产科',
                    // },
                    // {
                    //     depname:'妇产科',
                    // },
                    // {
                    //     depname:'妇产科',
                    // },
                    // {
                    //     depname:'妇产科',
                    // },
                    // {
                    //     depname:'妇产科',
                    // },
                    // {
                    //     depname:'妇产科',
                    // },
                    // {
                    //     depname:'妇产科',
                    // },
                    // {
                    //     depname:'妇产科',
                    // }
                ],
            }
        },
        methods:{
            showjob(index){
                this.currentindex=index
            },
            //问医生
            goDescribecondition(){
               this.$router.push({name:'consulOrder'});
            },
            //消息列表
            godoctorList(){
                this.$router.push('/doctorList');
            },
            //请求科室信息
            DepartmentList(){
                var that  = this;
                var url =that.$store.getters.getUrl + "depart/GetRegDeptList.do";
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: false,
                    data: "",
                    success: function(data) {
                        // _this.isshowloading = false;
                        if(data.status==-1||data.status==undefined){
                            that.$router.push("/abnormal");
                        }else{
                            that._dealdata(data.data);
                        }
                    },
                    error: function(data) {
                    // _this.isshowloading = false;
                    }
                });
            },
             //处理获取医生的数据 此方法只在页面加载时触发一次
            _dealdata(data) {
            
                var _this = this;
                //获取合并之后科室的名称存入数组
                //["depmentname":"产科门诊"]
                _this.doctorType = [];
                _this.doctorType.push({ depname: "妇科",gynaecology:data.gynaecology});
                _this.doctorType.push({ depname: "产科" ,obstetrics:data.obstetrics});
                _this.doctorType.push({ depname: "儿科" ,pediatrics:data.pediatrics});
                for (let j = 0; j < data.other.length; j++) {
                    if (data.other[j].depname == "皮肤科") {
                    _this.doctorType.push({depname: "皮肤科",depCode:data.other[j].depCode});
                    }
                }
                //其他没合并的科室
                for (let i = 0; i < data.other.length; i++) {
                    let depname = "";
                    let depCode = ''
                    depname = data.other[i].depname;
                    depCode=data.other[i].depCode;
                    if (depname != "皮肤科") {
                    let depitem = {
                        //合并科室的名称
                        depname: depname,
                        depCode:depCode
                    };
                    _this.doctorType.push(depitem);
                    }
                }
                let resnum=Math.ceil(_this.doctorType.length/8)
                for(let i=0;i<resnum;i++){
                    let _arritem=_this.doctorType.slice(8*(i+1)-8,8*(i+1));
                    _this.carouselarr.push(_arritem)
                }
            },
            //点击选择医生
            clickdocto(depitem){
                let _this = this;
                var depcode =[];
                if(depitem.depname=="妇科"){
                    depcode.push('100101')
                }else if(depitem.depname=="产科"){
                    depcode.push('100102')
                }else if(depitem.depname=="儿科"){
                    depcode.push('100103')
                }else{
                    depcode.push(depitem.depCode);
                }
                var depcodes=''
                var dep='';
                for(var i = 0;i<depcode.length;i++){
                    dep+=depcode[i] + ',';
                }
                depcodes = dep.substring(0, dep.lastIndexOf(','));
                _this.$store.commit("setdepcodes", depcodes);
                this.$router.push('/yishenList');
            },
            getdoctors(){
                let url=this.$store.getters.getUrl + "depart/DepartDoctors.do"
                let _this=this
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data: {depCode:100101},
                    success: function(data) {
                        //_this.isshowloading = false;
                        let resarr=JSON.parse(data.data)
                        // let concatarr=[]
                        // console.log(resarr)
                        // for(let i=0;i<resarr.length;i++){
                        //     console.log(resarr[i])
                        // }
                        // _this.doctorType=concatarr
                        // _this.doctorType=resarr
                        console.log(_this.doctorType)
                        
                    },
                    error: function(data) {
                        // _this.isshowloading = false;
                    }
                });
            }
        },
        created() {
            this.DepartmentList();
            // this.getdoctors()
        },
    }
</script>

<style scoped>
.carouselItemBox{
    width: 100%;
    height: 200px;
}
.tittle {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
  position: relative;
  
}
.content1{
    display: flex;
    align-items: center;
    width:100%;
    flex-wrap: wrap;
    padding: 10px 0;
    font-size: 14px;
    overflow: auto;
    /* height: 150px; */
}
.Ninthpalace{
   display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:25%;
    padding-top: 10px;
    padding-bottom: 10px;
}
.tong{
    position: absolute;
    right: 15px;
    top: 8px;
} 

.doctort{
    padding: 10px 5% 10px 5%;
    width: 100%;
    border-bottom: 1px solid #eee;
}
.docto{
    display: inline-block;
    vertical-align: top;
    padding: 0px 0px 0px 5%;
    position: relative;
    width: 85%;
}
.ppoo{
    width:100%;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}    
.ppo{
    overflow:unset;
    text-overflow:unset;
    white-space:unset;
    
}
.avatar{
    vertical-align: top;
    margin-top: 8px;
    width: 14%;
}
.docto p{
    line-height: 2;
}
.btn{
    position: absolute;
    bottom: 0;
    right: 5%;
    background: #00BBBB;
    color: #ffffff;
    width: 100px;
}
.pubtabbar{
    position: fixed;
    z-index: 100;
    bottom: 0;
}
</style>