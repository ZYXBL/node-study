const ZY = require('./ZY')
const app = new ZY()

// app.use((req, res) => {
//     res.writeHead(200)
//     res.end('hello world')
// })

app.use(ctx => {
    ctx.body = 'hello ctx'
})

app.listen(3000, ()=>{
    console.log('监听端口 3000')
})