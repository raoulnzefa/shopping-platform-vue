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
        { title: '数据统计' },
        { title: '数据预测' },
        {
          title: '流量分析',
          hot: true
        },
        { title: '广告发布' }
      ]
    },
    app: {
      id: 2,
      title: '手机应用类',
      list: [
        { title: '91助手' },
        {
          title: '产品助手',
          hot: true
        },
        { title: '智能地图' },
        { title: '团队语音' }
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
      imgUrl: require('../assets/slideShow/pic1.jpg')
    },
    {
      id: 2,
      title: 'xxx2',
      imgUrl: require('../assets/slideShow/pic2.jpg')
    },
    {
      id: 3,
      title: 'xxx3',
      imgUrl: require('../assets/slideShow/pic3.jpg')
    },
    {
      id: 4,
      title: 'xxx4',
      imgUrl: require('../assets/slideShow/pic4.jpg')
    }
  ]
})
Mock.mock(/api\/getFeature/, {
  'list': [
    {
      'id': 0,
      title: '@ctitle(4)',
      desc: Random.csentence(10, 20)
    },
    {
      'id': 1,
      title: '@ctitle(4)',
      desc: Random.csentence(10, 20)
    },
    {
      'id': 2,
      title: '@ctitle(4)',
      desc: Random.csentence(10, 20)
    },
    {
      'id': 3,
      title: '@ctitle(4)',
      desc: Random.csentence(10, 20)
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
