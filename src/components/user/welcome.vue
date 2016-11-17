/**
* Created by myao on 16/11/17.
*/

<template>
  <div class="welcome">
    <img src="../../assets/images/w.png" alt="">
    <p>欢迎进入贵阳公交后台管理系统</p>
    <img src="../../assets/images/bigBus.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'welcome',
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

  .welcome{
    display: table-cell; vertical-align: middle; width:100%; height: 100%;
    p{color: #999; font-size: @font18; margin: 30px 0 60px 0}
  }
</style>
