const { controller, get, post, put } = require('../lib/decorators')
const { checkPassword } = require('../service/user')
@controller('api/v0/user')
export class userController {
  @post('/')
  async checkPassword(ctx, next) {
    const { email, passwrod } = ctx.request.body
    const matchData = await checkPassword(email, passwrod)
    if (!matchData.user) {
      return (ctx.body = {
        success: false,
        error: '用户不存在'
      })
    }
    if (matchData.match) {
      return (ctx.body = {
        success: true
      })
    }
    return (ctx.body = {
      success: false,
      error: '密码不存在'
    })
  }
}
