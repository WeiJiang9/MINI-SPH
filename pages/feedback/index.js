// pages/feetback/index.js
import { uploadFile } from '../../utils/asyncWX'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['体验问题', '商品、商家投诉'],
    // 保存用户选择的图片
    chooseImgs: [],
    // 文本域的内容
    textVal: ''
  },
  // 保存外网的图片路径数组
  upLoadImgs: [],

  // 监听 + 号按钮的点击
  handleChooseImg() {
    // 调用小程序内置的选择图片的API
    wx.chooseImage({
      // 同时选择图片的数量
      count: 9,
      success: (res) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...res.tempFilePaths]
        })
      }
    })
  },

  // 监听删除图片的点击
  handleRemoveImg(e) {
    // 拿到 当前被点击的图片
    const src = e.detail.src
    // 拿到所有图片的数组
    const chooseImgs = this.data.chooseImgs
    // 找到当前图片对应的索引
    const index = chooseImgs.findIndex(item => item === src)
    // 从数组中删除当前图片
    chooseImgs.splice(index, 1)
    // 将图片数组重新保存到data中
    this.setData({
      chooseImgs
    })
  },

  // 监听文本域的输入事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },

  // 监听提交按钮的点击事件
  handleFormSubmit() {
    // 获取文本域的内容和图片数组
    const value = this.data.textVal.trim()
    const chooseImages = this.data.chooseImgs
    // 验证文本域的内容是否合法
    if (value.length === 0) {
      wx.showToast({
        title: '请输入您遇到的问题',
        icon: 'none'
      })
      return
    }
    // 准备上传图片 到专门的图片服务器
    // 上传文件的 API 不支持多个文件同时上传
    // 只能遍历数组, 挨个上传
    //
    // chooseImages.forEach(item => {
    //  uploadFile({
    //   filePah: item,
    //   name: 'file'
    // }).then(res => {
    //   console.log(res);
    // })
    //   wx.uploadFile({
    //     filePath: item,
    //     name: 'file',
    //     url: 'https://images.ac.cn/Home/Index/UploadAction/',
    //     success: (res) => {
    //       console.log(res);
    //     }
    //   })
    // })

    // 把文本域的内容和图片数组 提交到服务器

    // 清空文本域和图片数组
    this.setData({
      chooseImgs: [],
      textVal: ''
    })

    //  反馈成功的提示框
    wx.showToast({
      title: '反馈成功',
    })

    // 返回上一个页面
    wx.navigateBack({
      delta: 1,
    })
  }
})