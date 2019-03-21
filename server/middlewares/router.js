const { Router } = require('../lib/decorators')
const { resolve } = require('path')
export const router = app => {
  const apiPath = resolve(__dirname, '../routes')
  const router = new Router(app, apiPath)

  router.init()
}
