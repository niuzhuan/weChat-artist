var api = require("../../interface/interface.js")
// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePrefix: api.imagePrefix,
    headImage:"",
    isShowSelectImageBox:false,
    selectHeadImage:"",

    //是否选择了图片,默认没有选择
    isSelectImage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync("user")
    this.setData({
      headImage: user.image,
      selectHeadImage: api.imagePrefix + user.image
    })

  },
  dealChooseImage(){
    var self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        if (tempFilePaths.length>=1){
          var src = tempFilePaths[0]
          self.setData({
            selectHeadImage:src,
            isSelectImage:true

          })
        }
      }
    })
  },
  dealUploadImage(){
    var self  = this
    //看是否选择了图片,如果没有的话要求选择上传
    if (this.data.isSelectImage == false){
      wx.showModal({
        title: '提示',
        content: "请先选择图片,再点击上传",
        showCancel:false
      })
    }


    var user = wx.getStorageSync("user")
    var token = wx.getStorageSync("token")

    wx.uploadFile({
      url: api.changeHeadImageUrl, // 仅为示例，非真实的接口地址
      filePath: this.data.selectHeadImage,
      name: 'newHeadImage',
      formData: {
        m: 'user',
        a: 'changeHeadImage',
        userId: user.id,
        token: token
      },
      success(res) {
        var data = res.data
        // do something


        data = JSON.parse(data)

        console.log(data)

        if (data.code == 1) {
          wx.showToast({
            title: '上传成功',
          })

          //修改当前显示url
          var canUseHeadImage = data.data.url
          self.setData({
            headImage: canUseHeadImage
          })

          //修改store中user的image属性
          user.image = canUseHeadImage
          wx.setStorageSync("user", user)

        } else {
          wx.showModal({
            title: '提示',
            content: "上传失败 desc=" + data.desc,
            showCancel: false
          })
        }
      }
    })



  },
  dealShowSelectImageBox(){
    this.setData({
      isShowSelectImageBox: !this.data.isShowSelectImageBox
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