const Koa = require('koa')
const app = new Koa()
const info = [{id: '1', message: 'id是1'} , {id: '2', message: 'id是2' }]
app.use(async (ctx, next) => {
    if (ctx.path === '/api/jsonp') {
        const {cb, id} = ctx.query
        const message = info.filter(item => {
            return item.id === id
        })[0]
        ctx.body = `${cb}(${JSON.stringify(message)})`
        return ;
    }
})
console.log('listen 8888....')
app.listen(8888)
