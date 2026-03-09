// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const collection = db.collection('optometry_records')

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取用户的 openid
    const openid = cloud.getWXContext().OPENID
    
    // 解析传入的验光数据
    const { 
      name, 
      date, 
      leftEye, 
      rightEye, 
      pd, 
      remark 
    } = event
    
    // 验证必填字段
    if (!name || !date || !leftEye || !rightEye || !pd) {
      return {
        success: false,
        message: '缺少必填字段'
      }
    }
    
    // 构建记录数据
    const record = {
      openid: openid,
      name: name,
      date: date,
      leftEye: leftEye,
      rightEye: rightEye,
      pd: pd,
      remark: remark || '',
      createTime: db.serverDate(),
      updateTime: db.serverDate()
    }
    
    // 插入记录到集合
    const result = await collection.add({
      data: record
    })
    
    return {
      success: true,
      data: {
        recordId: result._id,
        ...record
      }
    }
  } catch (err) {
    console.error('添加验光记录失败:', err)
    return {
      success: false,
      message: '添加验光记录失败',
      error: err.message
    }
  }
}