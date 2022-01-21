// pages/order/index.js
import request from '../../request/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部', '待付款', '待发货', '退款/退货'],
    orders: [
      ['订单1', '订单2', '订单3', '订单4'],
      ['待付款1', '待付款2', '待付款3', '待付款4'],
      ['待发货1', '待发货2', '待发货3', '待发货4'],
      ['退款1', '退款2', '退款3', '退款4'],
    ],
    currentIndex: 0
  },
  // onShow生命周期里 无法接收 options 参数
  // 在onShow里面获取数据
  onShow() {
    // 获取缓存中的token 并判断token
    const token = wx.getStorageSync('token')
    if (!token) {
      // 没有token直接跳转到授权页面并return
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    // 获取当前小程序的页面栈-数组 长度最大是10页面
    let pages = getCurrentPages()
    // 数组中索引最大的就是当前页面
    let currentPage = pages[pages.length - 1]
    // 可以在当前页面拿到 options 参数
    const { type } = currentPage.options
    // 将数据设置给currentIndex并传递给TabBar
    this.setData({
      currentIndex: type - 1
    })
    this._getOrders(type)
  },

  // 监听TabBar的点击
  barItemClick(e) {
    const { index } = e.detail
    this.setData({
      currentIndex: index
    })
  },

  // 获取订单列表的方法
  async _getOrders(type) {
    const res = await request({
      url: 'my/orders/all',
      // header: { token },
      data: { type }
    })
  }
})