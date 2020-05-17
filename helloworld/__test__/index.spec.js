test('测试helloworld', () => {
    const ret = require('../index')

    console.log('helloworld', ret);
    expect(ret)
        .toBe('helloworld')
})