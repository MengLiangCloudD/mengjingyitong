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
        <!-- <div class="content">
           <p>行医资格证：</p> 
           <div class="content1">
                <div class="Patient1" style="text-align: center;" @click="shngchua">
                    <p><svg t="1566457223344" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4050" width="50" height="50"><path d="M853.95951925 475.5066105h-310.08967642v-300.83326917c0-13.88461268-13.88461268-32.39742862-32.39742936-32.39742862-18.51281666 0-32.39742862 18.51281666-32.39742861 37.02563333v300.83326844H178.2417157c-18.51281666-4.62820399-37.02563333 13.88461268-37.02563262 32.39742934s18.51281666 32.39742862 32.39742863 32.39742861h300.83326916v300.83326845c4.62820399 18.51281666 18.51281666 37.02563333 37.02563261 37.02563334s32.39742862-18.51281666 32.39742935-32.39742862v-305.46147317h305.46147243c18.51281666 0 32.39742862-18.51281666 32.39742934-32.39742861s-9.25640796-37.02563333-27.76922535-37.02563333z" fill="#e6e6e6" p-id="4051"></path></svg></p>
                    <p>添加图片</p>
                </div>
            </div>
        </div> -->
        <div class="upload-pic">
    <label class="up-lab" for="add-pic-btn">上传图片</label>
    <input type="file" accept="image/*" multiple class="up-file" id="add-pic-btn" @change="shngchua">
</div>

<div class="group-coms-pic" id="groupTu">
    <!--
    <div class="item">
        <div class="pic-box">
            <img class="img" src="http://n4-q.mafengwo.net/s13/M00/9E/31/wKgEaVx6eymAKYK_AAU40faE3IY94.jpeg?imageMogr2%2Fthumbnail%2F%21300x166r%2Fgravity%2FCenter%2Fcrop%2F%21300x166%2Fquality%2F100">
        </div>
        <div class="tk">111.jpg</div>
        <span class="del">x</span>
    </div>
    -->
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
                var obj = document.getElementById('add-pic-btn');
                var length = obj.files.length;
                var arrTitle = [];//存标题;
                var _html = '';
            for(var i=0; i<length; i++) {
                var reader = new FileReader();
                if (!reader) {
                console.log('对不起，您的浏览器不支持！请更换浏览器试一下');
                    return
                }
                //存储上传的多张图片名字
                arrTitle.push(obj.files[i].name);
                console.log(arrTitle); 
                console.log( obj.files); 
               
                // reader.error=function(e){
                //     console.log("读取异常")
                // }
                //iffi语法
                // ;(function(i){
                    //读取成功
                    reader.onload = function(e){
                        //console.log(e)
                        var _src = e.target.result;
                        //节点
                        var divItem = document.createElement('div');
                        divItem.setAttribute('class','item');
                        var divPic = document.createElement('div');
                        divPic.setAttribute('class','pic-box');
                        var img = document.createElement('img');
                        img.setAttribute('class','img');
                        img.setAttribute('src',_src);
                        var divTk = document.createElement('div');
                        divTk.setAttribute('class','tk')
                        var spanDel = document.createElement('span');
                        spanDel.setAttribute('class','del');
                        spanDel.setAttribute('title',arrTitle[i]);
                        spanDel.innerText = 'x';
                        divTk.innerHTML = arrTitle[i];
                        divItem.appendChild(divPic);
                        divPic.appendChild(img);
                        divItem.appendChild(divTk);
                        divItem.appendChild(spanDel);
                        //增加节点结构
                        var groupTu =  document.getElementById('groupTu');
                        groupTu.insertBefore(divItem, groupTu.firstChild);
                        //增加删除节点
                        // spanDel.onclick = function(){
                        //     removeItem(this);
                        //     return false;
                        // };
                    };
                // })(i)
                reader.onloadstart=function(){
                }
                reader.onprogress=function(e){
                    if(e.lengthComputable){
                    console.log("正在读取文件")
                    }
                };
                reader.readAsDataURL(obj.files[i]);
            }
            },
            removeItem(delNode){
                var itemNode = delNode.parentNode,
                    title = delNode.getAttribute('title');
                var flag = confirm("确认要删除名为："+title+"的图片？");
                if(flag) {
                    itemNode.parentNode.removeChild(itemNode);
                    console.log('删除成功~')
                }
                return false;
            }
        },
        created() {
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










.upload-pic{ width: 120px;  height: 30px;  line-height: 30px; border-radius: 4px; color: #fff; position: relative; cursor: pointer;
        font-size: 14px;  background-color: #44b549;  text-align: center;  display: inline-block;
        vertical-align: middle; margin-left: 8px;  margin-top: 8px;  }
    .upload-pic .up-lab,.upload-pic .up-file{ width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 2; overflow: hidden;}
    .upload-pic .up-lab{ background-color: #44b549; cursor: pointer; }
    .upload-pic .up-file{ z-index: 1;}
    .group-coms-pic{ padding-top: 30px; overflow: hidden; }
    .group-coms-pic .item{  width: 116px; height: 148px; border:1px solid #f0f0f0; position: relative; float: left;margin-right: 20px; margin-bottom: 20px; }
    .group-coms-pic .pic-box{ width:118px; height:117px; border-bottom:1px solid #f0f0f0;  overflow: hidden;  position: relative;}
    .group-coms-pic .pic-box .img{ height:117px; position: absolute; left: 50%; top: 50%;
        transform:translate(-50%,-50%);}
    .group-coms-pic .tk{ padding:0 9px; height: 32px; line-height: 32px; text-align: left;
        overflow: hidden;  white-space: nowrap;  text-overflow: ellipsis; color: #353535;  font-size: 14px;}
    .group-coms-pic .item .del{ width:20px; height: 20px; line-height: 20px; text-align: center; border-radius: 50%; color: #fff;
        background-color: #ff6982; cursor: pointer; font-style: normal; position: absolute; right: -10px; top: -10px; }
</style>