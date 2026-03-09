Page({
  data: {
    reportData: {
      date: '2024-01-15',
      name: '张三',
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
      pd: {
        left: '31',
        right: '31'
      },
      remark: '视力略有下降，建议定期复查'
    },
    historyRecords: [
      {
        date: '2023-07-20',
        leftEye: {
          sph: '-2.25',
          cyl: '-0.50',
          axis: '180'
        },
        rightEye: {
          sph: '-1.75',
          cyl: '-0.75',
          axis: '175'
        }
      },
      {
        date: '2023-01-10',
        leftEye: {
          sph: '-2.00',
          cyl: '-0.50',
          axis: '180'
        },
        rightEye: {
          sph: '-1.50',
          cyl: '-0.75',
          axis: '175'
        }
      }
    ]
  },
  
  onLoad: function () {
    console.log('详细验光报告页面加载');
    // 初始化云函数
    this.initCloud();
    // 获取验光报告数据
    this.getOptometryReport();
  },
  
  // 初始化云函数
  initCloud: function () {
    // 初始化云开发环境
    wx.cloud.init({
      env: 'your-cloud-env-id', // 替换为你的云开发环境ID
      traceUser: true
    });
  },
  
  // 获取验光报告数据
  getOptometryReport: function () {
    wx.showLoading({
      title: '加载中...'
    });
    
    // 调用云函数获取详细验光报告
    wx.cloud.callFunction({
      name: 'getOptometryData',
      data: {
        type: 'latest'
      }
    }).then(res => {
      wx.hideLoading();
      if (res.result.success) {
        this.setData({
          reportData: res.result.data
        });
      }
    }).catch(err => {
      console.error('获取验光报告失败:', err);
      wx.hideLoading();
    });
  }
})