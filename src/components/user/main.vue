/**
* Created by myao on 16/11/16.
*/

<template>
  <div class="main">
    <div class="head clear">
      <img src="../../assets/images/logo.png" alt="" class="logo pull-left">
      <div class="headRight pull-right">
        <a href="javascript:;" class="manager">
          <img src="../../assets/images/userHead.png" alt="" width="20">
          管理员
        </a>
        <a href="javascript:;" class="exitSys">
          <img src="../../assets/images/exit.png" alt="" width="20">
          退出系统
        </a>
      </div>
    </div>
    <div class="left">
      <ul>
        <li v-for="data in item" @click="menuClick(data)" :class="{ active: data.active }">
          <img :src="data.img1" alt="" width="20" class="img1">
          <img :src="data.img2" alt="" width="20" class="img2">
          <a href="javascript:;">{{ data.text }}</a>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="rightC">
        <!--<div class="welcome">-->
          <!--<img src="../../assets/images/w.png" alt="">-->
          <!--<p>欢迎进入贵阳公交后台管理系统</p>-->
          <!--<img src="../../assets/images/bigBus.png" alt="">-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'main',
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
          { text: '告 警 消 息',
            img1: require('../../assets/images/message.png'),
            img2: require('../../assets/images/message1.png'),
            active: false
          }
        ]
      }
    },
    methods: {
      menuClick: function (data) {
        let itemArry = this.item
        for (let i = 0; i < itemArry.length; i++) {
          itemArry[i].active = false
        }
        data.active = true
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .main {width:100%;height:100%; overflow: hidden;}
  .head{
    width:100%; height: 90px; border: 1px solid #ccc; background-color: @bgcolor;
    .logo{margin-top: 11px;}
    .headRight{margin-top: 30px}
    a{ margin-right: 10px; cursor: pointer;display: inline-block; color: @bulewhite;font-size: @font14}
    img{vertical-align: bottom}
  }
  .left{
    width: 20%; background-color: @bgcolor; height: 100%;overflow: hidden;display:inline-block;
    a{color:@bulewhite; font-size: @font16; text-align: center; display: block;}
    .menuBar{width:100%;}
    li{width:100%; height: 50px; display: block; line-height: 50px; position: relative;
      border-bottom: 1px solid #2c3544; border-top: 1px solid #455364;
      img{position: absolute; left: 50px; top:15px}
      .img2{display: none}
    }
    li.active{background-color: #439ae1;}
    li.active a{color: @white}
    li.active img.img1{display: none;}
    li.active img.img2{display: inline-block !important;}
    li:hover{background-color: #439ae1;}
    li:hover a{color: @white}
    li:hover img.img1{display: none;}
    li:hover img.img2{display: inline-block !important;}
    li img{ position: absolute; top:15px; left: 50px;}
  }
  .right{width: 79%;height: 100%;display:inline-block;text-align: center;}
  .rightC{width: 100%; height:100%;display: table;}
  /*.welcome{*/
    /*display: table-cell; vertical-align: middle; width:100%; height: 100%;*/
    /*p{color: #999; font-size: @font18; margin: 30px 0 60px 0}*/
  /*}*/



</style>
