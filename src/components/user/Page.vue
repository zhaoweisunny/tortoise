/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="Page">
    <a target="_blank" class="shouye">首页</a>
    <a target="_blank" class="page-prev">上一页</a>
    <div id="page_div" class="pagediv" v-for="(index, item) in pageNums">
      <a href="javascript:;" @click="getData(index)" >{{index}}</a>
    </div>
    <a class="page-next">下一页</a>
    <a target="_blank" class="weiye">尾页</a>
    <label name="pagelabel">1/1</label><input type="text" class="jump_k" />
    <a target="_blank" class="jump">跳转</a>
  </div>
</template>

<script>
  export default {
    name: 'Page',
    props: ['pageNums'],
    data () {
      return {
        active: true
      }
    },
    methods: {
      getData: function (index) {
        this.$emit('click', index)
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .Page {
    float: right; height:40px; line-height:40px; margin:20px 0 20px 0;margin-right:20px;
    a{display: inline-block;border-right: 1px solid #ddd; height: 38px; line-height: 38px; padding: 0 15px;
      background-color:#fff;cursor: pointer;float: left;border-top: 1px solid #ddd; border-bottom: 1px solid #ddd;}
    .shouye{border-left: 1px solid #ddd;}
    .pagediv{display: inline-block;padding: 0;border-right: none;border-bottom: none;float:left;
      a{height: 38px; line-height: 37px; border-top:1px solid #ddd;}
      a.active{background-color: #f3f3f9}
    }
    .pagelabel{float:left}
    .jump_k{min-width: 50px; width:50px;padding: 0 5px;border: none;background-color: #fff; height: 38px; line-height: 38px;float: left;
      border-right: 1px solid #ddd;border-top: 1px solid #ddd; border-bottom: 1px solid #ddd;}
  }
</style>
