const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'home'
})

app.listen(3000, () => {
  console.log('server is running on http://localhost:3000/')
})
