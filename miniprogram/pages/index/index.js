//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },
  onLoad: function (options) {
    wx.request({
      url: 'http://127.0.0.1:8080/ssm/admin', // 仅为示例，并非真实的接口地址
      data: {
        x: 'x',
        y: 'y'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  getCategory:function(){
    wx.request({
      url: 'http://localhost:8080/ssm/admin', // 仅为示例，并非真实的接口地址
      data: {
        x: 'x',
        y: 'y'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  }
  
  
})
