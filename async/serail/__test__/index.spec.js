const { callback, promise } = require('../index')

// test('callback', done => {
//     callback()

//     setTimeout(done, 1000)
// })

test('promise', done => {
    promise()

    setTimeout(done, 1000)
})