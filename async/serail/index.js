const logTime = (name) => {
    console.log(`Log...${name} ` + new Date().toLocaleTimeString())
}

const promise = (name, delay = 100) => new Promise(resolve => {
    setTimeout(() => {
        logTime(name)
        resolve()
    }, 100)
})

module.exports = {
    callback: () => {
        setTimeout(() => {
            logTime('callback 1')
        }, 100)
        setTimeout(() => {
            logTime('callback 2')
        }, 0)
    },
    promise: () => {
        promise('Promise 1')
            .then(promise('Promise 2'))
            .then(promise('Promise 3'))
    }
}