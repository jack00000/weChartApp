const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },
  onLoad: function () { },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.request({
      url: 'http://127.0.0.1:8080/ssm/getCategory',
      data: {},
      method: 'GET',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) {
        wx.stopPullDownRefresh();
      }
    })
  }

});
