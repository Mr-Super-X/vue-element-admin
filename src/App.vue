<template>
  <div id="app">
    <router-view v-if="isRouterAlive" v-cloak/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() { //向下注入刷新视图方法
      return {
        reload: this.reload
      };
    },
    data() {
      return {
        isRouterAlive: true
      };
    },
    methods: {
      //刷新当前页面
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      }
    }
  }
</script>
