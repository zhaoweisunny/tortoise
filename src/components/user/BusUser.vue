/**
* Created by myao on 16/12/29.
*/

<template>
  <div class="BusUser">
    <div class="phoneOper clear">
      <div class="pull-left boxLeft">
          <span class="back" @click="back">返回</span>
          <span>
            <select v-model="selectType" @change="changeStatus">
              <option value="2">所有手机端用户</option>
              <option value="1">当前分组手机端用户</option>
              <option value="0">不属于当前分组手机端用户</option>
            </select>
          </span>
      </div>
      <div class="class pull-right boxRight">
        <input type="text" @keydown.enter="searchRetrieval" class="inputText" v-model='retrieval' placeholder="公交路数/车牌号">
          <span class="search" @click="searchRetrieval">
            <img src="../../assets/images/search.png" width="20" alt="">
          </span>
      </div>
    </div>
    <div class="messList">
      <table border="1" cellspacing="0">
        <tr>
          <th><label><input type="checkbox" :checked="checked" id="checkAllId"/></label></th>
          <th style="width:20%">序号</th>
          <th style="width:40%">公交路数</th>
          <th style="width:40%">车牌号</th>
        </tr>
        <tr v-for="(item, index) in jsonData">
          <th><label><input type="checkbox"/></label></th>
          <th>{{index+1}}</th>
          <th>{{ item.busRoute }}</th>
          <th>{{ item.plateNumber }}</th>
        </tr>
      </table>
    </div>
    <div class="pageBox clear">
      <pager :totalPage="totalPage" :initPage="page" @go-page="goPage"></pager>
    </div>
  </div>
</template>

<script>
  import Pager from 'vue-simple-pager'
  import { default as swal } from 'sweetalert2'
  export default {
    props: ['id'],
    name: 'BusUser',
    data () {
      return {
        retrieval: '',
        groupId: '',
        pageNum: 1,
        page: 1,
        totalPage: '',
        pageSize: 10,
        selectType: 2,
        jsonData: [],
        data: ''
      }
    },
    watch: {
      'groupId' (newValue, oldValue) {
        this.selectType = 1
        this.getDataById()
      }
    },
    components: {Pager},
    mounted () {
      let that = this
      this.groupId = this.$route.query.ids
      this.pageNum = parseInt(this.$route.params.page) || 1
      this.pageSize = parseInt(this.$route.params.pageSize) || 10
      this.$router.afterEach(function (prven, next) {
        that.getDataById()
      })
    },
    methods: {
      goPage (data) {
        this.data = data
        this.page = data.page
        this.$router.push({name: 'busUser', params: {pageNum: this.page, pageSize: this.pageSize}, query: {ids: this.groupId}})
      },
      getDataById: function () {
        let that = this
        this.$http.post('/alarmcenter/back/TerminalMobileGroup/selectTerminalByGroupId.page', {
          pageNum: that.page, pageSize: that.pageSize, retrieval: that.retrieval, groupId: that.groupId, choiceStatus: that.selectType
        }).then(
        (response) => {
          if (response.body.code === 200) {
            console.log(response)
            let data = response.body.data.list
            that.jsonData = data
            that.totalPage = Math.ceil(response.body.data.totalRows / response.body.data.pageSize)
          }
        },
        (response) => {
          swal('fail' + response)
        })
      },
      searchRetrieval: function () { // 搜索
        this.page = 1
        this.getDataById()
        this.$router.push({name: 'busUser', params: {pageNum: this.page, pageSize: this.pageSize}, query: {ids: this.groupId}})
      },
      changeStatus: function () {
        this.retrieval = ''
        this.getDataById()
        this.data.page = 1
        this.goPage(this.data)
      },
      back: function () {
        this.$router.push({name: 'packet', params: {pageNum: 1, pageSize: 10}})
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .BusUser {width:100%; height:100%;
    table{
      th{text-align: left;color:#656565;padding-left:15px}
      .op{
        a:first-child{margin-right: 5px;}
        img{vertical-align: bottom}
      }
    }
    input[type='checkbox']{width:50px; height:30px;}
    tr.active{background-color: #f3f3f9}
    .phoneOper{width:100%;padding:15px; border:1px solid #ddd; background-color: #dae6f4;color: #666;-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;}
    .pageBox{position: fixed; bottom:0; bottom:15px;width:80%;}
    .back{display: inline-block; width:80px; height: 35px; line-height: 35px; text-align: center; font-size: 18px; border-radius: 5px;background:rgba(0,0,0,.8);color: #fff; cursor: pointer; margin-right: 120px;}
    .back:hover{background: rgba(0,0,0,1)}
    .boxRight{background-color: #fff; height: 35px; line-height: 35px; width:350px; border-radius: 3px;
      .inputText{display: inline-block; width: 280px; height: 32px; line-height: 32px; font-size: @font16; color: #666;border: none !important;}
      .search{border-left:1px solid #eee; width:50px; height: 35px; line-height: 35px; display: inline-block;cursor: pointer;}
      img{vertical-align: middle; margin-left: 6px;}
    }
  }
</style>
