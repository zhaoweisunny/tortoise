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
    <div class="belowBox">
      <below></below>
    </div>
  </div>
</template>

<script>
  import Top from './Top'
  import Left from './Left'
  import Below from './Below'
  export default {
    name: 'main',
    data () {
      return {
      }
    },
    components: { Top, Left, Below }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";
  .main {width:@width; height:@height; overflow-y: @hidden; position: relative}
  .headBox {width:@width; height: 90px;overflow: @hidden; position: fixed; top:0; left:0}
  .main {width:@width;height:@height; overflow: @hidden;}
  .leftBox {width:20%; height: @height; overflow: @hidden;display: inline-block; position: fixed; top:90px;left:0}
  .rightBox {width: 80%;height: @height;display:inline-block;text-align: center; position: fixed; top:90px;left:20%;padding: 15px;-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;}
  .belowBox {width:100%; height: auto; position: fixed; bottom: 0; right:10px; z-index: 1000}
</style>
