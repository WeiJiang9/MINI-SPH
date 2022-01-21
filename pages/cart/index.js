// pages/cart/index.js

// 引入封装的代码
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
    let carts = wx.getStorageSync('carts') || []
    this.setData({
      address
    })
    //  重新设置购物车和工具栏数据
    this._setCarts(carts)
  },

  // 监听获取收货地址的点击
  handleChooseAddress() {
    // 调用获取用户收货地址的API
    wx.chooseAddress({
      success: (result) => {
        const detailedAddress = result.provinceName + result.cityName + result.countyName + result.detailInfo
        result.detailedAddress = detailedAddress
        // 把获取到的收货地址保存到缓存中
        wx.setStorageSync('address', result)
      }
    })
  },

  // 监听商品复选框的点击
  handleItemChange(e) {
    // 获取被点击商品的di
    const goods_id = e.currentTarget.dataset.id
    // 获取购物车数组
    let carts = this.data.carts
    // 找到被点击的商品在购物车中的位置
    let currentItem = carts.find(item => item.goods_id === goods_id)
    // 选中状态取反
    currentItem.checked = !currentItem.checked
    // 把修改的值重新保存到data中和缓存中
    this._setCarts(carts)
  },

  // 监听全选按钮的点击
  handleAllcheck() {
    // 获取工具栏的全选变量和购物车数据
    let { carts, allCarts } = this.data
    // 修改全选变量的值
    allCarts.allChecked = !allCarts.allChecked
    // 修改全部商品的选中状态
    carts.forEach(item => item.checked = allCarts.allChecked)
    // 把修改的值重新保存到data中和缓存中
    this._setCarts(carts)
  },

  // 监听商品数量+-的点击
  async handleItemCountEdit(e) {
    // 获取点击的id和数量
    const { id, operation } = e.currentTarget.dataset
    // 获取购物车信息
    let carts = this.data.carts
    // 获取点击的元素
    let index = carts.findIndex(item => item.goods_id === id)
    // 判断数量是否小于1
    if (carts[index].count + operation < 1) {
      // 弹窗提示用户是否删除当前商品
      const res = await showModal({
        title: '提示',
        content: '是否删除当前商品',
      })
      // 判断用户是否点击了确定
      if (res.confirm) {
        // 删除商品
        carts.splice(index, 1)
        // 重新保存
        this._setCarts(carts)
      }
    } else {
      // 执行+ - 操作
      carts[index].count += operation
      // 把修改的值重新保存到data中和缓存中
      this._setCarts(carts)
    }
  },

  // 监听结算按钮的点击
  async handlePay() {
    // 获取地址信息 / 购物车信息 / 工具栏数据
    let { address, carts, allCarts } = this.data
    // 判断购物车是否为空
    if (carts.length === 0) {
      await showToast({ title: '您还没有添加商品' })
      return
    }
    // 判断是否选中商品
    if (allCarts.allCount === 0) {
      await showToast({ title: '请选择您要购买的商品' })
      return
    }
    // 判断是否有收货地址
    if (address.length === 0) {
      await showToast({ title: '您还没有添加收货地址' })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },

  // 底部工具栏获取数据的相关方法
  _setCarts(carts) {
    // 把修改的值重新保存到data中和缓存中
    wx.setStorageSync('carts', carts)
    // 工具栏数据
    let allCarts = {
      // 是否全选
      allChecked: true,
      // 总数量
      allCount: 0,
      // 总价格
      allPrices: 0
    }
    // 判断购物车是否为空
    if (carts.length !== 0) {
      carts.forEach(item => {
        if (item.checked) {
          allCarts.allCount += item.count
          allCarts.allPrices += item.goods_price * item.count
        } else {
          allCarts.allChecked = false
        }
      })
    } else {
      allCarts.allChecked = false
    }

    // 给data中的数据赋值
    this.setData({
      // 购物车
      carts,
      // 工具栏数据
      allCarts
    })
  }
})