const koa = {
    info: {name: 'koa'},
    get name () {
        return this.info.name
    },
    set name (val) {
        console.log('new name is ' + val)
        this.info.name = val
    }
}


console.log(koa.name)

koa.name = 'test'

console.log(koa.name)