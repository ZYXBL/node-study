function updateTime() {
    this.timer = this.timer || setInterval(() => this.time = new Date().toUTCString(), 5000)
    return this.time
}

const http = require('http')
http.createServer((req, res) => {
    const {url} = req
    if ('/' === url) {
        res.end(`
            <html>
                html update time ${updateTime()}
                <script src='main.js'></script>
            </html>
        `)
    } else if (url === '/main.js') {
        const content = `document.writeln('<br> JS Update Time: ${updateTime()}')`
        // 强缓存
        // res.setHeader('expires', new Date(Date.now() + 10 * 1000).toUTCString())
        // res.setHeader('Cache-Control', 'max-age=20')

        // 协商缓存
        res.setHeader('Cache-Control', 'no-cache')
        // res.setHeader('last-modified', new Date().toUTCString())
        // if (new Date(req.headers['if-modified-since']).getTime() + 8 * 1000 > Date.now()) {
        //     console.log('协商缓存命中。。。。')
        //     res.statusCode = 304
        //     res.end()
        //     return
        // }

        const crypto = require('crypto')
        const hash = crypto.createHash('sha1').update(content).digest('hex')
        res.setHeader('Etag', hash)
        if (req.headers['if-none-match'] === hash) {
            console.log('Etag 缓存命中。。。。')
            res.statusCode = 304
            res.end()
            return
        }


        res.statusCode = 200
        res.end(content)
    } else if (url === '/favicon.ico') {
        res.end('')
    }
}).listen(3000, () => {
    console.log('http cache test run at ' + 3000)
})