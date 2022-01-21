// pages/login/index.js
import { getUserInfo } from '../../utils/asyncWX'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUsereInfo() {
    // 弹窗提示用户登陆
    const {userInfo} = await getUserInfo('用于登陆')
    // 将用户信息保存到缓存中
    wx.setStorageSync('userinfo', userInfo)
    wx.navigateBack({
      delta: 1,
    })
  }
})