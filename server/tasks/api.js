const rp = require('request-promise-native')
const { resolve } = require('path')

async function fetchMovie(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const res = await rp(url)
  return res
}

;(async () => {
  let movies = [
    {
      doubanId: 30219655,
      title: '后半生',
      rate: 8.4,
      poster:
        'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2549127933.jpg'
    },
    {
      doubanId: 26213252,
      title: '惊奇队长',
      rate: 7,
      poster:
        'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2548870813.jpg'
    },
    {
      doubanId: 30384356,
      title: '哈哈农夫',
      rate: 6.9,
      poster:
        'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2547858421.jpg'
    },
    {
      doubanId: 30412189,
      title: '罗布奥特曼剧场版：决定了！羁绊的水晶',
      rate: 6.3,
      poster:
        'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2545880275.jpg'
    }
  ]
  movies.map(async movie => {
    let movieData = await fetchMovie(movie)

    try {
      movieData = JSON.parse(movieData)
      console.log(movieData.title)
      console.log(movieData.summary)
    } catch (error) {
      console.log(error)
    }
  })
})()
