<template>
  <div class="home">
    <div class="main container">
      <div class="serach-wrapper">
        <el-input placeholder="请输入内容" v-model="searchData" @keyup.native.enter="getMovieList(searchData)"></el-input>
        <el-button type="primary" @click="getMovieList(searchData)">搜索</el-button>
      </div>
      <div class="nav-wrapper">
        <ul>
          <li v-for="(item,index) in navData" :key="index" @mouseover="setCurrent(index)" @mouseleave="removeCurrent(index)" :class="item.current === true ? 'current' : '' ">
            <a href="#">{{item.name}}</a>
          </li>
        </ul>
        <div class="hover-bar" ref="hoverBar"></div>
      </div>
      <div class="content-wrapper">
        <div class="movie-list">
          <movie-panel v-for="(item, index) in movieList" :key="index" :movieInfo="item" />
        </div>
        <div class="pagination-wrapper">
          <pagination :pages="pages" :currentPage="currentPage" @prePage="prePage" @nextPage="nextPage" @gotoPage="gotoPage" />
        </div>
      </div>
    </div>
    <div class="footer">
      每天更新最新预告片
    </div>
  </div>
</template>

<script type="text/javascript">
import MoviePanel from '@/components/MoviePanel'
import Pagination from '@/components/Pagination'
export default {
  data () {
    return {
      pages: 1,
      currentPage: 1,
      limit: 15,
      searchData: '',
      navData: [
        { id: 1, name: '综合', current: true },
        { id: 2, name: '电影', current: false },
        { id: 3, name: '电视剧', current: false },
        { id: 4, name: '综艺', current: false },
        { id: 5, name: '动漫', current: false },
        { id: 6, name: '纪录片', current: false },
        { id: 7, name: '短片', current: false }
      ],
      hoverBarPosition: ['50px', '190px', '325px', '464px', '600px', '737px', '875px'],
      activeNav: 0,
      movieList: []
    }
  },
  created () {
    this.getMovieList()
  },
  methods: {
    setCurrent (index) {
      this.$refs.hoverBar.style.left = this.hoverBarPosition[index]
    },
    removeCurrent () {
      this.$refs.hoverBar.style.left = this.hoverBarPosition[this.activeNav]
    },
    async getMovieList (title = '', page = 1, limit = 10, type = '', year = '') {
      const { data, status } = await this.$http.get(`/api/v0/movie?type=${type}&year=${year}&title=${title}&page=${page}&limit=${limit}`)
      if (status === 200) {
        this.movieList = data.data.movies
        this.pages = Math.ceil(data.data.count / this.limit)
      } else {
        this.$message.error('网络错误')
      }
    },
    prePage () {
      this.currentPage = this.currentPage - 1
      this.getMovieList('', this.currentPage)
    },
    nextPage () {
      this.currentPage = this.currentPage + 1
      this.getMovieList('', this.currentPage)
    },
    gotoPage (page) {
      this.currentPage = page
      this.getMovieList('', this.currentPage)
    }
  },
  components: {
    MoviePanel,
    Pagination
  }
}
</script>

<style lang="scss" scoped>
.home {
  .main {
    .serach-wrapper {
      width: 400px;
      display: flex;
      margin: 30px auto;
    }
    .nav-wrapper {
      border-bottom: 1px solid #eee;
      padding: 0 10px;
      position: relative;
      ul {
        height: 50px;
        display: flex;
        align-items: center;
        cursor: pointer;
        li {
          flex: 1;
          height: 50px;
          line-height: 50px;
          text-align: center;
        }
        li.current a {
          color: #00a1d6;
        }
        li:hover a {
          color: #00a1d6;
        }
      }
      .hover-bar {
        position: absolute;
        height: 2px;
        background-color: #00a1d6;
        width: 55px;
        left: 50px;
        bottom: -1px;
        transition: left 0.2s;
      }
    }
    .content-wrapper {
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
      .pagination-wrapper {
      }
    }
  }
  .footer {
    height: 100px;
    background-color: #f5f5f5;
    text-align: center;
    line-height: 100px;
  }
}
</style>
