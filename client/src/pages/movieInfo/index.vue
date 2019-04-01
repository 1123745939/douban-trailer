<template>
  <div class="movie">
    <div class="container">
      <div class="movie-info">
        <div class="title">{{movieInfo.title}}</div>
        <div class="info">
          <span class="type" v-for="(item, index) in movieInfo.movieTypes" :key="index">{{item}}</span>
          <span class="year">{{movieInfo.year}}</span>
        </div>
      </div>
      <d-player ref="player" @play="play" :video="video" :contextmenu="contextmenu" v-if="video.url"></d-player>
      <div class="movie-summary-wrapper">
        <div class="introduction">简介</div>
        <div class="summary">
          {{movieInfo.summary}}
        </div>
      </div>
      <div class="relative-movie-wrapper">
        <div class="title" v-if="relativeMovies._id">同类电影</div>
        <div class="movie-list">
          <movie-panel v-for="(item, index) in relativeMovies" :key="index" :movieInfo="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DPlayer from '@/components/DPlayer'
import MoviePanel from '@/components/MoviePanel'
export default {
  data () {
    return {
      movieInfo: [],
      relativeMovies: [],
      site: 'http://ponbdzcu6.bkt.clouddn.com',
      msg: 'Welcome to Your Vue.js App',
      video: {
        url: '',
        pic: '',
        type: 'normal'
      },
      autoplay: false,
      player: null,
      contextmenu: [
        {
          text: 'GitHub',
          link: ''
        }
      ]
    }
  },
  components: {
    DPlayer,
    MoviePanel
  },
  methods: {
    play () {
      console.log('play callback')
    },
    async getMovieInfo () {
      const { id } = this.$route.params
      const { data, status } = await this.$http.get(`api/v0/movie/${id}`)

      if (status === 200) {
        this.movieInfo = data.data.movie
        this.relativeMovies = data.data.relativeMovies
        if (data.data.movie.videoKey) {
          this.video.url = this.site + '/' + data.data.movie.videoKey
          this.video.pic = this.site + '/' + data.data.movie.coverKey
        } else {
          this.video.pic = this.site + '/PWmKs4FzAwsz4YdC3WW6L.jpg'
          this.video.url = this.site + '/-dzmQZ-01AaSbAdfCZrIV.mp4'
        }
      }
    }
  },
  created () {
    this.getMovieInfo()
  },
  watch: {
    '$route': function (to, from) {
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.movie {
  .movie-info {
    margin-top: 30px;
    .title {
      font-size: 18px;
      font-weight: 500;
      color: #212121;
      line-height: 26px;
      height: 26px;
      margin-bottom: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info {
      font-size: 12px;
      height: 16px;
      color: #666;
      margin-bottom: 8px;
      .type {
        margin-left: 3px;
      }
      .year {
        margin-left: 10px;
      }
    }
  }
  .movie-summary-wrapper {
    margin-top: 20px;
    color: #666;
    .introduction {
      font-weight: bold;
    }
    .summary {
      margin-top: 10px;
      text-indent: 20px;
      line-height: 20px;
    }
  }
  .relative-movie-wrapper {
    color: #666;
    .title {
      margin-top: 20px;
      font-weight: bold;
    }
    .movie-list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 5px;
      a {
        margin: 20px 32px 0 0;
      }
      a:nth-child(5n) {
        margin: 20px 0 0 0;
      }
    }
  }
}
</style>
