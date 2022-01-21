// commponents/UpImg/UpImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String
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
    handleRemoveImg() {
      // 讲台删除按钮的点击,并将事件和src传递给父组件
      this.triggerEvent("handleRemoveImg", { src: this.properties.src })
    }
  }
})
