//index.js
const app = getApp()

Page({
  data: {
    current: 'homepage',
    ColorList: app.globalData.ColorList,
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    active: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    navData: [
      {
        name: "index",  //文本
        current: 1,    //是否是当前页，0不是  1是
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
        current: 0,
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

    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
    gridCol: 3,
    skin: false
  },
  // event.detail 的值为当前选中项的索引
  onChange(event) {
    console.log(event.detail);
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
        debugger;
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
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  gridchange: function (e) {
    this.setData({
      gridCol: e.detail.value
    });
  },
  gridswitch: function (e) {
    this.setData({
      gridBorder: e.detail.value
    });
  },
  menuBorder: function (e) {
    this.setData({
      menuBorder: e.detail.value
    });
  },
  menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  menuCard: function (e) {
    this.setData({
      menuCard: e.detail.value
    });
  },
  switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  gotoIndex: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  gotoUpdating: function () {
    debugger;
    wx.navigateTo({
      url: '../updatings/updatings',
    })

  },
  gotopublish: function () {
    wx.navigateTo({
      url: '../new/new',
    })

  },

  gotoMessages: function () {
    wx.navigateTo({
      url: '../news/news',
    })

  },
  bindViewMy: function () {
    wx.navigateTo({
      url: '../my/my',
    })
  }
  
  
})
