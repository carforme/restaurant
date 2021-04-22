const socketIO = require('socket.io')
//cons server=require('./http-server')
//module.exports=socketIO(server)

module.exports.restaurant=socketIO({
  path:'/restaurant'
})


module.exports.desk=socketIO({
  path:'/desk'
})