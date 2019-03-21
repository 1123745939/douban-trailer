const Koa = require('koa')
const { connect, initSchema } = require('./dataBase/init')
const { resolve } = require('path')
const R = require('ramda')
const MIDDLEWARES = ['router']

const useMiddlewares = app => {
  R.map(
    R.compose(
      R.forEachObjIndexed(initWith => initWith(app)),
      require,
      name => resolve(__dirname, `middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

;(async () => {
  // 连接数据库并初始化
  await connect()
  initSchema()

  const app = new Koa()
  await useMiddlewares(app)

  app.listen(3000, () => {
    console.log('server is running on http://localhost:3000/')
  })
})()
