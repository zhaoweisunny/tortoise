/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="WarmingType clear">
    <operation :placeholder="placeholder" v-on:edit-data="editData" v-on:save-data="saveData" v-on:add-data="addData" v-on:get-retrieval="searchRetrieval" v-on:delete-data="deleteData"></operation>
    <div class="boxContent">
      <table border="1" cellspacing="0">
        <tr>
          <th><label><input type="checkbox" :checked="checked" @click="selectAll" id="checkAllId"/></label></th>
          <th style="width:10%">序号</th>
          <th style="width:20%">类型代码</th>
          <th style="width:20%">类型名称</th>
          <th style="width:50%">描述信息</th>
        </tr>
        <!--:class="{active: item.active}-->
        <tr v-for="(item, index) in jsonData" @click="selectRow(item.id)" >
          <th><label><input type="checkbox" :checked="item.checked" /></label></th>
          <th>{{index+1}}</th>
          <th>{{ item.typeId }}</th>
          <th>{{ item.typeName }}</th>
          <th class="type_describeMess">{{item.typeDesc}}</th>
        </tr>
      </table>
    </div>
    <div class="fixedB">
      <div class="pageBox clear">
        <page :pageNum="pageNum" :pageSize="pageSize" :totalPages="totalPages" ></page>
      </div>
      <div class="boxBotton">
        <div class="leftDiv">
          <div class="mess">
            <span>类型代码：<i>*</i></span>
            <input type="text" class="inputText typeId" v-model="typeId" :disabled="disabled" />
            <div class="tips" :style="{display:display}">告警类型编码格式不正确，请输入1-5位数字！</div>
          </div>
          <div class="mess">
            <span>类型名称：<i>*</i></span>
            <input type="text" class="inputText typeName" @blur="" v-model="typeName" :disabled="disabled" id="typeNameId" />
            <div class="tips" :style="{display:display}">告警类型名称格式不正确，请输入2-100位！</div>
          </div>
        </div>
        <div class="rightDiv">
          <div class="mess">
            <span>描述信息：<i class="vtop">*</i></span>
            <textarea class="inputText typeDesc" @blur="" id="warmingDescribeId" :disabled="disabled" v-model="typeDesc"></textarea>
            <div class="tips" :style="{display:display}">告描述格式不正确，请输入2-300个字符！</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Operation from './Operation'
  import Page from './Page'
  import Validator from 'vue-validator'
  export default {
    name: 'WarmingType',
    data () {
      return {
        retrieval: '',
        jsonData: '',
        pageNum: 1,  // 当前页数
        pageSize: 5, // 每页显示条数
        totalPages: '', // 数据总条数
        placeholder: '类型代码/类型名称',
        disabled: true,
        typeId: '',
        typeName: '',
        typeDesc: '',
        checked: false,
        rowId: [],
        display: 'none'
      }
    },
    components: {Operation, Page, Validator},
    mounted () {
      let that = this
      that.pageNum = parseInt(this.$route.params.pageNum) || 1
      that.pageSize = parseInt(this.$route.params.pageSize) || 5
      this.getData()
      this.$router.afterEach(function (prven, next) {
        that.getData()
      })
    },
    methods: {
      getData: function () {
        let that = this
        that.pageNum = parseInt(this.$route.params.pageNum) || 1
        that.pageSize = parseInt(this.$route.params.pageSize) || 5
        that.$http.post('/alarmcenter/back/AlarmType/selectByRetrieval.page', {
          pageNum: that.pageNum, pageSize: that.pageSize, retrieval: that.retrieval
        }).then(
          (response) => {
            if (response.body.code === 200) {
              let data = response.body.data
              for (let i = 0; i < data.list.length; i++) {
                data.list[i].checked = false
//                data.list[i].active = false
              }
              that.$set(that, 'jsonData', data.list) // 将ajax请求到对数据赋值给jsonData,并添加到返回对data中去
              that.$set(that, 'totalPages', data.totalRows) // 将数据总条数返回到data中
            }
          },
        (response) => {
          console.log('fail' + response)
        })
      },
      searchRetrieval: function (retrieval) {
        this.retrieval = retrieval
        this.getData()
      },
      addData: function () {
        this.disabled = false
        this.checked = false
        for (let i = 0; i < this.jsonData.length; i++) {
          this.jsonData[i].checked = false
        }
        this.setNull()
      },
      saveData: function () {
        let that = this
        let url = ''
        let parms = {}
        console.log(this.rowId)
        if (this.rowId.length === 0) {
          url = '/alarmcenter/back/AlarmType/insert'
          parms = {typeId: that.typeId, typeName: that.typeName, typeDesc: that.typeDesc}
        } else {
          url = '/alarmcenter/back/AlarmType/update'
          parms = {id: JSON.parse(this.rowId), typeId: this.typeId, typeName: this.typeName, typeDesc: this.typeDesc}
        }
        this.$http.post(url, parms
        ).then(
          (response) => {
            if (response.body.code === 200) {
              that.getData()
              this.setNull()
            }
          },
          (response) => {
            console.log('fail' + response.body.message)
          }
        )
      },
      selectAll: function () {
        let thisData = this.jsonData
        this.checked = this.checked ? this.checked = false : true
        if (this.checked) {
          for (let i = 0; i < thisData.length; i++) {
            thisData[i].checked = true
            this.rowId.push(thisData[i].id)
          }
        } else {
          for (let i = 0; i < thisData.length; i++) {
            thisData[i].checked = false
            this.rowId = []
            this.setNull()
          }
        }
      },
      selectRow: function (id) {
        let thisData = this.jsonData
        for (let i = 0; i < thisData.length; i++) {
//          thisData[i].active = false
          if (thisData[i].id === id) {
            thisData[i].active = true
            thisData[i].checked = thisData[i].checked ? thisData[i].checked = false : true
            if (thisData[i].checked) {
              this.rowId.push(thisData[i].id)
              this.typeId = thisData[i].typeId
              this.typeName = thisData[i].typeName
              this.typeDesc = thisData[i].typeDesc
            } else {
              let tempRowId = []
              for (let j = 0; j < this.rowId.length; j++) {
                if (this.rowId[j] !== id) {
                  tempRowId.push(this.rowId[j]) // 把rowId里面除了当前id的数据赋值给tempRowId
                }
              }
              if (tempRowId.length === 0) {
                this.setNull()
              }
              this.rowId = tempRowId
            }
          }
        }
        if (this.rowId.length < thisData.length) {
          this.checked = false
        } else {
          this.checked = true
        }
      },
      deleteData: function () {
        let that = this
        this.isSelect()
        this.$http.post('/alarmcenter/back/AlarmType/deleteById', JSON.stringify(that.rowId)
        ).then(
          (response) => {
            if (response.body.code === 200) {
              that.getData()
              that.rowId.length = 0
              that.setNull()
              if (that.jsonData.length === 0) {
                that.checked = false
              }
            }
          },
          (response) => {
            console.log('fail' + response.body.message)
          }
        )
      },
      editData: function () {
        this.isSelect()
        this.disabled = false
      },
      isSelect: function () {
        let activeArry = []
        for (let i = 0; i < this.jsonData.length; i++) {
          if (this.jsonData[i].active === false) {
            activeArry.push(this.jsonData[i].active)
          }
        }
        console.log(activeArry)
        if (activeArry.length === this.jsonData.length) {
          console.log('请选择要删除或编辑的行')
          return
        }
      },
      setNull: function () {
        this.typeId = ''
        this.typeName = ''
        this.typeDesc = ''
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
    tr.active{background-color: #f3f3f9}
  }
  .fixedB{position: fixed; bottom:0; bottom:15px;width:80%;}
  .boxBotton{
    border:1px solid #ddd; display: table;text-align:left;width:98%;
    .mess{position: relative;padding-bottom: 20px; margin-bottom: 20px;
      i{font-style: normal;color: #ff0000; vertical-align: middle }
      .tips{color: #fb0006; font-size: @font12; margin-top: 5px; position: absolute; left:83px;}
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
