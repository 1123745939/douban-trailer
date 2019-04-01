<template>
  <div class="pagination">
    <div class="pre" v-if="currentPage>1" @click="prePage">上一页</div>
    <div class="item" v-for="count in pages" :key="count" :class="count === currentPage ? 'current': ''" @click="gotoPage(count)">{{count}}</div>
    <div class="next" v-if="currentPage<pages" @click="nextPage">下一页</div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['pages', 'currentPage'],
  methods: {
    prePage () {
      this.$emit('prePage')
    },
    nextPage () {
      this.$emit('nextPage')
    },
    gotoPage (idnex) {
      this.$emit('gotoPage', idnex)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  .item,
  .pre,
  .next {
    display: inline-block;
    min-width: 20px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    line-height: 30px;
    text-align: center;
    margin-right: 10px;
    padding: 0 5px;
  }
  .item.current,
  .pre.current,
  .next.current {
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
  }
  .item:hover,
  .pre:hover,
  .next:hover {
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
  }
}
</style>
