const { connect, initSchema } = require('../dataBase/init')
const mongoose = require('mongoose')
;(async () => {
  // 连接数据库并初始化
  await connect()
  initSchema()
  const movie = require('./movie')
  const api = require('./api')
  const trailer = require('./trailer')
  const qiniu = require('./qiniu')
  const Movie = mongoose.model('Movie')
  ;(async () => {
    await movie()
    await api()
    console.log(11)
    let movies = await Movie.find({
      $or: [
        {
          videoKey: { $exists: false }
        },
        { videoKey: null },
        { videoKey: '' }
      ]
    })
    for (let i = 0; i < movies.length; i++) {
      const { doubanId } = movies[i]
      const trailerResult = await trailer(doubanId)

      if (trailerResult.video) {
        const qiniuResult = await qiniu(trailerResult)
        if (qiniuResult.videoKey) {
          let movie = await Movie.findOne({
            doubanId: doubanId
          })
          movie.videoKey = qiniuResult.videoKey
          movie.coverKey = qiniuResult.coverKey
          if (movie) {
            movie = new Movie(movie)
            await movie.save()
          }
        }
      }
    }
  })()
})()
