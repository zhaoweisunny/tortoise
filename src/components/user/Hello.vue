<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     引入new模块：<new></new>
    </div>
</template>
<script>
import New from './New'

export default {
  name: 'hello',
  data () {
    return {
      msg: '这里是Hello模块'
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
</style>
