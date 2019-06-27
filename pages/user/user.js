// pages/search/search.js
var api = require("../../interface/interface.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg:"",
    username:""
   
  },
  dealloadinfo(){
    wx.navigateTo({
      url: "/pages/userInfo/userInfo",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync("user")

    this.setData({
      username: user.username,
      headImage: api.imagePrefix + user.image
    })
  },
  dealLogout() {

    wx.showModal({
      title: '确认退出',
      content: '请确认是否退出?',
      success: function (res) {
        if (res.confirm) {

          //删除登录信息
          wx.removeStorageSync("isLogin")
          wx.removeStorageSync("user")
          wx.removeStorageSync("token")

          //退出.跳转到主页
          wx.switchTab({
            url: '/pages/home/home',
          })

        }
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