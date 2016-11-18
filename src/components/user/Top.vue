/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="top clear">
    <img src="../../assets/images/logo.png" alt="" class="logo pull-left">
    <div class="headRight pull-right">
      <a href="javascript:;" class="manager">
        <img src="../../assets/images/userHead.png" alt="" width="20">
        管理员
      </a>
      <a href="javascript:;" class="exitSys">
        <img src="../../assets/images/exit.png" alt="" width="20">
        退出系统
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top',
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

  .top{
    width:100%; height: 90px; border: 1px solid #ccc; background-color: @bgcolor;
    .logo{margin-top: 11px;}
    .headRight{margin-top: 30px}
    a{ margin-right: 10px; cursor: pointer;display: inline-block; color: @bulewhite !important;font-size: @font14}
    img{vertical-align: bottom}
  }
</style>
