const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function (id, client) {
  const welcome = `Welcome! Guests online: ${this.listeners('broadcast').length}.\n`
  client.write(`${welcome}\n`)

  this.clients[id] = client;

  // 添加join事件的监听器，保存用户的client对象
  this.subscriptions[id] = (senderId, message) => {
    if (id !== senderId) {
      // 不是发送信息的用户，忽略发送广播数据的用户
      this.clients[id].write(`${id}:${message}`)
    }
  }
  // 添加一个专门针对当前用户的广播
  this.on('broadcast', this.subscriptions[id])
});

channel.setMaxListeners(50);

// 创建leave事件的监听器
channel.on('leave', function (id) {
  channel.removeListener('broadcast', this.subscriptions[id]);

  channel.emit('broadcast', id, `${id} has left the chatroom.\n`)
});

// 停止所有聊天服务器
channel.on('shutdown', () => {
  channel.emit('broadcast', '', 'The server has shut down.\n')
  channel.removeAllListeners('broadcast');
})

const server = net.createServer(client => {
  const id = `${client.remoteAddress}:${client.remotePort}`
  // 当有用户连接到服务器上时，发出一个广播
  channel.emit('join', id, client);

  channel.on('close', () => {
    channel.emit('leave', id); // 在用户断开连接时发出leave事件
  })

  client.on('data', data => {
    data = data.toString();
    if (data === 'shutdown\r\n') {
      channel.emit('shutdown')
    }
    channel.emit('broadcast', id, data);
  })
})

server.listen(8888);