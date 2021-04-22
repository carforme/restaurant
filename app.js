const path = require('path') //path模块提供处理文件路径功能
const express = require('express')
const session = require('express-session')
const cors = require('cors') //跨域资源共享
const cookieParser = require('cookie-parser')
const sqlite = require('sqlite')
const userAccountMiddleware = require('./user-account')
const app = express()

//const http=require('http')
//const  server=http.createServer(app)
//const io=require('socket.io')
//const ioServer=io(server)
//global.ioServer=ioServer


const restaurantMiddleware = require('./restaurant')
app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})


app.use(cors({
    origin: true,
    maxAge: 86400,
    credentials: true,
}))
app.use(cookieParser('secret'))
app.use(session({ secret: 'secret' }))

app.use(express.static(__dirname + '/build/')) //处理静态文件请求的中间件
app.use(express.static(__dirname + '/static/')) //处理静态文件请求的中间件
app.use('/upload', express.static(__dirname + '/upload/')) //处理静态文件请求的中间件



app.use(express.urlencoded({
        extended: true
    }))
    //用来解析扩展url编码的请求体
app.use(express.json()) //用来解析json请求体


app.use('/api', userAccountMiddleware)


app.use('/api', restaurantMiddleware)


module.exports = app