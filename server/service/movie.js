const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
export const getAllMovies = async (type, year, title, page = 1, limit = 10) => {
  let query = {}
  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }
  if (year) {
    query.year = year
  }
  if (title) {
    const reg = new RegExp(title, 'i')
    query.$or = [{ title: { $regex: reg } }, { rawTitle: { $regex: reg } }]
  }
  query.videoKey = { $ne: null }
  limit = Number(limit)
  let start = (page - 1) * limit
  const movies = await Movie.find(query)
    .skip(start)
    .limit(limit)
  return movies
}
export const getMovieDetail = async id => {
  const movie = await Movie.findOne({
    _id: id
  })
  return movie
}
export const getMoviesCount = async (type, year, title) => {
  let query = {}
  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }
  if (year) {
    query.year = year
  }
  if (title) {
    const reg = new RegExp(title, 'i')
    query.$or = [{ title: { $regex: reg } }, { rawTitle: { $regex: reg } }]
  }
  query.videoKey = { $ne: null }
  const count = await Movie.count(query)
  return count
}
export const getrelativeMovies = async movie => {
  const movies = await Movie.find({
    movieTypes: {
      $in: movie.movieTypes
    },
    videoKey: { $ne: null }
  })
  return movies
}
