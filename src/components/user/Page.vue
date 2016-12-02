/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="Page">
    <a target="_blank" class="shouye">首页</a>
    <a class="page-prev" @click="nextPage(-1)">上一页</a>
    <div id="page_div" class="pagediv" v-for="item in list">
      <a href="javascript:;" @click="getData(item)" :class="{active: item.active}" >{{item.index}}</a>
    </div>
    <a class="page-next" @click="nextPage(1)">下一页</a>
    <a target="_blank" class="weiye">尾页</a>
    <label name="pagelabel">1/1</label><input type="text" class="jump_k" />
    <a target="_blank" class="jump">跳转</a>
  </div>
</template>

<script>
  import VuePaginate from 'vue-paginate'
  export default {
    name: 'Page',
    props: ['pageNum', 'pageSize', 'totalPages'], // 给子组件要传的参数
    components: {VuePaginate},
    data () {
      return {
        active: true,
        list: []
      }
    },
    watch: {
      'pageSize' (newValue, oldValue) {
        this.setInit()
      },
      'pageNum' (newValue, oldValue) {
        this.setInit()
      },
      'totalPages' (newValue, oldValue) {
        this.setInit()
      }
    },
    mounted () {
      this.setInit()
    },
    methods: {
      setInit () {
        let that = this
        let pages = Math.ceil(this.totalPages / this.pageSize)  // 总页数
        let dataArr = []
        for (let i = 1; i <= pages; i++) {
          let activeFlag = false
          if (i === that.pageNum) {
            activeFlag = true
          }
          dataArr.push({ index: i, active: activeFlag })  // index:当前页玛和active的状态
        }
        that.$set(that, 'list', dataArr)
      },
      getData: function (item) {
        let that = this
        for (let i = 0; i < that.list.length; i++) {
          that.list[i].active = false
        }
        item.active = true
        this.$router.push({name: 'warmingType', params: {pageNum: item.index, pageSize: this.pageSize}})
      },
      nextPage: function (k) {
        let lastI = 0
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].active) {
            lastI = i + k
            if (k === 1 && lastI === this.list.length) {
              return
            }
            if (k === -1 && lastI === -1) {
              return
            }
          }
        }
        // debugger
        this.getData(this.list[lastI])
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
