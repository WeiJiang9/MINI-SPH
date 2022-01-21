// index.js
// 获取应用实例
const app = getApp()

// 导入网络请求
import request from '../../request/network'

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航栏数组
    cateList: [],
    // 楼层数据数组
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图数据
    this._getSwiperList()
    // 请求导航分类数据
    this._getCateList()
    // 请求与楼层数据
    this._getFloorList()
  },
  // 自定义网络请求方法
  // 获取轮播图数据的方法
  async _getSwiperList() {
    const res = await request({
      url: 'home/swiperdata'
    })
    res.message.forEach(item => {
      // 将navigator_url中的 /main 替换为 /index
      //goods_id=17927
      //goods_id=55410
      //goods_id=50317
      ///index?goods_id=129
      item.navigator_url = item.navigator_url.replace(/main\?goods\_id\=129/, 'index?goods_id=55410')
      item.navigator_url = item.navigator_url.replace(/main\?goods\_id\=395/, 'index?goods_id=17927')
      item.navigator_url = item.navigator_url.replace(/main\?goods\_id\=38/, 'index?goods_id=50317')
    })
    this.setData({
      swiperList: res.message
    })
  },
  // 获取分类导航数据的方法
  async _getCateList() {
    const res = await request({
      url: 'home/catitems'
    })
    this.setData({
      cateList: res.message
    })

  },
  // 获取楼层数据的方法
  async _getFloorList() {
    const res = await request({
      url: 'home/floordata'
    })
    res.message.forEach(item1 => {
      item1.product_list.forEach(item2 => {
        item2.navigator_url = item2.navigator_url.replace(/\?/, '/index?')
      })
    })
    this.setData({
      floorList: res.message
    })

  }
})
