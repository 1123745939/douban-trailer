const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')
const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async function(key, url) {
  return new Promise(async (resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve(info)
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  let movies = [
    {
      video:
        'http://vt1.doubanio.com/201903200940/18715d38918840d44e61383b4fac3b21/view/movie/M/402420484.mp4',
      doubanId: '26213252',
      cover: 'http://img1.doubanio.com/img/trailer/medium/2546376528.jpg?'
    }
  ]
  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log('开始传video')
        let videoData = await uploadToQiniu(nanoid() + '.mp4', movie.video)
        console.log('开始传cover')
        let coverData = await uploadToQiniu(nanoid() + '.jpg', movie.cover)

        if (videoData.data.key) {
          movie.videoKey = videoData.data.key
        }
        if (coverData.data.key) {
          movie.coverKey = coverData.data.key
        }
        console.log(movie)
      } catch (err) {
        console.log(err)
      }
    }
  })
})()
