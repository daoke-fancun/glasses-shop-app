Page({
  data: {
    latestRecord: {
      date: '2024-01-15',
      leftEye: {
        sph: '-2.50',
        cyl: '-0.50',
        axis: '180'
      },
      rightEye: {
        sph: '-2.00',
        cyl: '-0.75',
        axis: '175'
      },
      pd: '62mm'
    }
  },
  
  onLoad: function () {
    console.log('会员中心页面加载');
    // 初始化云函数
    this.initCloud();
    // 获取最新验光记录
    this.getLatestOptometryRecord();
  },
  
  onShow: function () {
    // 页面显示时获取最新数据
    this.getLatestOptometryRecord();
  },
  
  // 初始化云函数
  initCloud: function () {
    // 初始化云开发环境
    wx.cloud.init({
      env: 'your-cloud-env-id', // 替换为你的云开发环境ID
      traceUser: true
    });
  },
  
  // 获取最新验光记录
  getLatestOptometryRecord: function () {
    wx.showLoading({
      title: '加载中...'
    });
    
    // 调用云函数获取最新验光记录
    wx.cloud.callFunction({
      name: 'getOptometryData',
      data: {
        type: 'latest'
      }
    }).then(res => {
      wx.hideLoading();
      if (res.result.success) {
        this.setData({
          latestRecord: res.result.data
        });
      }
    }).catch(err => {
      console.error('获取验光记录失败:', err);
      wx.hideLoading();
    });
  },
  
  // 导航到详细验光报告页面
  navigateToOptometryDetail: function () {
    wx.navigateTo({
      url: '../optometry-detail/optometry-detail'
    });
  }
})