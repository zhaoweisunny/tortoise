/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="WarmingType">
    <operation></operation>
    <div class="boxContent">
      <table border="1" cellspacing="0">
        <tr>
          <th><label><input type="checkbox" id="checkAllId"/></label></th>
          <th style="width:10%">序号</th>
          <th style="width:20%">类型代码</th>
          <th style="width:20%">类型名称</th>
          <th style="width:50%">描述信息</th>
        </tr>
        <tr >
          <th><label><input type="checkbox" /></label></th>
          <th>1</th>
          <th>11111</th>
          <th>1111111</th>
          <th class="type_describeMess">1111111</th>
        </tr>
      </table>
    </div>
    div
  </div>
</template>
<script>
  import Operation from './Operation'
  export default {
    name: 'WarmingType',
    data () {
      return {
      }
    },
    components: {Operation}
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .WarmingType {
    width:100%; height: 100%;
  }
  table{
    th{text-align: left;color:#656565;}
  }
  input[type='checkbox']{width:50px; height:30px;}
</style>
</style>
