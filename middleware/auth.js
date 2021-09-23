const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const { User } = require('../model')

module.exports = async(req, res, next) =>{
  // 验证 token 是否有效
  // 无效 -> 响应 401 状态码
  // 有效 -> 把用户信息读取出来挂载到 req 请求对象上
  //        继续往后执行

  let token = req.headers['authorization']
  token = token ? token.split('beaer ')[1] : null

  if(!token){
    return res.status(401).end()
  }

  try {
    const decodedTonken = await verify(token, jwtSecret)
    req.user = await User.findById(decodedTonken.userId)
    next()
  } catch (error) {
    return res.status(401).end()
  }
}