/**
* Created by zhaowei on 16/11/2.
*/

<template>
  <div class="Test">
{{msg}}
  </div>
</template>
<script>
  export default {
    name: 'Test',
    data () {
      return {
        msg: 'hello'
      }
    }
  }
</script>


<style rel="stylesheet/less" type="text/css">
  @import "../../assets/css/variable.less";

  .Test {

  }
</style>
