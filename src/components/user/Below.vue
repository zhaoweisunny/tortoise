/**
* Created by myao on 17/1/9.
*/

<template>
  <div class="Below" v-show="belowShow">
   <div class="messHead clear">
    <span class="title pull-left">{{title}}</span>
    <span class="closeBox pull-right" @click="closeBox">{{closeBtn}}</span>
   </div>
    <div class="messList">
      <div class="messDetail">
        <h3>{{tipsTitle}}</h3>
        <div class="mess">
          贵A[99854] 打电话 贵A0434奋斗奋斗舒服
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { default as swal } from 'sweetalert2'
//  import webscoket from 'websocket'
  export default {
    name: 'Below',
    data () {
      return {
        title: '消息提示框',
        belowShow: true,
        closeBtn: '关闭',
        tipsTitle: '告警提示',
        websocket: null
      }
    },
    mounted () {
      this.connect()
    },
    methods: {
      closeBox: function () {
        this.belowShow = false
      },
      connect: function () {
        let wbs = null
        let hostport = document.location.host
        if ('WebSocket' in window) {
          wbs = new window.WebSocket('ws://' + hostport + '/alarmcenter/websocket')
          console.log(wbs)
        } else {
          swal('Not support websocket')
        }
        wbs.onopen = function () {
          console.log('open')
        }
        wbs.onbeforeunload = function () {
          wbs.close()
          console.log('close')
        }
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .Below {
    width: 200px; height:auto; background-color: #f5f5f5;border-radius: 5px; border:1px solid #e1e1e1;
    position: fixed; right:10px; bottom:5px;
    .messHead{height: 30px; line-height: 30px;background-color: #F7F1F0; border-bottom: 1px solid #e1e1e1;
      .title{padding-left: 10px}
      .closeBox{padding: 0 10px; cursor: pointer}
    }
    .messList{padding: 5px 10px;
      h3{font-size: 18px;font-weight: bold; color: #000}
      .mess{padding-bottom: 10px;}
      .messDetail{border-bottom: 1px dotted #999;}
    }
  }
</style>
