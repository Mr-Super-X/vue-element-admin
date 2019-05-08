<template>
  <!--基础布局组件，作为一个中间件存在，提供嵌套路由使用-->
  <div class="layout">
    <keep-alive>
      <!--会被缓存的视图组件-->
      <router-view v-if="$route.meta.keepAlive" class="router-view"></router-view>
    </keep-alive>
    <!--不会被缓存的视图组件-->
    <router-view v-if="!$route.meta.keepAlive" class="router-view"></router-view>
  </div>
</template>

<script>
  export default {
    name: "layout"
  }
</script>

<style scoped>

</style>
