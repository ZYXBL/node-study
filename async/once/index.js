const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const { url, method } = req;
  if (url === '/' && method === 'GET') {
    fs.readFile('./titles.json', (err, data) => {
      getTitles(res)
    })
  }
}).listen(8000)

function getTitles(res) {
  fs.readFile('./titles.json', (err, data) => {
    if (err) return hasErr(res)
    const titles = JSON.parse(data.toString())
    getTemplate(res, titles)
  })
}

function getTemplate(res, titles) {
  fs.readFile('./template.html', (err, template) => {
    if (err) return hasErr(res)
    const result = template.toString().replace(/%/g, titles.join('</li><li>'))
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(result)
  })
}


function hasErr(err) {
  res.end('请求错误！！！')
}