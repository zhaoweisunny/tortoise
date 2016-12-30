/**
* Created by myao on 16/12/22.
*/

<template>
  <div class="WarmingRecord clear">
    <div class="topOperation clear">
      <div class="pull-left boxLeft">
        <span class="delete" @click="batchDelete">
          <img src="../../assets/images/delete.png" alt="">
          批量删除删除
        </span>
        <span class="startTime">
          <input id="startTime" v-model="startEventTime" @click="selectStart" class="laydate-icon" placeholder="告警开始时间"/>
        </span>
        <span>到</span>
        <span class="endTime">
          <input id="endTime" @click="selectEnd" v-model="endEventTime" class="laydate-icon" placeholder="告警结束时间"/>
        </span>
        <span>
          <select v-model="selectType" @change="selectWarmingType">
            <option value="-1">全部</option>
            <option v-for="type in typeData" :value="type.id">{{type.typeId}}</option>
          </select>
        </span>
      </div>
      <div class="class pull-right boxRight">
        <input type="text" @keydown.enter="searchRetrieval" class="inputText" v-model='retrieval' :placeholder="placeholder" id="keywords">
        <span class="search" @click="searchRetrieval">
          <img src="../../assets/images/search.png" width="20" alt="">
        </span>
      </div>
    </div>
    <div class="boxContent">
      <table border="1" cellspacing="0">
        <tr>
          <th><label><input type="checkbox" :checked="checked" @click="selectAll" id="checkAllId"/></label></th>
          <th style="width:10%">序号</th>
          <th style="width:30%">告警图片</th>
          <th style="width:10%">告警类型</th>
          <th style="width:20%">告警公交</th>
          <th style="width:20%">告警时间</th>
          <th style="width:10%">操作</th>
        </tr>
        <!--                      -->
        <tr v-for="(item, index) in jsonData" :class="{active: item.active}" @click="rowLineHight(item.id)">
          <th><label><input type="checkbox" @click="selectRow(item.id)" :checked="item.checked" /></label></th>
          <th>{{index+1}}</th>
          <th>
            <img v-for="imgs in item.urls" :src="imgs" alt="" width="20">
          </th>
          <th>{{ item.typeId }}</th>
          <th>{{ item.busRoute }}[{{item.plateNumber}}]</th>
          <th>{{item.eventTimeFmt}}</th>
          <th class="op">
            <a @click="delRowData(item.id)" class="del" >删除 <img src="../../assets/images/delete.png" width="20" alt=""></a>
          </th>
        </tr>
      </table>
    </div>
    <div class="pageBox clear">
      <pager :totalPage="totalPage" :initPage="page" @go-page="goPage"></pager>
    </div>
  </div>
