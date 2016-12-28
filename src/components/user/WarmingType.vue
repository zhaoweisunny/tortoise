/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="WarmingType clear">
    <operation :placeholder="placeholder" v-on:add-data="addData" v-on:get-retrieval="searchRetrieval" v-on:batch-delete="batchDelete"></operation>
    <div class="boxContent">
      <table border="1" cellspacing="0">
        <tr>
          <th><label><input type="checkbox" :checked="checked" @click="selectAll" id="checkAllId"/></label></th>
          <th style="width:10%">序号</th>
          <th style="width:20%">类型代码</th>
          <th style="width:20%">类型名称</th>
          <th style="width:30%">描述信息</th>
          <th style="width:20%">操作</th>
        </tr>
        <!--                      -->
        <tr v-for="(item, index) in jsonData" :class="{active: item.active}" @click="rowLineHight(item.id)">
          <th><label><input type="checkbox" @click="selectRow(item.id)" :checked="item.checked" /></label></th>
          <th>{{index+1}}</th>
          <th>{{ item.typeId }}</th>
          <th>{{ item.typeName }}</th>
          <th class="type_describeMess">{{item.typeDesc}}</th>
          <th class="op">
            <a @click="delRowData(item.id)" class="del" >删除 <img src="../../assets/images/delete.png" width="20" alt=""></a>
            <a @click="editData(item.id)" class="edi">编辑 <img src="../../assets/images/edit.png" width="20" alt=""></a>
          </th>
        </tr>
      </table>
    </div>
    <div class="pageBox clear">
      <pager :totalPage="totalPage" :initPage="page" @go-page="goPage"></pager>
    </div>
    <type-edit v-show="showDialog" v-on:update-data="refreshData" :selectId="selectId" :jsonData="jsonData" :opType="opType"></type-edit>
  </div>
</template>
<script>
  import Operation from './Operation'
  import Pager from 'vue-simple-pager'
  import TypeEdit from '../../template/TypeEdit'
  import { default as swal } from 'sweetalert2'
  export default {
    name: 'WarmingType',
    data () {
      return {
        retrieval: '',
        jsonData: '',
        pageNum: 1,
        page: 1,  // 当前页数
        pageSize: 10, // 每页显示条数
        totalPage: '', // 数据总条数
        placeholder: '类型代码/类型名称',
        disabled: true,
        checked: false,
        rowId: [],
        display: 'none',
        selectId: '',
        showDialog: false,
        opType: '',
        pageShow: true
      }
    },
    components: {Operation, Pager, TypeEdit},
    mounted () {
      let that = this
      this.pageNum = parseInt(this.$route.params.page) || 1
      this.pageSize = parseInt(this.$route.params.pageSize) || 10
      this.getData()
      this.$router.afterEach(function (prven, next) {
        that.getData()
      })
    },
    methods: {
      goPage (data) {
        this.page = data.page
        this.$router.push({name: 'warmingType', params: {pageNum: this.page, pageSize: this.pageSize}})
      },
      getData: function () {   // 请求接口获取数据列表
        let that = this
        this.pageNum = parseInt(this.$route.params.page) || 1
        this.pageSize = parseInt(this.$route.params.pageSize) || 10
        that.$http.post('/alarmcenter/back/AlarmType/selectByRetrieval.page', {
          pageNum: that.page, pageSize: that.pageSize, retrieval: that.retrieval
        }).then(
          (response) => {
            if (response.body.code === 200) {
              let data = response.body.data
              this.renderData(data)
            }
          },
        (response) => {
          console.log('fail' + response)
        })
      },
      renderData: function (data) {
        if (data.list.length === 0) {
          this.pageShow = false
        } else {
          this.pageShow = true
        }
        for (let i = 0; i < data.list.length; i++) {
          data.list[i].checked = false
          data.list[i].active = false
        }
        this.$set(this, 'jsonData', data.list) // 将ajax请求到对数据赋值给jsonData,并添加到返回对data中去
        this.$set(this, 'totalPage', Math.ceil(data.totalRows / data.pageSize)) // 将数据总页数返回到data中
        this.checked = false
      },
      refreshData: function (flag) {
        if (flag) {
          this.getData()
          this.showDialog = false
        }
      },
      searchRetrieval: function (retrieval) { // 搜索
        this.retrieval = retrieval
        this.getData()
      },
      selectAll: function () {  // 选中所有数据
        let thisData = this.jsonData
        this.checked = this.checked ? this.checked = false : true
        if (this.checked) {
          for (let i = 0; i < thisData.length; i++) {
            thisData[i].checked = true
            this.rowId.push(thisData[i].id)
            thisData[i].active = false
          }
        } else {
          for (let j = 0; j < thisData.length; j++) {
            thisData[j].checked = false
            this.rowId = []
            thisData[j].active = false
          }
        }
      },
      selectRow: function (id) {  // 选中单行,多行数据
        let thisData = this.jsonData
        for (let i = 0; i < thisData.length; i++) {
          if (thisData[i].id === id) {
            thisData[i].checked = thisData[i].checked ? thisData[i].checked = false : true
            if (thisData[i].checked) {
              this.rowId.push(thisData[i].id)
            } else {
              let tempRowId = []
              for (let j = 0; j < this.rowId.length; j++) {
                if (this.rowId[j] !== id) {
                  tempRowId.push(this.rowId[j]) // 把rowId里面除了当前id的数据赋值给tempRowId
                }
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
      rowLineHight: function (id) {  // 选中行效果
        let thisData = this.jsonData
        for (let i = 0; i < thisData.length; i++) {
          thisData[i].active = false
          if (thisData[i].id === id) {
            thisData[i].active = true
          }
        }
      },
      batchDelete: function () {  // 批量/单行删除数据入口
        let that = this
        if (this.rowId.length === 0) {
          swal('请选择要删除的行')
          return
        }
        swal({
          title: '您确定要删除所选用户吗?',
          text: '您确定要删除所选用户吗?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '是的，我要删除!',
          cancelButtonText: 'cancel'
        }).then(function () {
          that.$http.post('/alarmcenter/back/AlarmType/deleteById', JSON.stringify(that.rowId)
          ).then(
            (response) => {
              if (response.body.code === 200) {
                that.getData()
                that.rowId.length = 0
                if (that.jsonData.length === 0) {
                  that.checked = false
                }
                swal('删除成功!')
              }
            },
            (response) => {
              console.log('fail' + response.body.message)
            }
          )
        }, function (dismiss) {
        })
      },
      delRowData: function (id) {  // 单行删除
        let arrId = []
        arrId.push(id)
        this.rowId = arrId
        this.batchDelete()
      },
      editData: function (id) {   // 编辑数据
        this.opType = 'edit'
        this.selectId = id
        this.showDialog = true
        this.$set(this, 'jsonData', this.jsonData)
        this.$set(this, 'selectId', this.selectId)
        this.$set(this, 'opType', this.opType)
      },
      addData: function () {  // 添加
        this.opType = 'add'
        this.showDialog = true
        this.$set(this, 'jsonData', '')
        this.$set(this, 'selectId', '')
        this.$set(this, 'opType', this.opType)
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
      .op{
        a:first-child{margin-right: 20px;}
        img{vertical-align: bottom}
      }
    }
    input[type='checkbox']{width:50px; height:30px;}
    tr.active{background-color: #f3f3f9}
    }
    .pageBox{position: fixed; bottom:0; bottom:15px;width:80%;}
</style>
<style rel="stylesheet" lang="css">
  @import "../../assets/css/sweetalert2.css";
</style>
