// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectsCount: 0
  },
  onShow() {
    // 获取缓存中的用户信息
    const userInfo = wx.getStorageSync('userinfo')

    // 获取缓存中的收藏列表
    let collects = wx.getStorageSync('collects')
    // 将数据保存到data中
    this.setData({
      // 用户信息 
      userInfo,
      // 收藏数量
      collectsCount: collects.length
    })
  },
  userLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  }
})