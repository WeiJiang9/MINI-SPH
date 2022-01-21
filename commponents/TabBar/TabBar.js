// pages/goods_list/child-comps/tab-bar/tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array
    },
    currentIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    barItemClick(e) {
      const index = e.target.dataset.index
      this.triggerEvent('barItemClick', { index })
      this.setData({
        currentIndex: index
      })
    }
  }
})
