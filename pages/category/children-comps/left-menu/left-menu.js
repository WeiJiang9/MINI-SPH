// pages/category/children-comps/left-menu/left-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    leftMenuList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e) {
      let index = e.target.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent("handleItemTap", { index })
    }
  }
})
