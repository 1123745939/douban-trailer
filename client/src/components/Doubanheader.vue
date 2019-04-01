<template>
  <div class="header-wrapper">
    <div class="header">
      <div class="left">
        <div class="brand">
          豆瓣预告片
        </div>
      </div>
      <div class="right">
        <a href="#">登录</a>
        <a href="#">注册</a>
      </div>
    </div>
  </div>

</template>

<script type="text/javascript">
export default {
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background: #f5f5f5;
  .header {
    height: 40px;
    width: 980px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
}
</style>
