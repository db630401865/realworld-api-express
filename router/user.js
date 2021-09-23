const express  = require('express')
const urlCtrl = require('../controlier/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')

const router = express.Router()


// 用户登陆
router.post('/users/login', userValidator.login, urlCtrl.login)

// 用户注册
router.post('/users', userValidator.register, urlCtrl.register) // 3. 通过验证，执行具体的控制器处理


// 获取当前登陆用户
router.get('/user', auth, urlCtrl.getCurrenUser)

// 更新当前登陆用户
router.put('/user', auth, urlCtrl.updateCurrenUser)

module.exports = router