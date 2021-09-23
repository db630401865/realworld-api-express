const validator = require('../middleware/validator')
const { body } = require('express-validator');
const { User } = require('../model')
const md5 = require('../util/md5')

exports.register = validator([
    // 非空校验
    // 1. 配置验证规则
    body('user.username')
      .notEmpty().withMessage('用户名不能空')
      .bail() // 前面验证通过了，才能执行后面的 
      .custom(async username => { // value 就是email的值 
        const user = await User.findOne({ username })
        if(user){
          return Promise.reject('用户名已经存在')
        }
      }),
    body('user.password').notEmpty().withMessage('密码不能空'),
    body('user.email')
      .notEmpty().withMessage('email不能空')
      .isEmail().withMessage('email格式不正确')
      .bail() // 前面验证通过了，才能执行后面的 
      .custom(async email => { // value 就是email的值 
        const user = await User.findOne({ email })
        if(user){
          return Promise.reject('邮箱已经存在')
        }
      })
])

exports.login = [
  validator([
    // 非空校验
    // 1. 配置验证规则
    body('user.email').notEmpty().withMessage('email不能空'),
    body('user.password').notEmpty().withMessage('密码不能空'),
  ]),
  validator([
    // 非空校验
    // 1. 配置验证规则
    body('user.email').custom(async (email, { req }) => {
      const user = await User.findOne({ email })
        .select(['email', 'username', 'bio', 'image', 'password'])
        if(!user){
          return Promise.reject('用户不存在')
        }
        // 将数据挂载到请求对象中，后续的中间件也可以使用了
        req.user = user
    })
  ]),
  validator([
    body('user.password').notEmpty().custom(async (password , { req })=>{
      if(md5(password) !== req.user.password){
        return Promise.reject('密码错误')
      }
    })
  ])
]