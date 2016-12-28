/**
* Created by myao on 16/12/28.
*/

<template>
    <div class="PhoneUser">
      <div class="phoneOper"></div>
      <div class="messList">
        <table border="1" cellspacing="0">
          <tr>
            <th><label><input type="checkbox" id="checkAllId"/></label></th>
            <th style="width:10%">序号</th>
            <th style="width:30%">手机号码</th>
            <th style="width:30%">用户名</th>
            <th style="width:20%">手机类型</th>
            <th style="width:10%">是否激活</th>
          </tr>
          <!--                      -->
          <!--<tr v-for="(item, index) in jsonData" :class="{active: item.active}" @click="rowLineHight(item.id)">-->
            <!--<th><label><input type="checkbox" @click="selectRow(item.id)" :checked="item.checked" /></label></th>-->
            <!--<th>{{index+1}}</th>-->
            <!--<th>{{ item.groupName }}</th>-->
          <!--</tr>-->
        </table>
      </div>
    </div>
</template>

<script>
  export default {
    props: ['id'],
    name: 'PhoneUser',
    data () {
      return {
        msg: 'hello'
      }
    },
    watch: {
      'id' (newValue, oldValue) {
        console.log(newValue)
      }
    },
    mounted () {
      console.log(this.$route.query.ids)
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .PhoneUser {

  }
</style>
