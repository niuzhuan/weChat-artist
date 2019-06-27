// pages/home/home.js
var api = require("../../interface/interface.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ads:[],
    list:[],
    imagePrefix: api.imagePrefix,
    rightUrl:"/pages/login/login"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.downloadAds()
    this.downloadData()
    
  },
  downloadAds() {

    var url = api.adsUrl

    var self = this

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

        self.setData({
          ads: list
        })

      }
    })
  },
  downloadData() {
    var self = this
    var url = api.mainListUrl
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
        self.setData({
          list: list
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
    if (wx.getStorageSync("isLogin") == "1") {
      this.setData({
        rightUrl: "/pages/user/user"
      })
    } else {
      this.setData({
        rightUrl: "/pages/login/login"
      })
    }
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '扭转的APP-文艺范',
      path: '/pages/home/home?id=123'
    }
  }
})