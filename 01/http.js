const http = require('http')
const fs = require('fs')

const server = http.createServer((request, response) => {
  // const req = getPrototypeChain(request)
  // console.log('request', req)
  // const res = getPrototypeChain(response)
  // console.log('response', res)
  // response.end('hello node')

  const { url, method, headers } = request
  if (url === '/' && method === 'GET') {
    // 获取首页地址
    fs.readFile('index.html', (err, data) => {
      if (err) {
        console.log(err)
        response.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' })
        response.end('500,服务器错误')
        return
      }

      response.statusCode = 200
      response.setHeader('Content-Type', 'text/html')
      response.end(data)
    })
  } else if (url === '/user' && method === 'GET') {
    // 获取用户接口
    // response.writeHead(200, { 'Content-Type': 'application/json' })
    // response.end(JSON.stringify({ name: 'tom', age: 20 }))
    fs.readFile('user.json', (err, data) => {
      if (err) {
        response.writeHead(500, { 'Context-Type': 'text/plain;charset=utf-8' })
        response.end('500，服务器错误')
        return
      }
      response.statusCode = 200
      response.setHeader('Content-Type', 'application/json')
      response.end(data.toString())
    })
  } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    fs.createReadStream('.' + url).pipe(response)
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/plain;charset=utf-8')
    response.end('404，页面没有找到')
  }
})

// 打印原型链
function getPrototypeChain(obj) {
  var protoChain = [];
  while (obj = Object.getPrototypeOf(obj)) {//返回给定对象的原型。如果没有继承属性，则返回 null 。
    protoChain.push(obj);
  }
  protoChain.push(null);
  return protoChain;
}

server.listen(3000)
