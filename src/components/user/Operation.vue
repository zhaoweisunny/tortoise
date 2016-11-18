/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="Operation clear">
    <div class="opLeft pull-left">
      <a href="javascript:;">
        <img src="../../assets/images/add.png" alt="">
        添加
      </a>
      <a href="javascript:;">
        <img src="../../assets/images/edit.png" alt="">
        编辑
      </a>
      <a href="javascript:;">
        <img src="../../assets/images/delete.png" alt="">
        删除
      </a>
      <a href="javascript:;">
        <img src="../../assets/images/save.png" alt="">
        保存
      </a>
    </div>
    <div class="opRight pull-right">
      <input type="text" class="searchInput" id="keywords" placeholder="类型代码/类型名称">
      <span class="search">
        <img src="../../assets/images/search.png" width="20" alt="">
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Operation',
    data () {
      return {
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .Operation {
    width:100%;padding:15px; border:1px solid #ddd; background-color: #dae6f4;
    a {display: inline-block; margin-right: 15px; font-size: @font14; height: 35px;
      line-height: 35px;
      img{vertical-align: middle; margin-right: 5px;}
    }
  }
  .opRight {background-color:#fff; height:35px; line-height:35px;width:350px;border-radius:3px;
    .searchInput{display: inline-block; width: 290px; height: 35px; line-height: 35px;
      font-size: @font16; color: #666;border: none}
    .search {border-left:1px solid #eee; width:50px; height: 35px; line-height: 35px;
      display: inline-block;cursor: pointer;
    img{vertical-align: middle; margin-left: 6px;}
    }
  }
</style>
