/**
* Created by myao on 16/12/14.
*/

<template>
<div class="Add" v-show="close">
  <div class="wrap">
    <div class="wHead">编辑告警类型</div>
    <div class="wContent">
      <div class="mess">
        <span class="lal">类型代码:<i>*</i></span>
        <input type="text" v-model="typeId" class="inputText">
        <span class="tips" v-show="show">告警类型编码格式不正确,请输入1-5位数字</span>
      </div>
      <div class="mess">
        <span class="lal">类型名称:<i>*</i></span>
        <input type="text" v-model="typeName" class="inputText">
        <span class="tips" v-show="show">告警类型名称格式不正确,请输入2-100位</span>
      </div>
      <div class="mess">
        <span class="lal">描述信息:<i>*</i></span>
        <textarea type="text" v-model="typeDesc" class="typeDesc inputText"></textarea>
        <span class="tips" v-show="show">告警描述格式不正确,请输入2-300个字符</span>
      </div>
    </div>
    <div class="wButtons">
      <span class="save" @click="update">保存</span>
      <span class="cancel" @click="close">取消</span>
    </div>
  </div>
  <div class="modalLayer"></div>
</div>
</template>

<script>
  export default {
    name: 'Add',
    props: ['selectId', 'jsonData'],
    data () {
      return {
        msg: 'hello',
        show: false,
        typeId: '',
        typeName: '',
        typeDesc: '',
        close: true
      }
    },
    mounted () {
      let that = this
      setTimeout(function () {
        that.setMess()
      }, 2000)
    },
    methods: {
      setMess: function () {
        for (let i = 0; i < this.jsonData.length; i++) {
          if (this.jsonData[i].id === this.selectId) {
            this.typeId = this.jsonData[i].typeId
            this.typeName = this.jsonData[i].typeName
            this.typeDesc = this.jsonData[i].typeDesc
          }
        }
      },
      update: function () {
        debugger
        let parms = {id: JSON.parse(this.selectId), typeId: this.typeId, typeName: this.typeName, typeDesc: this.typeDesc}
        this.$http.post('/alarmcenter/back/AlarmType/update', parms
        ).then(
          (response) => {
            if (response.body.code === 200) {
              console.log(response.body.data)
            }
          },
          (response) => {
            console.log('fail' + response.body.message)
          }
        )
      },
      close: function () {
        this.close = false
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../assets/css/global.less";
  @import "../assets/css/variable.less";

  .Add {padding:20px; text-align:left;
    .modalLayer{width:100%; height:100%; background: rgba(0,0,0,.7); z-index: 100; position: fixed; left: 0; right: 0; top: 0;bottom: 0}
    .wrap{width: 800px; height:auto;background-color: #fff;z-index: 200; position: absolute; left: 50%; top:10%;margin-left: -400px;border-radius:5px;}
    .wHead{width: 100%;height: 50px;line-height: 50px; border-bottom: 1px solid #f1f1f1; text-align: center; color:#fff; font-size: 20px; font-weight: bold; background-color: #949494;border-top-left-radius: 5px; border-top-right-radius: 5px;}
    .wContent{
      padding:20px;
      .mess{
        margin:10px 0;
        i{vertical-align: middle; color:red; font-size: 20px;}
        .lal{font-size: 16px; display: inline-block; vertical-align: top }
        .tips{font-size: 14px; color: red; text-align: right; display: inline-block; vertical-align: top}
      }
      .inputText{width:300px; height: 35px; line-height: 35px;margin: 0 15px; padding: 3px 5px;border:1px solid #eee;display: inline-block;box-sizing: border-box}
      .typeDesc{width: 300px; height: 100px; border-radius: 5px;}
    }
  .wButtons{text-align: center;padding:20px 0 50px 0}
  .save,.cancel{width:100px;height: 40px; line-height: 40px; text-align: center; font-size: 18px;display: inline-block;border-radius: 5px; color: #fff; cursor: pointer}
  .save{background-color: #0000ed;margin-right: 10px;}
  .cancel{background-color: #949494; margin-left: 10px;}
  }
</style>
