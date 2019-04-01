import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import MovieInfo from '@/pages/movieInfo'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movieinfo/:id',
      name: 'movieinfo',
      component: MovieInfo
    }
  ]
})
// 全局导航守卫
router.beforeEach((to, from, next) => {
  next()
})
export default router
