// pages/comment/comment.js
var api = require("../../interface/interface.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    imagePrefix: api.imagePrefix,
    isShowCommetView:false,
    inputNumbers:500,
    comment:"",
    isRefresh: false,
    itemId:0,
    start: 0,
    count: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var id = options.id
    

    this.setData({
      itemId:id
    })
    this.downloadData(id)
  },
  dealInput(e) {
    var value = e.detail.value
    var newNumbers = 500 - value.length
    this.setData({
      comment: value,
      inputNumbers: newNumbers
    })
  },
  dealSend(){
    var url = api.addCommentUrl
    var self = this
    var user = wx.getStorageSync("user")
    var token = wx.getStorageSync("token")
    wx.request({
      url:url,
      data:{
        userId:user.id,
        itemId:self.data.itemId,
        token:token,
        comment: self.data.comment
      },
      success:function(res){
        var data = res.data
        if(data.code == "1"){
          wx.showToast({
            title: '发布成功',
          })
          self.setData({
            isShowCommetView: false,
            comment:"",
            inputNumbers: 500,
          })
          self.downloadData(self.data.itemId)
        }else{
          wx.showModal({
            title: '发布失败 desc'+data.desc,
          })
        }
      }

    })
  },
  
  dealHide(){
    this.setData({
      isShowCommetView:false
    })
  },
  dealShow() {
    this.setData({
      isShowCommetView: true
    })
  },
  downloadData(id) {
    var self = this
    var url = api.getCommentUrl + "&itemId=" + id + "&order=desc"+"&start=" + this.data.start + "&count=" + this.data.count
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: url,
      success: function (res) {
        var data = res.data
        console.log(data)
        var list = data.data
        // self.setData({
        //   list: list,
        //   isRefresh: false,
        // })
        if (self.data.start == 0) {
          self.setData({
            list: list,
            isRefresh: false
          })
        } else {
          var newList = self.data.list
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