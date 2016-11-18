/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="Page">
    {{msg}}
  </div>
</template>

<script>
  export default {
    name: 'Page',
    data () {
      return {
        msg: 'hello'
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .Page {

  }
</style>
