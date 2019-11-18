const hidemenu=(requesturl)=>{
    let url1 = location.href;
      //后台接口
      var url = requesturl
      let ajaxTimeOut =$.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: true,
        timeout: 15000, //通过timeout属性，设置超时时间
        data: { url: url1 },
        success: function(data) {
          wx.config({
            debug: false,
            appId: data.appId, // 必填,公众号的唯一标识
            timestamp: data.timestamp, // 必填,生成签名的时间戳
            nonceStr: data.nonceStr, // 必填,生成签名的随机串
            signature: data.signature, // 必填,签名
            jsApiList: [
              "hideAllNonBaseMenuItem",
              ] // 必填,需要使用的JS接口列表
          });
        },
        error: function(data) {},
        complete: function (XMLHttpRequest, status) { //当请求完成时调用函数
          if (status == 'timeout') {//status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
            ajaxTimeOut.abort(); //取消请求
            alert('请求超时');
            
          }
        }
      });
      wx.ready(function() {
            wx.hideAllNonBaseMenuItem({
                success:function(res){
                }
            });
            /* 处理失败验证 */
            wx.error(function(res) {
                // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
                
            });
      })
}

export {hidemenu}