// pages/search/index.js
import request from '../../request/network'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 保存商品数据
    goodsList: [],
    // 输入框的内容
    values: ''
  },
  timeId: null,

  // 监听输入框内容的改变
  handleInput(e) {
    // 获取到用户输入的内容
    let value = e.detail.value.trim()
    // 检验合法性
    if (!value) {
      return
    }
    this.timeId && clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      // 发送网络请求
      this._qsearch(value)
    }, 1000);
  },
  // 监听取消按钮的点击
  handleClear() {
    clearTimeout(this.timeId)
    this.setData({
      goodsList: [],
      values: ''
    })
  },

  //获取数据的相关方法
  async _qsearch(query) {
    const res = await request({
      url: 'goods/qsearch',
      data: {
        query
      }
    })
    this.setData({
      goodsList: res.message
    })
  }
})
