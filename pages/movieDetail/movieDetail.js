var api = require("../../interface/interface.js")

var base64js = require("../../base64/base64.js")

// pages/readDetail/readDetail.js
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    item: {},
    imagePrefix: api.imagePrefix,
    isCollect: false,
    isGood: false
  },
  
	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {

    var id = options.id
    this.downloadData(id)
  },
  dealGood() {
    var isLogin = wx.getStorageSync("isLogin")
    if (isLogin != 1) {
      wx.showModal({
        title: '通知',
        content: '需要登录,是否跳转到登录界面',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/login/login",
            })
          }
        }

      })
      return
    }
    var self = this
    var user = wx.getStorageSync("user")
    var token = wx.getStorageSync("token")
    if (self.data.isGood == false) {
      var url = api.addGoodUrl
      wx.request({
        url: url,
        data: {
          userId: user.id,
          token: token,
          itemId: self.data.item.id
        },
        success: function (res) {
          var data = res.data
          if (data.code == 1) {
            wx.showToast({
              title: '点赞成功',
            })
          } else {
            wx.showToast({
              title: '点赞失败 desc' + data.desc,
            })
          }
          self.setData({
            isGood: true
          })
        }
      })
    } else {
      var url = api.cancelGoodUrl
      wx.request({
        url: url,
        data: {
          userId: user.id,
          token: token,
          itemId: self.data.item.id
        },
        success: function (res) {
          var data = res.data
          if (data.code == 1) {
            wx.showToast({
              title: '取消点赞成功',
            })
          } else {
            wx.showToast({
              title: '取消点赞失败 desc' + data.desc,
            })
          }
          self.setData({
            isGood: false
          })
        }
      })
    }
  },
  dealShowCommet() {
    wx.navigateTo({
      url: "/pages/comment/comment?id=" + this.data.item.id,
    })
  },
  dealCollect() {
    var isLogin = wx.getStorageSync("isLogin")
    console.log(isLogin)

    if (isLogin != 1) {
      wx.showModal({
        title: '通知',
        content: '需要登录,是否跳转到登录界面',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/login/login",
            })
          }
        }

      })
      return
    }
    var self = this
    var user = wx.getStorageSync("user")
    var token = wx.getStorageSync("token")

    if (this.data.isCollect == false) {
      var url = api.saveFavoriteUrl
      wx.request({
        url: url,
        data: {
          userId: user.id,
          itemId: self.data.item.id,
          type: self.data.item.category,
          token: token
        },
        success: function (res) {
          var data = res.data
          if (data.code == 1) {
            wx.showToast({
              title: '收藏成功',
            })
          } else {
            wx.showToast({
              title: '收藏失败 desc=' + data.desc,
            })
          }
          self.setData({
            isCollect: true
          })
        }

      })
    }
    if (this.data.isCollect) {
      var url = api.cancelFavoriteUrl;
      wx.request({
        url: url,
        data: {
          userId: user.id,
          itemId: self.data.item.id,
          type: self.data.item.category,
          token: token
        },
        success: function (res) {
          var data = res.data
          if (data.code == 1) {
            wx.showToast({
              title: '取消收藏成功',
            })
          } else {
            wx.showToast({
              title: '取消收藏失败',
            })
          }
          self.setData({
            isCollect: false
          })
        }

      })
    }
  },
  downloadData(id) {

    var self = this

    var url = api.movieDetailUrl + "&id=" + id

    var isLogin = wx.getStorageSync("isLogin")
    var token = wx.getStorageSync("isLogin")
    if (isLogin) {
      var user = wx.getStorageSync("user")
      url += "&userId=" + user.id + "&token" + token
    }

    wx.request({
      url: url,
      success: function (res) {
        var data = res.data
        console.log(data)

        var item = data.data;

        //把item.hp_content base64加密数据解析
        // var base64 = new base64js.Base64()
        // var real_story = base64.decode(item.story)
        // item.real_story = real_story
        var is_collect = item.is_collect
        self.setData({
          item: item,
          isCollect: is_collect
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