const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router/index')
const errorHandles = require('./middleware/error-handler')
require('./model')

const app = express()


app.use(express.json())

app.use(express.urlencoded())

app.use(morgan('dev'))

app.use(cors())

app.use('/api', router)

//ORT=5000 nodemon app.js 在终端中执行5000的端口命令
const PORT = process.env.PORT || 3000

// 挂载统一处理服务端错误中间件
app.use(errorHandles())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})