</template>
<script>
  import { default as swal } from 'sweetalert2'
  import Pager from 'vue-simple-pager'
  export default {
    name: 'WarmingRecord',
    data () {
      return {
        retrieval: '',
        selectType: '-1',
        typeId: '',
        jsonData: '',
        pageNum: 1,
        page: 1,  // 当前页数
        pageSize: 10, // 每页显示条数
        totalPage: '',
        placeholder: '高警公交',
        startEventTime: '',
        endEventTime: '',
        disabled: true,
        checked: false,
        rowId: [],
        display: 'none',
        selectId: '',
        showDialog: false,
//        pageShow: true,
        typeData: []
      }
    },
    components: {Pager},
    mounted () {
      let that = this
      that.getType()
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
        this.$router.push({name: 'warmingRecord', params: {pageNum: this.page, pageSize: this.pageSize}})
//        this.getData()
      },
      getData: function () {   // 请求接口获取数据列表
        let that = this
        this.pageNum = parseInt(this.$route.params.page) || 1
        this.pageSize = parseInt(this.$route.params.pageSize) || 10
        if (this.startEventTime !== null && this.endEventTime !== null) {
          let sDate = new Date(this.startEventTime).getTime()
          let eDate = new Date(this.endEventTime).getTime()
          if (sDate > eDate) {
            sDate = eDate
            this.endEventTime = this.startEventTime
          }
        }
        that.$http.post('/alarmcenter/back/behaviourRecord/selectByBehaviourRecords.page', {
          pageNum: that.page, pageSize: that.pageSize, searchText: that.retrieval, startEventTime: this.startEventTime, endEventTime: this.endEventTime, typeId: this.typeId
        }).then(
        (response) => {
          if (response.body.code === 200) {
            let data = response.body.data
            that.renderData(data)
          }
        },
        (response) => {
          swal('fail' + response)
        })
      },
      getType: function () {
        this.$http.post('/alarmcenter/back/AlarmType/findAllAlarmTypes', {}).then(
          (response) => {
            if (response.body.code === 200) {
              this.typeData = response.body.data
            }
          },
          (response) => {
            swal('fail' + response.body.message)
          }
        )
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
        this.$set(this, 'totalPage', Math.ceil(data.totalRows / data.pageSize))
        this.checked = false
      },
      refreshData: function (flag) {
        if (flag) {
          this.getData()
          this.showDialog = false
        }
      },
      searchRetrieval: function (retrieval) { // 搜索
        this.searchText = retrieval
        this.page = 1
        this.$router.push({name: 'warmingRecord', params: {pageNum: this.page, pageSize: this.pageSize}})
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
          that.$http.post('/alarmcenter/back/behaviourRecord/deleteById', JSON.stringify(that.rowId)
          ).then(
            (response) => {
              if (response.body.code === 200) {
                that.getData()
                that.rowId.length = 0
                if (that.jsonData.length === 0) {
                  that.checked = false
                }
              }
            },
            (response) => {
              swal('fail' + response.body.message)
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
      addData: function () {  // 添加
        this.showDialog = true
        this.$set(this, 'jsonData', '')
        this.$set(this, 'selectId', '')
      },
      selectStart: function () {  // 选择时间
        let that = this
        window.laydate({
          elem: '#startTime',
          istoday: false,
          istime: true,
          format: 'YYYY/MM/DD hh:mm:ss',
          festival: true,
          max: '2099/12/12 23: 59:59',
          choose: function (datas) {
            if (datas !== '') {
              that.startEventTime = datas
              that.searchText = ''
              that.getData()
            }
          }
        })
      },
      selectEnd: function () {   // 选择时间
        let that = this
        window.laydate({
          elem: '#endTime',
          istoday: false,
          istime: true,
          format: 'YYYY/MM/DD hh:mm:ss',
          festival: true,
          max: '2099/12/12 23: 59:59',
          choose: function (datas) {
            if (datas !== '') {
              that.endEventTime = datas
              that.searchText = ''
              that.getData()
            }
          }
        })
      },
      selectWarmingType: function () {  // 选择告警类型
        if (this.selectType !== '') {
          this.searchText = ''
          this.typeId = this.selectType
        }
        if (this.selectType === '-1') {
          this.typeId = ''
        }
        this.getData()
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .WarmingRecord {
    width:100%; height: 100%;
    table{
      th{text-align: left;color:#656565;padding-left:15px}
      .op{
        a:first-child{margin-right: 5px;}
        img{vertical-align: bottom}
      }
    }
    input[type='checkbox']{width:50px; height:30px;}
    tr.active{background-color: #f3f3f9}
  }
    .pageBox{position: fixed; bottom:0; bottom:15px;width:80%;}
    .topOperation{width:100%;padding:15px; border:1px solid #ddd; background-color: #dae6f4;color: #666;-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;
  .boxLeft span{
        display: inline-block;; margin-right: 15px; cursor: pointer; height: 35px; line-height: 35px; font-size: 14px;
        img{vertical-align: middle; margin-right: 5px;}
      }
    .boxRight{background-color: #fff; height: 35px; line-height: 35px; width:350px; border-radius: 3px;
      .inputText{display: inline-block; width: 280px; height: 32px; line-height: 32px; font-size: @font16; color: #666;border: none !important;}
      .search{border-left:1px solid #eee; width:50px; height: 35px; line-height: 35px; display: inline-block;cursor: pointer;}
      img{vertical-align: middle; margin-left: 6px;}
    }
    #startTime,#endTime{cursor: pointer}
  }
</style>
<style rel="stylesheet" lang="css">
  @import "../../assets/css/sweetalert2.css";
</style>
</style>
