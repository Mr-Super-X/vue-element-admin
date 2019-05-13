<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <!--会被缓存的视图组件-->
        <router-view v-if="$route.meta.keepAlive" class="router-view"></router-view>
      </keep-alive>
      <!--不会被缓存的视图组件-->
      <router-view v-if="!$route.meta.keepAlive" class="router-view"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  inject: ['reload'], // 注入App.vue中reload方法
}
</script>

<style lang="less" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
