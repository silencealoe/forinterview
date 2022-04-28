/**
 * 工厂模式
 * 通过函数创建对象 内部集成多个类 可以选择性的输出对应的实例
 * 也可以通过工厂函数创建对象 和方法
 * 应用场景 前端发起多种请求 方法封装 
 * 
 * 使用设计模式能够显著地提升个人的代码质量和可读性。
 * 设计模式是经过时间检验的经典套路，甚至于是很多场景下的最佳实践。
 * 懂得设计模式的人，看其他人写的符合设计模式的代码也更容易。
*/
function fetchRequest(url) {
    return async (...args) => {
        console.log(args)
        const {method, params } = args[0]
        const conf = {
            url,
            method,
            params
        }
        console.log(conf)
        const res = await new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve('res data')
            }, 100)
        })
        return res
    }
}
const obj = {
    method:'get',
    params: {
        name: 'xiaoming'
    }
}
const getList = fetchRequest('http://123.com')
getList(obj).then(res => {
    console.log(res)
})




