import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {},
    cartList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: "/goods/detail?goods_id=" + options.goods_id
    }).then(res => {
      this.setData({
        goodsInfo: res.data.message
      })
    })

  },
  //添加商品到购物车
  addToCart() {
    let {
      goodsInfo
    } = this.data
    let cartList = wx.getStorageSync("cartList")

    //判断本地存储是否有购物车列表
    if (cartList) {

      let flag = false
      cartList = cartList.map(item => {
        if (item.goods_id === goodsInfo.goods_id) { //判断当前页的商品是否与本地存储的商品相同
          //如果本地存储有当前页商品(1)
          item.number += 1
          flag = true
          return item
        } else {       
          return item
        }
      })

      if (flag) { //如果本地存储有当前页商品(2)
        this.setData({
          cartList
        })
        //  console.log(cartList, "48")
        wx.setStorageSync("cartList", cartList)
      } else { //如果本地存储没有当前页商品
        goodsInfo.number = 1
        goodsInfo.pick = true
        cartList.unshift(goodsInfo)
        this.setData({
          cartList
        })
        wx.setStorageSync("cartList", cartList)
      }
    } else { //如果本地存储不存在购物车列表
      cartList = []
      goodsInfo.number = 1
      goodsInfo.pick = true
      cartList.push(goodsInfo)
      this.setData({
        cartList
      })
      wx.setStorageSync("cartList", cartList)
    }
    // console.log(cartList)
    // 弹窗消息：https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
    wx.showToast({
      title: '添加购物车成功',
      icon: 'success',
      duration: 2000
    });
  }


})