Page({
  data: {
    userInfo: {
      name: '用户姓名',
      phone: '138****8888'
    },
    optometryData: {
      date: '',
      name: '',
      leftEye: {
        sph: '',
        cyl: '',
        axis: ''
      },
      rightEye: {
        sph: '',
        cyl: '',
        axis: ''
      },
      pd: ''
    },
    healthStatus: 'healthy', // healthy 或 warning
    daysSinceLastCheck: 0,
    filterOptions: ['全部时间', '最近3个月', '最近6个月', '最近1年'],
    filterIndex: 0
  },
  
  onLoad: function () {
    console.log('我的页面加载');
    // 初始化云函数
    this.initCloud();
    // 获取验光数据
    this.getOptometryData();
  },
  
  onShow: function () {
    // 页面显示时执行
    // 获取最新的验光记录
    this.getOptometryData();
  },
  
  // 初始化云函数
  initCloud: function () {
    // 初始化云开发环境
    wx.cloud.init({
      env: 'your-cloud-env-id', // 替换为你的云开发环境ID
      traceUser: true
    });
  },
  
  // 获取验光数据
  getOptometryData: function () {
    wx.showLoading({
      title: '加载中...'
    });
    
    // 调用云函数获取最新验光数据
    wx.cloud.callFunction({
      name: 'getOptometryData',
      data: {
        type: 'latest'
      }
    }).then(res => {
      if (res.result.success) {
        const optometryData = res.result.data;
        this.setData({
          optometryData: optometryData
        });
        // 计算距离上次验光的天数和健康状态
        this.calculateHealthStatus(optometryData.date);
      }
      wx.hideLoading();
    }).catch(err => {
      console.error('获取验光数据失败:', err);
      wx.hideLoading();
      // 使用默认数据
      this.useDefaultData();
    });
  },
  
  // 使用默认数据
  useDefaultData: function () {
    const defaultData = {
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
      pd: '62mm'
    };
    
    this.setData({
      optometryData: defaultData
    });
    // 计算距离上次验光的天数和健康状态
    this.calculateHealthStatus(defaultData.date);
  },
  
  // 计算健康状态
  calculateHealthStatus: function (dateString) {
    // 解析验光日期
    const optometryDate = new Date(dateString);
    // 获取当前日期
    const today = new Date();
    // 计算时间差（毫秒）
    const timeDiff = today.getTime() - optometryDate.getTime();
    // 转换为天数
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    // 判断健康状态：超过180天需要复查
    const healthStatus = daysDiff > 180 ? 'warning' : 'healthy';
    
    // 更新数据
    this.setData({
      daysSinceLastCheck: daysDiff,
      healthStatus: healthStatus
    });
  },
  
  // 时间筛选变化
  bindFilterChange: function (e) {
    const filterIndex = e.detail.value;
    this.setData({
      filterIndex: filterIndex
    });
    
    // 根据筛选条件获取数据
    let filterDate = '';
    const now = new Date();
    
    switch (filterIndex) {
      case 1: // 最近3个月
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        filterDate = threeMonthsAgo.toISOString().split('T')[0];
        break;
      case 2: // 最近6个月
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        filterDate = sixMonthsAgo.toISOString().split('T')[0];
        break;
      case 3: // 最近1年
        const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        filterDate = oneYearAgo.toISOString().split('T')[0];
        break;
      default: // 全部时间
        filterDate = '';
    }
    
    // 这里可以根据筛选条件重新获取数据
    console.log('筛选条件:', filterDate);
  },
  
  // 导航到预约页面
  navigateToAppointment: function () {
    wx.navigateTo({
      url: '../appointment/appointment'
    });
  },
  
  // 导航到验光数据页面
  navigateToOptometry: function () {
    wx.navigateTo({
      url: '../optometry/optometry'
    });
  },
  
  // 导航到验光记录列表页面
  navigateToOptometryList: function () {
    wx.navigateTo({
      url: '../optometry-list/optometry-list'
    });
  },
  
  // 导航到会员中心页面
  navigateToMember: function () {
    wx.navigateTo({
      url: '../member/member'
    });
  }
})