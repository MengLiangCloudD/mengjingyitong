const fetchopenid=(url,cardno,that)=>{
    let state
    that.isShowLoading=true
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {
            cardno
        },
        success: function(data) {
            that.isShowLoading=false
            state=data
        },
        error: function(data) {
            that.isShowLoading=false
            state={status:5}
        }
    });
    return state
}
const requestpatients=(url,deptcode,docname)=>{
    let state
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            async: true,
            data: {
                deptcode,
                docname
            },
            success: function(data) {
                state=data
                resolve(state)
            },
            error: function(data) {
                state=5
                resolve(state)
            }
        });
    })
}

const changedoctorstate=(url,cliniclabel,code,that)=>{
    let state
    that.isShowLoading=true
    return new Promise((resolve,reject)=>{
        let ajaxTimeOut =$.ajax({
            url: url,
            type: "post",
            dataType: "json",
            timeout: 15000, //通过timeout属性，设置超时时间
            async: true,
            data: {
                cliniclabel,
                code
            },
            success: function(data) {
                that.isShowLoading=false
                state=data
                resolve(state)
            },
            error: function(data) {
                that.isShowLoading=false
                state={status:5}
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
const fetchdoctorstate=(url,doctorno,that,deptVisible,adminLevel)=>{
    let result
    that.isShowLoading=true;
    var b = JSON.parse(deptVisible);
    var a;
    if(b.length==1){
        a = b[0];
    }else if(b.length>1){
        a= b.join(',');
    }
    var deptVisible=a;
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {
            doctorno:doctorno,
            deptVisible:deptVisible
        },
        success: function(data) {
            that.isShowLoading=false
            result=data
        },
        error: function(data) {
            that.isShowLoading=false
            result={status:5}
        }
    });
    return result
}

export {requestpatients,changedoctorstate,fetchdoctorstate,fetchopenid}