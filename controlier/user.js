const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')


exports.login = async(req, res, next) => {
  try {

    const user = req.user.toJSON()
    const token = await jwt.sign({
      userId: user._id 
    },jwtSecret, {
      expiresIn: '24h'
    })

    delete user.password

    res.status(200).json({
      ...user, 
      token
    })
  } catch (error) {
    next(error)
  }
}

// 用户注册
exports.register = async(req, res, next) => {
  try {
    // 1.获取请求体数据
    // 1.1 基本数据验证
    // 1.2 业务数据验证

    // 2.数据验证
    let user = new User(req.body.user) 

    // 3.验证通过，将数据保存在数据库
    await user.save()

    // 4.发送成功响应
    // 将数据转化成json才能删除密码
    user = user.toJSON()    
    delete user.password

    res.status(201).json({ user })
  } catch (error) {
    next(error)
  }
}

exports.getCurrenUser = async(req, res, next) => {
  try {
    res.status(200).json({
      user: req.user
    })
  } catch (error) {
    next(error) 
  }
}

exports.updateCurrenUser = async(req, res, next) => {
  try {
    res.send('put /updateCurrenUser')
  } catch (error) {
    next(error)
  }
}