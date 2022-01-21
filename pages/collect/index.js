// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collects: [],
    tabs: ['商品收藏', '品牌收藏', '店铺收藏', '浏览足迹']
  },

  onShow: function () {
    // 取出缓存中收藏的列表
    let collects = wx.getStorageSync('collects') || []
    // 将收藏列表保存到data中
    this.setData({
      collects
    })
  }

})