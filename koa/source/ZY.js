const http = require('http')

const context = require('./context')
const request = require('./request')
const response = require('./response')

class ZY {
    listen(...args) {
        http.createServer((req, res) => {
            const ctx = this.createContext(req, res)

            // this.callback(req, res)

            this.callback(ctx)
            // 响应
            res.end(ctx.body)
        }).listen(...args)
    }
    use (callback) {
        this.callback = callback
    }
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)
        ctx.req = ctx.request = req
        ctx.res = ctx.response = res
        return ctx
    }
}

module.exports = ZY