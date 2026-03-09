Page({
  data: {
    records: [
      {
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
      },
      {
        date: '2023-07-20',
        name: '张三',
        leftEye: {
          sph: '-2.25',
          cyl: '-0.50',
          axis: '180'
        },
        rightEye: {
          sph: '-1.75',
          cyl: '-0.75',
          axis: '175'
        },
        pd: '62mm'
      }
    ]
  },
  
  onLoad: function () {
    console.log('验光记录列表页面加载');
  }
})