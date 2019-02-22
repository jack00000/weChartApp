//index.js
const app = getApp();

Page({
  data: {
    current: 'homepage',
    //ColorList: app.globalData.ColorList,
    //这里犯啦一个错 avatarUrl: app.globalData.userInfo.avatarUrl X 目前app没有这个值
    avatarUrl: '',
    userInfo: {},
    indexData:null,
    logged: false,
    takeSession: false,
    requestResult: '',
    active: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: [{
      title: '#java',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '#python',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '#c#',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '#c++',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '#node.js',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '#python',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '#vb',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '#go',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '#ruby',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '#php',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '#javascript',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '#kotlin',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '#pcle',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '#lua',
      name: 'black',
      color: '#333333'
    },
    ],
    tower: [{
      id: 0,
      url: 'https://image.weilanwl.com/img/4x3-1.jpg'
    }, {
      id: 1,
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }, {
      id: 2,
      url: 'https://image.weilanwl.com/img/4x3-3.jpg'
    }, {
      id: 3,
      url: 'https://image.weilanwl.com/img/4x3-4.jpg'
    }, {
      id: 4,
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }, {
      id: 5,
      url: 'https://image.weilanwl.com/img/4x3-4.jpg'
    }, {
      id: 6,
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }],
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
      name: 'My Posts'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: 'admire'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: 'be admired'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: 'my wallet'
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://app3.qdaily.com/wxapp/homes/index/0.json',
      success: function (res) {
        var data = res.data.response;
        var swiperData = data.banners;
        var feedsData = data.feeds;
        var lastkey = data.last_key;
        that.setData({
          swiperData: swiperData,
          feedsData: feedsData,
          lastkey: lastkey,
          avatarUrl: app.globalData.userInfo.avatarUrl
        });
      }
    });
    wx.request({
      url: 'http://localhost:8888/ssm/getIndexData',
      success: function (res) {
        var data = res.data.respond;
        that.setData({
          //爲什麽不行
         indexData:data 
        });
      }
    })
  },
  onPostTap: function (evt) {
    var postid = evt.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post/post-detail/post-detail?id=' + postid
    });
  },
  onSwiperTap: function (evt) {
    var swiperid = evt.currentTarget.dataset.swiperid;
    wx.navigateTo({
      url: 'post/post-detail/post-detail?id=' + swiperid
    });
  },
  // https://app3.qdaily.com/wxapp/homes/index/1497234291_946656000.json
  onReachBottom: function (event) {
    wx.showNavigationBarLoading();
    var that = this;
    var lastkey = that.data.lastkey;
    wx.request({
      url: 'https://app3.qdaily.com/wxapp/homes/index/' + lastkey + '.json',
      success: function (res) {
        var newData = res.data.response;
        var newFeedsData = newData.feeds;
        var lastkey = newData.last_key;
        var newFeeds = that.data.feedsData.concat(newFeedsData);
        that.setData({
          feedsData: newFeeds,
          lastkey: lastkey
        });
        wx.hideNavigationBarLoading();
      }
      // 175497
      // 149840
    })
  },
  onPullDownRefresh: function (event) {
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://app3.qdaily.com/wxapp/homes/index/0.json',
      success: function (res) {
        var data = res.data.response;
        var swiperData = data.banners;
        var feedsData = data.feeds;
        var lastkey = data.last_key;
        that.setData({
          swiperData: swiperData,
          feedsData: feedsData,
          lastkey: lastkey
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
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
      success: function (res) { 
        
      },
      fail: function (res) { },
      complete: function (res) {
        wx.stopPullDownRefresh();
      }
    })
  },
  topSearch:function(e){
      debugger
      //从后台查询文章数据用于显示 包含1.简介数据 2. 具体内容数据
  }

  
  
})
