import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    query: "",
    pagenum: 1,
    pagesize: 10,
    loadMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      query: options.query
    })
    this.getData()

  },

  // 获取搜索结果列表
  getData(i) {
    if (!this.data.loadMore) return
    request({
      url: "/goods/search",
      data: {
        query: this.data.query,
        pagenum: this.data.pagenum + i,
        pagesize: this.data.pagesize
      }
    }).then(res => {
      let goods = res.data.message.goods
      if (goods.length < this.data.pagesize) {
        this.setData({
          loadMore: false
        })
      }
      goods = goods.map(item => {
        item.goods_price = item.goods_price.toFixed(2)
        let priceArr = item.goods_price.split(".")
        item.priceHead = priceArr[0]
        item.priceTail = priceArr[1]
        return item
      })

      let goodsList = [...this.data.goodsList, ...goods]
      this.setData({
        goodsList
      })
    })
  },

  onReachBottom() {

    this.getData(1)
  }


})