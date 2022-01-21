const showModal = (option) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...option,
      success: resolve,
      fail: reject
    })
  })
}

const showToast = (option) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: option.title,
      icon: option.icon || 'none',
      success: resolve,
      fail: reject
    })
  })
}

const login = (option) => {
  return new Promise((resolve, reject) => {
    wx.login({
      ...option,
      success: resolve,
      fail: reject
    })
  })
}


const getUserInfo = (desc) => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: desc,
      success: resolve,
      fail: reject
    })
  })
}


const uploadFile = (options) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      filePath: options.filePath,
      name: options.name,
      url: 'https://images.ac.cn/Home/Index/UploadAction/',
      success: resolve,
      fail: reject
    })
  })
}

export { showModal, showToast, login, getUserInfo, uploadFile }