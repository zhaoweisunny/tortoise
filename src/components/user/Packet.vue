/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="Packet">
    {{msg}}
  </div>
</template>

<script>
  export default {
    name: 'Packet',
    data () {
      return {
        msg: 'packet'
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .Packet {

  }
</style>
