const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    current: 'homepage',
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
        current: 1,
        style: 0,
        ico: 'icon-wode',
        fn: 'bindViewMy'
      },
    ],
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'My Posts'
    }, {
        icon: 'recordfill',
        color: 'orange',
        badge: 1,
        name: 'Admire'
      }, {
        icon: 'picfill',
        color: 'yellow',
        badge: 0,
        name: 'Be Admired'
      }, {
        icon: 'noticefill',
        color: 'olive',
        badge: 22,
        name: 'My Wallet'
      }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: 'Favourites'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: 'Popular'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: 'Recend'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: 'help'
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
    wx.redirectTo({
      url: '../my/my',
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
  toMyGithubView:function(){
    wx.redirectTo({
      url: './list/myGithub/myGithub',
    })
  },
  /**
   * 跳转到具体页面
   */
  jump2detail:function(){
    wx.redirectTo({
      url: './myPosts/myPost',
    })
  }
  
})