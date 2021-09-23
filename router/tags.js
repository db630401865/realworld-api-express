const express = require('express')
const tagCtrl = require('../controlier/tags')

const router = express.Router()

// 获取文章标签列表
router.get('/', tagCtrl.getTags)

module.exports = router
