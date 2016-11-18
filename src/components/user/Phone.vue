/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="Phone">
    {{msg}}
  </div>
</template>

<script>
  export default {
    name: 'Phone',
    data () {
      return {
        msg: 'phone'
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .Phone {

  }
</style>
