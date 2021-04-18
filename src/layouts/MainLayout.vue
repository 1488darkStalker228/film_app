<template>
  <div class="main-layout">
    <Header/>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
  import Header from '../components/Header/Header.vue'

  export default {
    components: { Header },
  }
</script>

<style lang='scss'>
  .main-layout {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>