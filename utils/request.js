
const request = function(config) {
  if (config === "") config = {}

  if (config.url.search(/^http/) === -1) {
    config.url = request.defaults.baseURL + config.url
  }

  return new Promise(function(resolve, reject) {
    wx.request({
      ...config,
      success(res) {
        resolve(res)
      },
      complete(res){
        request.fn(res)     
      }
    })
  })
}
request.defaults = {
  baseURL: ""
}


request.onError = function (callback) {
  request.fn=function(res){
     callback(res)
  }
  
}


export default request;