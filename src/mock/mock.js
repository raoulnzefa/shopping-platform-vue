import Mock from 'mockjs'
const Random = Mock.Random
Mock.setup({
  timeout: '200-500' // 表示响应时间介于 200 和 500 毫秒之间，默认值是'10-100'。
})
Mock.mock(/api\/getProductsList/, {
  productsList: {
    pc: {
      id: 1,
      title: 'PC产品',
      list: [
        { title: '数据统计', id: 0 },
        { title: '数据预测', id: 1 },
        {
          title: '流量分析',
          hot: true,
          id: 2
        },
        { title: '广告发布', id: 3 }
      ]
    },
    app: {
      id: 2,
      title: '手机应用类',
      list: [
        { title: '91助手', id: 0 },
        {
          title: '产品助手',
          hot: true,
          id: 1
        },
        { title: '智能地图', id: 2 },
        { title: '团队语音', id: 3 }
      ]
    }
  }
})
Mock.mock(/api\/getNewsList/, {
  newsList: [
    { title: '数据统计1' },
    { title: '数据统计2' },
    { title: '数据统计3' },
    { title: '数据统计4' }
  ]
})
Mock.mock(/api\/getSlidersInfo/, {
  slidersInfo: [
    {
      id: 1,
      title: 'xxx1',
      imgUrl: require('../assets/slideShow/pic1.jpg'),
      pathName: 'statistics'
    },
    {
      id: 2,
      title: 'xxx2',
      imgUrl: require('../assets/slideShow/pic2.jpg'),
      pathName: 'forecast'
    },
    {
      id: 3,
      title: 'xxx3',
      imgUrl: require('../assets/slideShow/pic3.jpg'),
      pathName: 'analysis'
    },
    {
      id: 4,
      title: 'xxx4',
      imgUrl: require('../assets/slideShow/pic4.jpg'),
      pathName: 'advertising'
    }
  ]
})
Mock.mock(/api\/getFeature/, {
  list: [
    {
      id: 0,
      title: '数据统计',
      desc: Random.csentence(10, 20),
      name: 'statistics'
    },
    {
      id: 1,
      title: '数据预测',
      desc: Random.csentence(10, 20),
      name: 'forecast'
    },
    {
      id: 2,
      title: '流量分析',
      desc: Random.csentence(10, 20),
      name: 'analysis'
    },
    {
      id: 3,
      title: '广告发布',
      desc: Random.csentence(10, 20),
      name: 'advertising'
    }
  ]
})
Mock.mock(/api\/login/, function (opts) {
  if (Math.random() > 0.5) {
    return {
      loginInfo: {
        loginStatus: true,
        username: JSON.parse(opts.body).username
      }
    }
  } else {
    return {
      loginInfo: {
        loginStatus: false
      }
    }
  }
})
Mock.mock(/api\/reg/, function (opts) {
  if (Math.random() > 0.5) {
    return {
      regInfo: {
        regStatus: true
      }
    }
  } else {
    return {
      regInfo: {
        regStatus: false
      }
    }
  }
})
Mock.mock(/api\/exit-login/, {
  loginInfo: {
    loginStatus: false
  }
})
// 流量分析
Mock.mock(/api\/getAnalysisInfo/, {
  list: {
    amount: {
      min: 0,
      max: 99
    },
    productTypeList: [
      {
        label: '入门版',
        value: 0
      },
      {
        label: '中级版',
        value: 1
      },
      {
        label: '高级版',
        value: 2
      }
    ],
    timeList: [
      {
        label: '半年',
        value: 0
      },
      {
        label: '一年',
        value: 1
      },
      {
        label: '三年',
        value: 2
      }
    ],
    otherList: [
      {
        label: '可选1',
        value: 0
      },
      {
        label: '可选2',
        value: 1
      },
      {
        label: '可选3',
        value: 2
      }
    ]

  }
})
Mock.mock(/api\/getPrice/, function (opts) {
  return {price: 550}
})
// 广告发布
Mock.mock(/api\/getAdvertisingInfo/, {
  list: {
    amount: {
      min: 20,
      max: 999
    },
    vocationList: [
      {
        label: '出版业',
        value: 0
      },
      {
        label: '媒体',
        value: 1
      },
      {
        label: '金融',
        value: 2
      },
      {
        label: '互联网',
        value: 3
      },
      {
        label: '游戏',
        value: 4
      }
    ],
    time: '半年',
    otherList: [
      {
        label: '可选1',
        value: 0
      },
      {
        label: '可选2',
        value: 1
      },
      {
        label: '可选3',
        value: 2
      }
    ]

  }
})
// 数据预测
Mock.mock(/api\/getForecastInfo/, {
  list: {
    amount: {
      min: 20,
      max: 999
    },
    time: '一年',
    mediumList: [
      {
        label: '纸质报告',
        value: 0
      },
      {
        label: 'pdf',
        value: 1
      },
      {
        label: '页面报告',
        value: 2
      },
      {
        label: '邮件',
        value: 3
      }
    ]

  }
})
// 数据统计
Mock.mock(/api\/getStatisticsInfo/, {
  list: {
    time: '半年',
    productTypeList: [
      {
        label: '红色版',
        value: 0
      },
      {
        label: '绿色版',
        value: 1
      },
      {
        label: '紫色版',
        value: 2
      }
    ],
    regionList: [
      {
        label: '北京',
        value: 0
      },
      {
        label: '上海',
        value: 1
      },
      {
        label: '广州',
        value: 2
      }
    ]

  }
})

Mock.mock(/api\/confirmBuy/, {
  buyId: 'adskj34'
})
Mock.mock(/api\/verifyPayRes/, function (ops) {
  console.log('服务器收到的id是：', JSON.parse(ops.body).buyId)
  if (Math.random() > 0.5) {
    return {
      payStatus: true
    }
  }
  return {
    payStatus: false
  }
})
