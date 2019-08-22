// pages/personal/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: [true, false, false, false, false, false, false, false, false],
    dialogShow: false,
    buttons: [{ text:"确定"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },
  handleClick(event){
    let isShow=this.data.isShow
    console.log(isShow)
   
    let i = 0
    let num = 0
    let j = 0
    let timer = setInterval( ()=>{
      i++
      if (i === 0) j = 0
      if (i === 1) j = 1
      if (i === 2) j = 2
      if (i === 3) j = 5
      if (i === 4) j = 8
      if (i === 5) j = 7
      if (i === 6) j = 6
      if (i === 7) j = 3

      num++
      isShow=isShow.map((item, index) => {
        
        return item = false
      })

      isShow[j]=true
      console.log(isShow)
      this.setData({ isShow })
      if (i > 6) {
        console.log(i)
        console.log(123)
        i = -1
      }
      if (num > 33) {
        clearInterval(timer)
        this.setData({
          dialogShow: true,
        })
      }
    }, 200)
   
   
  },
  tapDialogButton(e) {
    console.log('dialog', e.detail)
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },




})