const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    content:null,
    navData: [
      {
        name: "index",  //文本
        current: 0,    //是否是当前页，0不是  1是
        style: 0,     //样式
        ico: 'icon-homefill',  //不同图标
        fn: 'gotoIndex'   //对应处理函数
      }, {
        name: "updating",
        current: 0,
        style: 0,
        ico: 'icon-discover',
        fn: 'gotoUpdating'
      }, {
        name: "publish",
        current: 1,
        style: 1,
        ico: '',
        fn: 'gotopublish'
      }, {
        name: "news",
        current: 0,
        style: 0,
        ico: 'icon-commentfill',
        fn: 'gotoMessages'
      }, {
        name: "my",
        current: 0,
        style: 0,
        ico: 'icon-wode',
        fn: 'bindViewMy'
      },
    ],
   
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2018-12-25',
   
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
 
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  gotoIndex: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  gotoUpdating: function () {
    debugger;
    wx.redirectTo({
      url: '../updatings/updatings',
    })

  },
  gotopublish: function () {
    wx.redirectTo({
      url: '../new/new',
    })

  },

  gotoMessages: function () {
    wx.redirectTo({
      url: '../news/news',
    })

  },
  bindViewMy: function () {
    wx.redirectTo({
      url: '../my/my',
    })
  },
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
  },
  formSubmit:function(e){
    var that = this;
    var paper = e.detail.value;
    console.log(e.detail.value); debugger
    wx.request({
      url: 'http://localhost:8888/ssm/new/insertPaper',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'  //这里注意POST请求content-type是小写，大写会报错  
      },  
      data: {
         //这里是发送给服务器的参数（参数名：参数值） 
        // uid:app.globalData.,
        // cid:cid,
        title: paper.title,
        description:paper.description,
        content:content
      }, 
    }),
    wx.redirectTo({
      url: '../updatings/updatings',
    })
  },
  //跳转到编辑页面
  junp2edit:function(evt){
    var postid = evt.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'editor/editor'
    });
  },
  onLoad:function(){
    var that=this;
    wx.getStorage({
      key: 'form',
      success: function (res) {
        console.log(res.data)
        that.setData({
          content:res.data
        })
      }
    })
  }

})