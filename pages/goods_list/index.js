// pages/goods_list/index.js
import request from '../../request/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['综合', '销量', '价格'],
    // 保存商品数据
    goodsList: [],
    totalPages: 0
  },
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || ''
    this.QueryParams.query = options.query || ''
    // 请求商品数据
    this._getGoodsList()
  },

  // 页面上拉加载事件
  onReachBottom() {
    // 判断还有没有下一页数据
    // 没有数据直接return
    if (this.QueryParams.pagenum >= this.data.totalPages) return
    // 有数据重新发送网络请求
    this.QueryParams.pagenum++
    this._getGoodsList()
  },

  // 页面下拉刷新事件
  onPullDownRefresh() {
    // 重置数据
    this.QueryParams.pagenum = 1
    this.setData({
      goodsList: []
    })

    // 重新请求商品数据
    this._getGoodsList()

  },

  // 获取商品数据的相关方法
  async _getGoodsList() {
    let res = await request({
      url: 'goods/search',
      data: this.QueryParams
    })
    const totalPages = Math.ceil(res.message.total / this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.message.goods],
      totalPages
    })

    // 获取到数据后手动关闭下拉刷新窗口
    wx.stopPullDownRefresh()
  }
})