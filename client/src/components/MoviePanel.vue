<template>
  <router-link :to="'/movieinfo/'+movieInfo._id" class="panel" href="/movieinfo">
    <div class="img-wrapper">
      <img :src="movieInfo.poster" alt="">
    </div>
    <div class="info">
      <span class="title">{{movieInfo.title}}</span>
      <span class="rate">{{movieInfo.rate}}</span>
    </div>
  </router-link>

</template>

<script type="text/javascript">
export default {
  props: ['movieInfo']
}
</script>

<style lang="scss" scoped>
.panel {
  .img-wrapper {
    width: 168px;
    height: 230px;
    overflow: hidden;
    img {
      width: 168px;
    }
  }

  .info {
    font-size: 14px;
    line-height: 20px;
    width: 168px;
    margin-top: 10px;
    text-align: center;
    .rate {
      color: #e09015;
      padding: 5px;
    }
  }
}
</style>
