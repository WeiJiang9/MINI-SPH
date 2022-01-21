// pages/category/index.js
import request from '../../request/network'
Page({

  data: {
    // 所有的商品数据
    Cates: [],
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContentList: [],
    // scroll-view标签距离顶部的距离
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求分类数据
    // 获取本地储存中的数据
    const Cates = wx.getStorageSync('cates')
    // 判断本地存储中有有没有旧数据
    if (!Cates) {
      // 本地储存没有数据重新发送网络请求
      this._getCategory()
    } else {
      // 本地存储有数据
      // 判断过期时间
      if (Date.now() - Cates.time > 1000 * 300) {
        // 过期了重新发送网络请求
        this._getCategory()
      } else {
        // 没有过期直接使用旧数据
        this.data.Cates = Cates.data
        let leftMenuList = this.data.Cates.map(item => item.cat_name)
        let rightContentList = this.data.Cates[0].children
        this.setData({
          leftMenuList,
          rightContentList
        })
      }
    }
  },
  // 监听左侧菜单项的点击
  handleItemTap(e) {
    const { index } = e.detail
    let rightContentList = this.data.Cates[index].children
    this.setData({
      rightContentList,
      // 重新设置scroll-view标签距离顶部的距离
      scrollTop: 0
    })
  },

  // 获取分类数据的相关方法
  // ES7的async
  async _getCategory() {
    const res = await request({
      url: 'categories'
    })
    if (res.meta.status === 200) {
      this.data.Cates = res.message
      // 把数据存储在本地存储中
      wx.setStorageSync('cates', { time: Date.now(), data: this.data.Cates })
      let leftMenuList = this.data.Cates.map(item => item.cat_name)
      let rightContentList = this.data.Cates[0].children
      this.setData({
        leftMenuList,
        rightContentList
      })
    }
    // Promise
    // request({
    //   url: 'categories'
    // })
    // .then(res => {
    //   if (res.meta.status === 200) {
    //     this.data.Cates = res.message
    //     // 把数据存储在本地存储中
    //     wx.setStorageSync('cates', { time: Date.now(), data: this.data.Cates })
    //     let leftMenuList = this.data.Cates.map(item => item.cat_name)
    //     let rightContentList = this.data.Cates[0].children
    //     this.setData({
    //       leftMenuList,
    //       rightContentList
    //     })
    //   }
    // })
  }
})