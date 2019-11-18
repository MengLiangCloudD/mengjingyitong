export const getEvaluateContent=(url)=>{
   return new Promise((resolve,reject)=>{
   
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: true,
        data:{},
        success: function(data) {
            console.log(data)
            resolve(data)
        },
        error: function(data) {
            reject(data)
        }
    });
   })
}

export const submitEvaluate=(data,url)=>{
    return new Promise((resolve,reject)=>{
     $.ajax({
         url: url,
         type: "post",
         dataType: "json",
         async: true,
         data:data,
         success: function(data) {
             resolve(data)
         },
         error: function(data) {
             reject(data)
         }
     });
    })
 }