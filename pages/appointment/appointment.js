Page({
  data: {
    name: '',
    phone: '',
    date: '',
    time: '',
    services: ['验光服务', '配镜服务', '眼镜维修', '其他服务'],
    serviceIndex: 0,
    remark: ''
  },
  onLoad: function () {
    console.log('预约页加载');
  },
  
  // 姓名输入
  bindNameInput: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  
  // 手机号码输入
  bindPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
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
  
  // 时间选择
  bindTimePicker: function () {
    const that = this;
    wx.showTimePicker({
      success: function (res) {
        that.setData({
          time: res.time
        });
      }
    });
  },
  
  // 服务选择
  bindServiceChange: function (e) {
    this.setData({
      serviceIndex: e.detail.value
    });
  },
  
  // 备注输入
  bindRemarkInput: function (e) {
    this.setData({
      remark: e.detail.value
    });
  },
  
  // 提交预约
  submitAppointment: function () {
    const { name, phone, date, time } = this.data;
    
    if (!name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return;
    }
    
    if (!phone) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      });
      return;
    }
    
    if (!date) {
      wx.showToast({
        title: '请选择预约日期',
        icon: 'none'
      });
      return;
    }
    
    if (!time) {
      wx.showToast({
        title: '请选择预约时间',
        icon: 'none'
      });
      return;
    }
    
    // 模拟提交成功
    wx.showToast({
      title: '预约成功',
      icon: 'success'
    });
    
    // 清空表单
    this.setData({
      name: '',
      phone: '',
      date: '',
      time: '',
      serviceIndex: 0,
      remark: ''
    });
  }
})