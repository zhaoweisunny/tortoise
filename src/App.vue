<template>
  <div id="app">


    <!-- 测试模块两个 -->
    <hello></hello>
    <test></test>
    <new></new>
  </div>
</template>

<script>
import Hello from './components/user/Hello'
import Test from './components/user/Test'
import New from './components/user/New'

export default {
  name: 'app',
  components: {Hello, Test, New}
}
</script>

<style rel="stylesheet/less" type="text/css">
  @import "./assets/css/common.less";
  #app {

  }
</style>
