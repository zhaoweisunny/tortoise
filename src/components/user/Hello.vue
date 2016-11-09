<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul v-for="(item,index) in mess">
      <li v-bind:class="red">{{index}}:{{item.text}}</li>
    </ul>
    <div>
      引入new模块：<new></new>
    </div>
    <input v-bind:style="{color:red}" type="button" value="点击">
  </div>
</template>
<script>
import New from './New'

export default {
  name: 'hello',
  data () {
    return {
      msg: '这里是Hello模块',
      red: 'red',
      mess: [
        {text: '1111111'},
        {text: '2222222'},
        {text: '3333333'},
        {text: '4444444'},
        {text: '5555555'}
      ]
    }
  },
  components: {New}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" type="text/css">
  @import "../../assets/css/variable.less";
  h1, h2 {
    font-weight: normal;
  }

  ul { list-style-type: none;  padding: 0;
    li { display: inline-block;  margin: 0 10px;
      a { color: @mainColor01; }
    }
  }

  .red{ color: red;}
</style>
