/**
* Created by myao on 16/11/18.
*/

<template>
  <div class="left">
    <ul>
      <li v-for="data in item" @click="menuClick(data)" :class="{ active: data.active }">
        <img :src="data.img1" alt="" width="20" class="img1">
        <img :src="data.img2" alt="" width="20" class="img2">
        <a href="javascript:;">{{data.text}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import WarmingType from './WarmingType'
  export default {
    name: 'left',
    data () {
      return {
        item: [
          { text: '告 警 类 型',
            img1: require('../../assets/images/warming.png'),
            img2: require('../../assets/images/warming1.png'),
            active: false
          },
          { text: '公交端管理',
            img1: require('../../assets/images/bus.png'),
            img2: require('../../assets/images/bus1.png'),
            active: false
          },
          { text: '手机端管理',
            img1: require('../../assets/images/phone.png'),
            img2: require('../../assets/images/phone1.png'),
            active: false
          },
          { text: '分 组 管 理',
            img1: require('../../assets/images/packet.png'),
            img2: require('../../assets/images/packet1.png'),
            active: false
          },
//          { text: '告 警 消 息',
//            img1: require('../../assets/images/message.png'),
//            img2: require('../../assets/images/message1.png'),
//            active: false
//          }
          { text: '告 警 记 录',
            img1: require('../../assets/images/message.png'),
            img2: require('../../assets/images/message1.png'),
            active: false
          }

        ]
      }
    },
    components: {WarmingType},
    methods: {
      menuClick: function (data) {
        let itemArry = this.item
        for (let i = 0; i < itemArry.length; i++) {
          itemArry[i].active = false
        }
        data.active = true
        let menuText = data.text
        if (menuText === '告 警 类 型') {
          this.$router.push({name: 'warmingType', params: {pageNum: 1, pageSize: 10}})
        } else if (menuText === '公交端管理') {
          this.$router.push({name: 'bus', params: {pageNum: 1, pageSize: 10}})
        } else if (menuText === '手机端管理') {
          this.$router.push({name: 'phone', params: {pageNum: 1, pageSize: 10}})
        } else if (menuText === '分 组 管 理') {
          this.$router.push({name: 'packet'})
        } else if (menuText === '告 警 记 录') {
          this.$router.push({name: 'warmingRecord', params: {pageNum: 1, pageSize: 10}})
        }
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .left{
    width: 100%; background-color: @bgcolor; height: 100%;overflow: hidden;display:inline-block;
    a{color:@bulewhite !important; font-size: @font16; text-align: center; display: block;}
    .menuBar{width:100%;}
    li{width:100%; height: 50px; display: block; line-height: 50px; position: relative;
      border-bottom: 1px solid #2c3544; border-top: 1px solid #455364;
      img{position: absolute; left: 50px; top:15px}
      .img2{display: none}
    }
    li.active{background-color: #439ae1;}
    li.active a{color: @white;}
    li.active img.img1{display: none;}
    li.active img.img2{display: inline-block !important;}
    li:hover{background-color: #439ae1;}
    li:hover a{color: @white}
    li:hover img.img1{display: none;}
    li:hover img.img2{display: inline-block !important;}
    li img{ position: absolute; top:15px; left: 50px;}
  }
</style>
