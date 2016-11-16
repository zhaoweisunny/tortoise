/**
* Created by zhaowei on 16/11/2.
*/

<template>
  <div class="Test">
    gdfgdfg
    <h1>{{msg}}</h1>
    引入new模块：<new></new>
  </div>
</template>
<script>
  import New from './New'
  export default {
    name: 'Test',
    data () {
      return {
        msg: '这里是Test模块'
      }
    },
    components: {New}
  }
</script>


<style rel="stylesheet/less" type="text/css">
  @import "../../assets/css/variable.less";

  .Test {

  }
</style>
