// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取用户的 openid
    const openid = cloud.getWXContext().OPENID
    
    // 模拟验光数据（实际项目中应从数据库查询）
    const optometryData = {
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
      }
    }
    
    // 模拟历史验光记录（实际项目中应从数据库查询）
    const historyRecords = [
      {
        id: '1',
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
        }
      },
      {
        id: '2',
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
        pd: {
          left: '31',
          right: '31'
        }
      },
      {
        id: '3',
        date: '2023-01-10',
        name: '张三',
        leftEye: {
          sph: '-2.00',
          cyl: '-0.50',
          axis: '180'
        },
        rightEye: {
          sph: '-1.50',
          cyl: '-0.75',
          axis: '175'
        },
        pd: {
          left: '31',
          right: '31'
        }
      }
    ]
    
    // 根据请求参数返回对应数据
    if (event.type === 'latest') {
      // 实际项目中，这里应该根据 openid 从数据库查询最新的一条记录
      // const result = await db.collection('optometry_records')
      //   .where({ openid: openid })
      //   .orderBy('createTime', 'desc')
      //   .limit(1)
      //   .get()
      // if (result.data.length > 0) {
      //   return { success: true, data: result.data[0] }
      // }
      
      // 模拟返回数据
      return {
        success: true,
        data: optometryData
      }
    } else if (event.type === 'history') {
      // 按时间筛选
      let filteredRecords = historyRecords;
      if (event.filterDate) {
        filteredRecords = historyRecords.filter(record => record.date >= event.filterDate);
      }
      
      // 实际项目中，这里应该根据 openid 和筛选条件从数据库查询记录
      // const result = await db.collection('optometry_records')
      //   .where({
      //     openid: openid,
      //     date: db.command.gte(event.filterDate || '1970-01-01')
      //   })
      //   .orderBy('date', 'desc')
      //   .get()
      // return { success: true, data: result.data }
      
      // 模拟返回数据
      return {
        success: true,
        data: filteredRecords
      }
    }
    
    return {
      success: false,
      message: '无效的请求类型'
    }
  } catch (err) {
    console.error('获取验光数据失败:', err)
    return {
      success: false,
      message: '获取验光数据失败',
      error: err.message
    }
  }
}