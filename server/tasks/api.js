const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Categroy = mongoose.model('Categroy')

async function fetchMovie(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const res = await rp(url)
  let body
  try {
    body = JSON.parse(res)
  } catch (error) {
    console.log(error)
  }
  return body
}
module.exports = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let movies = await Movie.find({
        $or: [
          {
            summary: { $exists: false }
          },
          { summary: null },
          { summary: '' },
          { title: '' }
        ]
      })
      for (let i = 0; i < movies.length; i++) {
        let movie = movies[i]
        let movieData = await fetchMovie(movie)
        if (movieData) {
          // 又名
          let tags = movieData.aka || ''
          movie.tags = movie.tags || []
          // 遍历推入电影又名
          if (tags) {
            tags.forEach(item => {
              movie.tags.push(item)
            })
          }
          // 剧情简介
          movie.summary = movieData.summary || ''
          // 电影名称
          movie.title = movieData.title || ''
          // 电影原名
          movie.rawTitle = movieData.original_title || movieData.title || ''
          // 上映年份
          movie.year = movieData.year || ''
          // 电影分类DR
          movie.categroy = movieData.categroy || []
          // 电影分类
          movie.movieTypes = movieData.genres || []
          // 遍历保存电影分类表
          for (let i = 0; i < movie.movieTypes.length; i++) {
            let item = movie.movieTypes[i]
            let cat = await Categroy.findOne({
              name: item
            })
            if (!cat) {
              cat = new Categroy({
                name: item,
                movies: [movie._id]
              })
            } else {
              if (cat.movies.indexOf(movie._id) === -1) {
                cat.movies.push(movie._id)
              }
            }
            await cat.save()
            // 分类指向
            if (!movie.categroy) {
              movie.categroy.push(cat._id)
            } else {
              if (movie.categroy.indexOf(cat._id) === -1) {
                movie.categroy.push(cat._id)
              }
            }
          }
          // 保存电影详细信息
          const result = await movie.save()
          console.log(result)
        }
      }
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
