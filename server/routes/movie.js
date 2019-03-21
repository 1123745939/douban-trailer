const { controller, get, post, put } = require('../lib/decorators')
const {
  getAllMovies,
  getMovieDetail,
  getrelativeMovies
} = require('../service/movie')
@controller('api/v0/movie')
export class movieController {
  @get('/')
  async getMovies(ctx, next) {
    const { type, year } = ctx.query
    const movies = await getAllMovies(type, year)
    ctx.body = {
      data: {
        movies
      },
      success: true
    }
  }

  @get('/:id')
  async getMovieDetail(ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    const relativeMovies = await getrelativeMovies(movie)
    ctx.body = {
      data: {
        movie,
        relativeMovies
      },
      success: true
    }
  }
}
