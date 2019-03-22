const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
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
    multiArray: [
      ['无脊柱动物', '脊柱动物'],
      ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
      ['猪肉绦虫', '吸血虫']
    ],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ], [
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ], [
        {
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2018-12-25',
    region: ['广东省', '广州市', '海珠区'],
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
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
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
      url: 'http://localhost:8983/solr/how2java/select?q=' + "name:" + e.detail.value.input,
      method: 'post',
      data: {
         //这里是发送给服务器的参数（参数名：参数值） 
        // uid:app.globalData.,
        // cid:cid,
        title: paper.title,
        description:paper.description,
        content:paper.content
         

      }, 
      header: {
        'content-type': 'application/x-www-form-urlencoded'  //这里注意POST请求content-type是小写，大写会报错  
      },  
      success: function (res) {
        var indexData = res.data.respond; debugger

        that.setData({
          //爲什麽不行
          indexData: indexData
        });
      }

    })
  }

})