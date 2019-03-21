const koaRouter = require('koa-router')
const glob = require('glob')
const _ = require('lodash')
const { resolve } = require('path')
const symbolPrefix = Symbol('Prefix')
const routerMap = new Map()
const isArray = c => (_.isArray(c) ? c : [c])
export class Router {
  constructor(app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new koaRouter()
  }
  init() {
    // 导入 routes 文件夹下所有js
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)
    // 注册所有路由规则
    for (let [conf, controller] of routerMap) {
      // 判断controller是不是数组 如果不是 转化为数组
      const controllers = isArray(controller)
      // 获取路由组件 路径前缀
      const prefixPath = conf.taget[symbolPrefix]
      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      // 注册每个路由
      this.router[conf.method](routerPath, ...controllers)
    }
    //挂载路由
    this.app.use(this.router.routes()).use(this.router.allowedMethods())
  }
}
// 序列化路径  如果是根路径开头 返回path 如果不是添加 /
const normalizePath = path => (path.startsWith('/') ? path : `/${path}`)

// 将各种路由请求推入routerMap 用于初始化路由
const router = conf => (taget, key, desciptor) => {
  conf.path = normalizePath(conf.path)
  routerMap.set(
    {
      taget: taget,
      ...conf
    },
    taget[key]
  )
}

// 设置路由组件统一地址
export const controller = path => taget => {
  taget.prototype[symbolPrefix] = path
}

// get 静态方法 调用 router() 导出 get
export const get = path =>
  router({
    method: 'get',
    path: path
  })
export const post = path =>
  router({
    method: 'post',
    path: path
  })
export const put = path =>
  router({
    method: 'put',
    path: path
  })
export const del = path =>
  router({
    method: 'del',
    path: path
  })
export const use = path =>
  router({
    method: 'use',
    path: path
  })
export const all = path =>
  router({
    method: 'all',
    path: path
  })
