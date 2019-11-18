import { resolve } from "path";
import { rejects } from "assert";

const islogin=(that,url)=>{
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        xhrFields: {withCredentials: true},
        data: {},
        success: function(data) {
        //判断跳哪个页面如果是1不跳转页面
        if (data.status == "0") {
            //如果state为1就取获取首页渲染的数据
            return;
        } else if (data.status == "1") {
            //如果是0跳到填写信息页
            that.isshowloading = false;
            that.$router.push("/registeredlist");
        }
        },
            error: function(data) {
        }
    });
}
const loginrequest=(that,url,password,doccode,phone,phonecode)=>{
    let state
    that.spinShow=true
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {
            password,doccode,phone,phonecode
        },
        success: function(data) {
            if(data.status==1){
                localStorage.setItem('ysdoccode',data.data[0].user_name);
                localStorage.setItem('ysdepcode',data.data[0].dept_code);
                localStorage.setItem('ysdepname',data.data[0].dept_name);
                localStorage.setItem('ysdocname',data.data[0].name);
            }
            state=data.status
        },
        error: function(data) {
            state=5
        }
      });
      return state
}
const fetchVerifyCode=(that,url,phone)=>{
    let state
    return new Promise((resolve,reject)=>{
        let ajaxTimeOut =$.ajax({
            url: url,
            type: "post",
            dataType: "json",
            timeout: 15000, //通过timeout属性，设置超时时间
            // async: false,
            data: {
                phone,
            },
            success: function(data) {
                state=data.status
                resolve(state)
            },
            error: function(data) {
                state=5
                resolve(state)
            },
            complete: function (XMLHttpRequest, status) { //当请求完成时调用函数
                if (status == 'timeout') {//status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
                    ajaxTimeOut.abort(); //取消请求
                    
                    that.$Modal.warning({     //超时提示：网络不稳定
                        title: '友情提示',
                        content: '请求超时',
                    });
                }
            }
          });
    })
}
const loginrequestvalidat=(that,password,phone,auth,doccode)=>{
    let emparr=[];
      if(password.trim()==''){
        that.passtate=true;
        emparr.push(1);
      }
      if(doccode.trim()==''){
        that.namestate=true;
        emparr.push(1);
      }
      if(phone.trim()==''){
        that.phonestate=true;
        emparr.push(1);
      }
      if(auth.trim()==''){
        that.authstate=true;
        emparr.push(1);
      }
      if(emparr.length>0){
        return false
      }
      return true
}

export {islogin,fetchVerifyCode,loginrequestvalidat,loginrequest}