Page({
  data: {
    products: [
      { name: '时尚光学眼镜', price: 299 },
      { name: '防蓝光眼镜', price: 399 },
      { name: '太阳镜', price: 199 },
      { name: '隐形眼镜', price: 129 }
    ]
  },
  onLoad: function () {
    console.log('首页加载');
  },
  onShow: function () {
    // 页面显示时执行
  }
})