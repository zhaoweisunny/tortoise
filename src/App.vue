<template>
  <div id="app">
    <index></index>
  </div>
</template>
<script>
import Index from './components/user/Index'
export default {
  name: ' app',
  components: { Index }
}
</script>
<style rel="stylesheet/less" type="text/css">
  @import "./assets/css/common.less";
  #app {

  }
</style>
