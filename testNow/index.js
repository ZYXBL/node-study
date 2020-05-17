const path = require('path');
const fs = require('fs');

module.exports = class TestNow {

    genJestSource(sourcePath = path.resolve('./')) {
        const testPath = `${sourcePath}/__test__`
        if (!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath)
        }

        // 遍历代码文件
        let list = fs.readdirSync(sourcePath)
        list
            // 添加完整路径
            .map(v => `${sourcePath}/${v}`)
            // 过滤文件
            .filter(v => fs.statSync(v).isFile())
            // 排除测试代码
            .filter(v => v.indexOf('.spec') === -1)
            .map(v => this.getTestFile(v))
    }

    getTestFile(fileName) {
        console.log('filename:', fileName)
        const testFileName = this.getTestFileName(fileName)

        // 判断此文件是否存在
        if (fs.existsSync(testFileName)){
            console.log(`${fileName}测试代码已存在`)
            return
        }

        const mod = require(fileName)
        let source
        if (typeof mod === 'object') {
            source = Object.keys(mod)
                .map(v => this.getTestSource(v, path.basename(fileName), true))
                .join('\n')
        } else if (typeof mod === 'function') {
            const baseName = path.basename(fileName)
            source = this.getTestSource(baseName.replace('.js', ''), baseName)
        }
        fs.writeFileSync(testFileName, source)
    }

    /**
     * 
     * @param {*} methodName 方法名
     * @param {*} classFile 方法文件名
     * @param {*} isClass 是否class 默认false
     */
    getTestSource(methodName, classFile, isClass = false) {
        console.log('getTestSource', methodName)
        return `
            test('TEST ${methodName} ', () => {
                const ${isClass ? '{' + methodName + '}' : methodName} = require('../${classFile}')
                const ret = ${methodName}()
                // expect(ret)
                //  .toBe('test return')
            })
        `
    }

    /**
     * 生成测试文件名
     * @param {*} fileName 代码文件名 
     */
    getTestFileName(fileName) {
        const dirName = path.dirname(fileName)
        const baseName = path.basename(fileName)
        const extName = path.extname(fileName)
        const testName = baseName.replace(extName, `.spec${extName}`)
        // console.log(dirName, baseName, extName, testName, '===')
        return path.format({
            root: dirName + '/__test__/',
            base: testName
        })
    }
}