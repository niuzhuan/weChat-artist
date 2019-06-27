// pages/home/home.js
var api = require("../../interface/interface.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ads: [],
    list: [],
    imagePrefix: api.imagePrefix,
    start:0,
    count:10,
    isRefresh: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.downloadData()

  },
  
  downloadData() {
    var self = this
    var url = api.readListUrl+"&start="+this.data.start+"&count="+this.data.count
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: url,
      success: function (res) {
        var data = res.data
        console.log(data)
        var list = data.data
        
        for (var item of list) {
          if (item.category == 1) {
            item.categoryName = "阅读"
            item.pageName = "/pages/readDetail/readDetail"
          }
          if (item.category == 4) {
            item.categoryName = "音乐"
            item.pageName = "/pages/musicDetail/musicDetail"
          }
          if (item.category == 5) {
            item.categoryName = "影视"
            item.pageName = "/pages/movieDetail/movieDetail"
          }
        }
        if(self.data.start == 0){
          self.setData({
            list: list,
            isRefresh:false
          })
        }else{
          var newList= self.data.list
          newList = newList.concat(list)
          self.setData({
            list: newList,
            isRefresh: false
          })
        }
       
        
        wx.hideLoading()
      }
      
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (this.data.isRefresh) {
      return
    }

    this.setData({
      isRefresh: true,
      start: 0
    })

    this.downloadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isRefresh) {
      return
    }
    var newStart = this.data.start += this.data.count
    this.setData({
      isRefresh: true,
      start: newStart
    })

    this.downloadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})