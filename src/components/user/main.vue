/**
* Created by myao on 16/11/16.
*/

<template>
  <div class="main">
    <div class="headBox">
      <top></top>
    </div>
    <div class="leftBox">
      <left></left>
    </div>
    <div class="rightBox">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Top from './Top'
  import Left from './Left'
  export default {
    name: 'main',
    data () {
      return {
      }
    },
    components: { Top, Left }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";
  .main {width:@width; height:@height; overflow-y: @hidden; position: relative}
  .headBox {width:@width; height: 90px;overflow: @hidden; position: fixed; top:0; left:0}
  .main {width:@width;height:@height; overflow: @hidden;}
  .leftBox {width:20%; height: @height; overflow: @hidden;display: inline-block; position: fixed; top:90px;left:0}
  .rightBox {width: 80%;height: @height;display:inline-block;text-align: center; position: fixed; top:90px;left:20%}
</style>
