// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accept_info: {
      userName: "",
      telNumber: "",
      address: ""
    },
    cartList: [],
    total:0,
    isAllPick:"",
    // isEmpty:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onShow: function() {
    this.setData({cartList:wx.getStorageSync("cartList")})
    console.log(this.data.cartList)
    this.getTotal()
    this.setData({
      slideButtons: [ {
        type: 'warn',
        text: '删除',
        extClass: 'test',
        src: '', // icon的路径
        data:"123"
      }],
    });
    
  },
  addAddress() {
    wx.chooseAddress({
      success: res => {
        console.log(res)
        this.setData({
          accept_info: {
            userName: res.userName,
            telNumber: res.telNumber,
            address: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
      }
    })
  },
  getTotal(){
    let total=0
    let i=0
    this.data.cartList.forEach(item=>{
      if(item.pick){
        i++
        total += item.goods_price*item.number
      }
    })
    if (i === this.data.cartList.length){
      this.setData({ isAllPick:true })
    }else{
      this.setData({ isAllPick:false })
    }
    this.setData({total})
  },
  pickgoods(event){
    let goodsItem = event.currentTarget.dataset.goodsitem  
    let cartList=this.data.cartList.map(item => {
      if (item.goods_id === goodsItem.goods_id) {
        let {pick} = item
          item.pick = !pick
        return item
      }else{
        return item
      }
    })
    wx.setStorageSync("cartList", cartList)
    this.setData({cartList})
    this.getTotal()
  },
  pickAll(){
    let {isAllPick}=this.data
    isAllPick = !isAllPick
    let cartList = this.data.cartList.map(item => {
      item.pick = isAllPick
        return item
    })
    this.setData({ cartList })
    this.getTotal()
  },
  minus(event){
    let goodsItem = event.currentTarget.dataset.goodsitem
    let cartList = this.data.cartList.map(item => {
      if (item.goods_id === goodsItem.goods_id) {
        item.number--
        return item
      } else {
        return item
      }
    })
    this.setData({ cartList })
    this.getTotal()
  },
  plus(event) {
    let goodsItem = event.currentTarget.dataset.goodsitem
    let cartList = this.data.cartList.map(item => {
      if (item.goods_id === goodsItem.goods_id) {
        item.number++
        return item
      } else {
        return item
      }
    })
    this.setData({ cartList })
    this.getTotal()
  },
  //活动删除按钮事件
  slideButtonTap(event) {
    // console.log('slide button tap', e.detail)
    let goodsItem = event.currentTarget.dataset.goodsitem
    let cartList = this.data.cartList
    cartList.some((item,index) => {
      if (item.goods_id === goodsItem.goods_id) {
        cartList.splice(index,1)
        return true
      }
    })
    console.log(cartList)
    wx.setStorageSync("cartList", cartList)
    this.setData({ cartList })
    this.getTotal()

  }
  

})