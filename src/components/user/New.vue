/**
* Created by Administrator on 2016/11/1.
*/
<template>
  <div class="New">
    {{msg}}
  </div>
</template>
<script>
  export default {
    name: 'New',
    data () {
      return {
        msg: '这里是New模块'
      }
    }
  }
</script>
<style rel="stylesheet/less" type="text/css">
  @import "../../assets/css/variable.less";

  .New {

  }
</style>

