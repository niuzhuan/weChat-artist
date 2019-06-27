// pages/readCollect/readCollect.js
var api = require("../../interface/interface.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.downloadData()
  },
  downloadData() {

    var self = this

    var url = api.getFavoriteUrl

    var user = wx.getStorageSync("user")
    var token = wx.getStorageSync("token")
    wx.request({
      url: url,
      data:{
        userId: user.id,
        token:token,
        type:1
      },
      success: function (res) {
        var data = res.data
        console.log(data)

        var list = data.data;
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
        console.log(list)
        self.setData({
          list:list
          
        })

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})