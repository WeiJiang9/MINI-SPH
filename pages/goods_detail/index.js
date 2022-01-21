// pages/goods_detail/index.js
import request from '../../request/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    // 拿到当前阿页面的options
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options
    // 请求商品详情数据
    this._getGoodsDetail(options.goods_id)
  },

  // 监听轮播图点击预览大图
  handlePreviewImage(e) {
    const index = e.currentTarget.dataset.index
    const urls = this.data.goodsObj.pics.map(item => item.pics_big)
    wx.previewImage({
      urls: urls,
      current: urls[index]
    })
  },

  // 监听点击加入购物车
  hanbleAddCart() {
    // 获取缓存中的购物车数据
    let carts = wx.getStorageSync('carts') || []
    // 判断当前商品是否存在缓存的购物车中
    let currentCart = carts.find(item => item.goods_id === this.data.goodsObj.goods_id)
    if (currentCart) {
      // 当前商品存在缓存中
      currentCart.count++
      wx.showToast({
        title: '当前商品数量+1',
        icon: 'success',
        mask: true
      })
    } else {
      // 当前商品不存在缓存中
      this.data.goodsObj.count = 1
      this.data.goodsObj.checked = true
      carts.push(this.data.goodsObj)
      wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        mask: true
      })
    }
    // 把购物车数据重新保存到缓存中
    wx.setStorageSync('carts', carts)
  },

  // 监听收藏按钮的点击
  handleCollect() {
    // 定义收藏状态 
    let isCollect = false
    // 顶替弹窗提示的内容
    let title = ''
    // 获取缓存中的商品收藏列表
    let collects = wx.getStorageSync('collects') || []
    // 判断该商品是否被收藏
    let index = collects.findIndex(item => item.goods_id === this.data.goodsObj.goods_id)
    // 判断是否被收藏过
    if (index !== -1) {
      // 已经收藏过
      // 在收藏的数组中删除该商品
      collects.splice(index, 1)
      // 弹窗提示
      title = '取消成功'
    } else {
      // 将该商品添加到收藏的列表中
      collects.push(this.data.goodsObj)
      // 修改收藏状态
      isCollect = true
      // 弹窗提示
      title = '收藏成功'
    }

    // 将数组重新保存到缓存中
    wx.setStorageSync('collects', collects)
    // 修改data中的收藏状态
    this.setData({
      isCollect: isCollect
    })
    // 弹窗提示
    wx.showToast({
      title: title,
    })
  },

  // 获取数据相关方法
  async _getGoodsDetail(goods_id) {
    const res = await request({
      url: 'goods/detail',
      data: {
        goods_id
      }
    })
    const goodsObj = {
      goods_id: res.message.goods_id,
      pics: res.message.pics,
      goods_price: res.message.goods_price,
      goods_name: res.message.goods_name,
      goods_introduce: res.message.goods_introduce.replace(/\.webp/g, '.jpg')
    }
    // 获取缓存中的商品收藏的数组
    let collects = wx.getStorageSync('collects') || []
    // 判断当前商品是否被收藏了
    let isCollect = collects.some(item => item.goods_id === goodsObj.goods_id)
    this.setData({
      goodsObj,
      isCollect
    })
  }
})