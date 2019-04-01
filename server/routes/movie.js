const { controller, get, post, put } = require('../lib/decorators')
const {
  getAllMovies,
  getMovieDetail,
  getrelativeMovies,
  getMoviesCount
} = require('../service/movie')
@controller('api/v0/movie')
export class movieController {
  @get('/')
  async getMovies(ctx, next) {
    const { type, year, title, page = 1, limit = 10 } = ctx.query
    const movies = await getAllMovies(type, year, title, page, limit)
    const count = await getMoviesCount(type, year, title)
    ctx.body = {
      data: {
        movies,
        count
      },
      success: true
    }
  }

  @get('/:id')
  async getMovieDetail(ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    let relativeMovies = await getrelativeMovies(movie)
    relativeMovies = relativeMovies.filter(item => item.title !== movie.title)

    ctx.body = {
      data: {
        movie,
        relativeMovies
      },
      success: true
    }
  }
}
