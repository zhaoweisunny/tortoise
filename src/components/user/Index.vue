/**
* Created by Administrator on 2016/11/9.
*/

<template>
  <div class="index">
    {{ msg }}
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        msg: 'IndexVueContent'
      }
    }
  }
</script>


<style rel="stylesheet/less" type="text/css">
  @import "../../assets/css/variable.less";

  .index {

  }
</style>
