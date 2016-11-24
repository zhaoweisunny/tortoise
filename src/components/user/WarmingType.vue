/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="WarmingType clear">
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
        <tr v-for="(item, index) in jsonData">
          <th><label><input type="checkbox" /></label></th>
          <th>{{index+1}}</th>
          <th>{{ item.typeId }}</th>
          <th>{{ item.typeName }}</th>
          <th class="type_describeMess">{{item.typeDesc}}</th>
        </tr>
      </table>
    </div>
    <div class="fixedB">
      <div class="pageBox clear">
        <page :pageNums="pageNums" v-on:click="refreshData"></page>
      </div>
      <div class="boxBotton">
        <div class="leftDiv">
          <div class="mess">
            <span>类型代码：<i>*</i></span>
            <input type="text" class="inputText typeId" v-model="typeId" />
            <div class="tips">告警类型编码格式不正确，请输入1-5位数字！</div>
          </div>
          <div class="mess">
            <span>类型名称：<i>*</i></span>
            <input type="text" class="inputText typeName" v-model="typeName" id="typeNameId" />
            <div class="tips">告警类型名称格式不正确，请输入2-100位！</div>
          </div>
        </div>
        <div class="rightDiv">
          <div class="mess">
            <span>描述信息：<i class="vtop">*</i></span>
            <textarea class="inputText typeDesc" id="warmingDescribeId" v-model="typeDesc"></textarea>
            <div class="tips">告描述格式不正确，请输入2-300个字符！</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Operation from './Operation'
  import Page from './Page'
  export default {
    name: 'WarmingType',
    data () {
      return {
        retrieval: '',
        jsonData: '',
        pageNums: '',
        pageNum: '1'
      }
    },
    components: {
      Operation, Page
    },
    mounted () {
      let that = this
      this.$http.post('/alarmcenter/back/AlarmType/selectByRetrieval.page', {
        pageNum: that.pageNum, pageSize: '5', retrieval: that.retrieval
      }).then(
        (response) => {
          if (response.body.code === 200) {
            let data = response.body.data
            debugger
            let pageNums = Math.ceil(data.totalRows / data.pageSize) // 总页数
            that.$set(that, 'jsonData', data.list)
            that.$set(that, 'pageNums', pageNums) // 将ajax请求到对数据赋值给jsonData,并添加到返回对data中去
          }
        },
      (response) => {
        console.log('fail' + response)
      }
      )
    },
    methods: {
      refreshData: function (index) {
        var that = this
        that.pageNum = index
        console.log(index)
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .WarmingType {
    width:100%; height: 100%;
    table{
      th{text-align: left;color:#656565;padding-left:15px}
    }
    input[type='checkbox']{width:50px; height:30px;}
  }
  .fixedB{position: fixed; bottom:0; bottom:15px;width:80%;}
  .boxBotton{
    border:1px solid #ddd; display: table;text-align:left;width:98%;
    .mess{position: relative;padding-bottom: 20px; margin-bottom: 20px;
      i{font-style: normal;color: #ff0000; vertical-align: middle }
      .tips{color: #fb0006; font-size: @font12; margin-top: 5px; position: absolute; left:83px;display: none}
      .inputText{width:60%; font-size: @font14; padding: 5px 10px; border:1px solid #ddd; border-radius: 3px}
    }
    .leftDiv,.rightDiv,.centerBox{padding: 15px; height: 100%;display: table-cell; vertical-align: middle;
      .mess{padding-bottom: 20px; margin-bottom: 20px;}
    }
    .leftDiv{border-right:1px solid #ddd; width:40%;
      .inputText{height: 37px; line-height: 37px;}
      .mess:last-child{margin-bottom: 0}
    }
    .rightDiv{width: 30%;
      .vtop{vertical-align: top;}
      textarea{height: 120px;width:80% !important;position: relative}
      span{vertical-align: top}
    }
  }
</style>
