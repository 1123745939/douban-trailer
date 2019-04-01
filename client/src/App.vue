<template>
  <div id="app">
    <douban-header />
    <router-view />
  </div>
</template>

<script>
import DoubanHeader from '@/components/DoubanHeader'
export default {
  name: 'App',
  components: {
    DoubanHeader
  }
}
</script>

<style>
</style>
