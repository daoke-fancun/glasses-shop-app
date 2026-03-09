Page({
  data: {
    currentTab: 'all',
    products: [
      { name: '时尚光学眼镜', price: 299, category: 'frame' },
      { name: '防蓝光镜片', price: 399, category: 'lens' },
      { name: '太阳镜', price: 199, category: 'frame' },
      { name: '隐形眼镜', price: 129, category: 'lens' }
    ]
  },
  // 关键的切换函数
  switchTab: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.type
    })
  }
})