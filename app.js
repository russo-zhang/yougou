import request from "./utils/request.js"
//app.js
App({
  onLaunch: function () {
    request.defaults.baseURL ="https://api.zbztb.cn/api/public/v1"
    request.onError(err=>{
      // console.log(err)
      if(err.data.meta.status!==200){
        // console.log(err)
        console.log(err.data.meta.msg)
      }
      else if(err.statusCode!==200) {
        console.log(err.errMsg)
      }
    })
  }
})