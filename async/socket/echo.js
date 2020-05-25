const net = require('net');

const server = net.createServer(socket => {
  socket.on('data', data => { // 当读取到新数据时处理的data事件
    console.log(data.toString())
    // 数据被写回客户端
    socket.write(data);
  })
})

server.listen(8888);