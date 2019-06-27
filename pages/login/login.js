// pages/login/login.js
var api = require("../../interface/interface.js")
var validate = require("../../validate/validate.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  dealLogin(){
    if (!validate.checkStringLength(this.data.username,4,20)){
      wx.showModal({
        title: '',
        content: '用户名长度应为4~20位',
        showCancel: false
      })
      return
    }
    if (!validate.checkStringLength(this.data.password,4,20)) {
      wx.showModal({
        title: '',
        content: '密码长度应为4~20位',
        showCancel: false
      })
      return
    }
    var url = api.loginUrl
    var self = this
    wx.showLoading({
      title: '正在登录',
    })
    wx.request({
      url:url,
      data:{
        username:self.data.username,
        password:self.data.password
      },
      
      success:function(res){
        var data = res.data

        wx.hideLoading()
        if(data.code == 1){
          wx.setStorageSync("isLogin", "1")
          wx.setStorageSync("user", data.data)
          wx.setStorageSync("token", data.token)

          wx.switchTab({
            url: '/pages/home/home',
          })
        }
        else {
          wx.showModal({
            title: '登录结果',
            content: "登录失败,desc=" + data.desc,
            showCancel: false
          })
        }
      }
    })
  },
  dealInput(e){
    console.log(e)
    var v = e.detail.value
    var id = e.currentTarget.id
    var dict={}
    dict[id] = v
    this.setData(dict)
    console.log(dict)
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