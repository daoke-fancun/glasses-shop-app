Page({
  data: {
    name: '',
    date: '',
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
    pd: {
      left: '',
      right: ''
    },
    remark: ''
  },
  
  onLoad: function () {
    console.log('验光数据页面加载');
    // 初始化云函数
    this.initCloud();
  },
  
  // 初始化云函数
  initCloud: function () {
    // 初始化云开发环境
    wx.cloud.init({
      env: 'your-cloud-env-id', // 替换为你的云开发环境ID
      traceUser: true
    });
  },
  
  // 姓名输入
  bindNameInput: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  
  // 日期选择
  bindDatePicker: function () {
    const that = this;
    wx.showDatePicker({
      startDate: new Date(),
      success: function (res) {
        that.setData({
          date: res.date
        });
      }
    });
  },
  
  // 左眼数据输入
  bindLeftSphInput: function (e) {
    this.setData({
      'leftEye.sph': e.detail.value
    });
  },
  
  bindLeftCylInput: function (e) {
    this.setData({
      'leftEye.cyl': e.detail.value
    });
  },
  
  bindLeftAxisInput: function (e) {
    this.setData({
      'leftEye.axis': e.detail.value
    });
  },
  
  // 右眼数据输入
  bindRightSphInput: function (e) {
    this.setData({
      'rightEye.sph': e.detail.value
    });
  },
  
  bindRightCylInput: function (e) {
    this.setData({
      'rightEye.cyl': e.detail.value
    });
  },
  
  bindRightAxisInput: function (e) {
    this.setData({
      'rightEye.axis': e.detail.value
    });
  },
  
  // 左眼瞳距输入
  bindLeftPdInput: function (e) {
    this.setData({
      'pd.left': e.detail.value
    });
  },
  
  // 右眼瞳距输入
  bindRightPdInput: function (e) {
    this.setData({
      'pd.right': e.detail.value
    });
  },
  
  // 备注输入
  bindRemarkInput: function (e) {
    this.setData({
      remark: e.detail.value
    });
  },
  
  // 提交验光数据
  submitOptometry: function () {
    const { name, date, leftEye, rightEye, pd, remark } = this.data;
    
    // 表单验证
    if (!name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return;
    }
    
    if (!date) {
      wx.showToast({
        title: '请选择检查日期',
        icon: 'none'
      });
      return;
    }
    
    if (!leftEye.sph || !rightEye.sph) {
      wx.showToast({
        title: '请输入球镜度数',
        icon: 'none'
      });
      return;
    }
    
    if (!pd.left || !pd.right) {
      wx.showToast({
        title: '请输入瞳距',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '保存中...'
    });
    
    // 调用云函数保存验光数据
    wx.cloud.callFunction({
      name: 'addRecord',
      data: {
        name: name,
        date: date,
        leftEye: leftEye,
        rightEye: rightEye,
        pd: pd,
        remark: remark
      }
    }).then(res => {
      wx.hideLoading();
      if (res.result.success) {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
        
        // 清空表单
        this.setData({
          name: '',
          date: '',
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
          pd: {
            left: '',
            right: ''
          },
          remark: ''
        });
      } else {
        wx.showToast({
          title: res.result.message || '保存失败',
          icon: 'none'
        });
      }
    }).catch(err => {
      wx.hideLoading();
      console.error('保存验光数据失败:', err);
      wx.showToast({
        title: '保存失败，请重试',
        icon: 'none'
      });
    });
  }
})