import request from "../../utils/request.js" 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    brands:[],
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({ url:"/categories"}).then(res=>{
      // console.log(res)
      this.setData({cateList:res.data.message})
      this.setData({ brands: res.data.message[0].children })
    })
  },
  tapList(event){
    // console.log(event)
    this.setData({current:event.currentTarget.dataset.index})
    request({ url: "/categories" }).then(res => {
      console.log(res)
      this.setData({ brands: res.data.message[event.currentTarget.dataset.index].children })
    })
  },
  // search(event){
  //   wx.redirectTo({
  //     url: '/pages/searchList/index?query=' + event.currentTarget.dataset.name
  //   })
  // }


})