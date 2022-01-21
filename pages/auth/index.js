// pages/auth/index.js
import { login } from '../../utils/asyncWX'
import request from '../../request/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 监听授权按钮的点击
  async handleGetUserInfo(e) {
    try {
      // 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail
      // 获取小程序登陆成功后的code
      const { code } = await login()
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      }
      // 发送请求获取token
      const res = await request({
        url: 'users/wxlogin',
        method: 'post',
        data: loginParams
      })
      // const token = res.message.token
      // 将token保存到缓存中, 同时跳转到上一个页面
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta: 1,
      })
    } catch(err) {
      console.log(err);
    }
  }
})