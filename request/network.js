// 同时发送异步请求的次数
let ajaxTimes = 0
function request(params) {
  ajaxTimes++
  wx.showLoading({
    title: '加载中ing',
    mask: true
  })
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1/'
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + params.url,
      method: params.method || 'get',
      timeout: params.timeout || 5000,
      data: params.data,
      success: (res) => {
        resolve(res.data)
      },
      fail: reject,
      complete: () => {
        ajaxTimes--
        if (ajaxTimes === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}

export default request