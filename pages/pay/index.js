// pages/cart/index.js

// 引入封装的代码
import request from '../../request/network'
import { showModal, showToast } from '../../utils/asyncWX'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    carts: [],
    allCarts: {}
  },

  onShow() {
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address')
    //  获取缓存中的额购物车数据
    let carts = wx.getStorageSync('carts')
    // 过滤未选中的商品
    let checkedCarts = carts.filter(item => item.checked)
    // 工具栏数据
    let allCarts = {
      // 总数量
      allCount: 0,
      // 总价格
      allPrices: 0
    }
    checkedCarts.forEach(item => {
      allCarts.allCount += item.count
      allCarts.allPrices += item.goods_price * item.count
    })
    // 给data中的数据赋值
    this.setData({
      address,
      // 购物车
      carts: checkedCarts,
      // 工具栏数据
      allCarts
    })
  },

  // 监听支付按钮的点击
  async handleOrderPay() {
    const token = wx.getStorageSync('token')
    // 判断缓存中有没有token
    if (!token) {
      // 没有token跳转到授权页面
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    // 创建订单
    // 准备请求头参数
    const header = { Authorization: token }
    // 准备请求体参数
    const order_price = this.data.allCarts.allPrices
    const consignee_addr = this.data.address.detailedAddress
    const carts = this.data.carts
    let goods = []
    carts.forEach(item => {
      goods.push({
        goods_id: item.goods_id,
        goods_number: item.count,
        goods_price: item.goods_price
      })
    })
    const orderParams = {
      order_price,
      consignee_addr,
      goods
    }
    // 发送请求, 获取订单编号
    // 获取到订单编号
    const order_number = await request({
      url: 'my/ordeers/create',
      method: 'post',
      data: orderParams,
      header
    })
    // console.log(res.order_number);
    // 发起预支付的网络请求
    const res = await request({
      url: 'my/orders/req_unifiedorder',
      method: 'post',
      header,
      data: {
        order_number
      }
    })
    console.log(res);
    // 发送支付请求
    // 发起支付请求会弹窗微信内置支付界面
    // wx.requestPayment({
    //   nonceStr: 'nonceStr',
    //   package: 'package',
    //   paySign: 'paySign',
    //   timeStamp: 'timeStamp',
    // })

    // 查询后台 查看支付状态
    // 手动删除缓存中, 已经支付了的商品
    let newCarts = wx.getStorageSync('carts')
    newCarts = newCarts.filter(item => !item.checked)
    wx - wx.setStorageSync('carts', newCarts)
    // 支付成功了跳转到订单页面
    wx.navigateTo({
      url: '/pages/order/index?type=1',
    })
  }
})