const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/douban-trailer'
const glob = require('glob')
const { resolve } = require('path')
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.connect = () => {
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    mongoose.connect(db)

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了,快去维修吧')
      }
    })

    mongoose.connection.on('error', err => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了,快去维修吧')
      }
    })

    mongoose.connection.once('open', () => {
      resolve()
      console.log('MongoDB Connected Successfully')
    })
  })
}
