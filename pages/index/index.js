import request from "../../utils/request.js"
Page({
 data:{
   imgUrls:[],
   navList:[],
   floor:[]
 },
  onLoad(){
    // 获取轮播图
    request({
      url: '/home/swiperdata'
    }).then(res => {
      // console.log(res)
      this.setData({
        imgUrls:res.data.message
      })
    })

    // 获取导航
    request({
      url: '/home/catitems'
    }).then(res => {
      // console.log(res)
      this.setData({
        navList:res.data.message
      })
      
    })

    //获取楼层
    request({ url:"/home/floordata"}).then(res=>{
      console.log(res)
      this.setData({
        floor:res.data.message
      })
    })

  }
    
})
