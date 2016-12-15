/**
* Created by myao on 16/12/14.
*/

<template>
<div class="TypeEdit" v-show="showDialog">
  <div class="wrap">
    <div class="wHead">编辑告警类型</div>
    <div class="wContent">
      <div class="mess">
        <span class="lal">类型代码:<i>*</i></span>
        <input type="text" v-model="typeId" name=1 @blur="validat(1,5,$event,/^\d{1,5}$/)" class="inputText">
        <span class="tips">{{tips1}}</span>
      </div>
      <div class="mess">
        <span class="lal">类型名称:<i>*</i></span>
        <input type="text" v-model="typeName" name=2 @blur="validat(2,100,$event)" class="inputText">
        <span class="tips">{{tips2}}</span>
      </div>
      <div class="mess">
        <span class="lal">描述信息:<i>*</i></span>
        <textarea type="text" v-model="typeDesc" name=3 @blur="validat(2,300,$event)" class="typeDesc inputText"></textarea>
        <span class="tips">{{tips3}}</span>
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
    name: 'TypeEdit',
    props: ['selectId', 'jsonData'],
    data () {
      return {
        msg: 'hello',
        show1: false,
        typeId: '',
        typeName: '',
        typeDesc: '',
        showDialog: true,
        tips1: '',
        tips2: '',
        tips3: '',
        flag: false
//        items: [
//          {thisIndex: 1, tips1: ''},
//          {thisIndex: 2, tips1: ''},
//          {thisIndex: 3, tips1: ''}
//        ]
      }
    },
    watch: {
      'selectId' (newValue, oldValue) {
        this.setMess()
      },
      'jsonData' (newValue, oldValue) {
        this.setMess()
      }
    },
    mounted () {
      this.setMess()
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
        if (this.tips1 === '' && this.tips2 === '' && this.tips3 === '') {
          let that = this
          let parms = {id: JSON.parse(this.selectId), typeId: this.typeId, typeName: this.typeName, typeDesc: this.typeDesc}
          this.$http.post('/alarmcenter/back/AlarmType/update', parms
          ).then(
            (response) => {
              if (response.body.code === 200) {
                that.showDialog = false
                that.flag = true
                that.$emit('update-data', that.flag)
              }
            },
            (response) => {
              console.log('fail' + response.body.message)
            }
          )
        } else {
          return
        }
      },
      close: function () {
        this.showDialog = false
        this.flag = true
        this.$emit('update-data', this.flag)
      },
      validat: function (min, max, event, reg) {
        let currValue = event.currentTarget.value
        let currName = event.currentTarget.name
        if (reg) {
          let result = reg.test(currValue)
          if (!result) {
            this.tips1 = '告警类型编码格式不正确,请输入1-5位数字'
          } else {
            this.tips1 = ''
          }
        }
        if (currValue.length >= parseInt(min) && currValue.length <= parseInt(max)) {
          if (currName === '1') {
            this.tips1 = ''
          }
          if (currName === '2') {
            this.tips2 = ''
          }
          if (currName === '3') {
            this.tips3 = ''
          }
//          event.currentTarget.nextSibling.nextSibling.style.display = 'none'
        } else {
          if (currName === '1') {
            this.tips1 = '告警类型编码格式不正确,请输入1-5位数字'
          }
          if (currName === '2') {
            this.tips2 = '告警类型名称格式不正确,请输入2-100位'
          }
          if (currName === '3') {
            this.tips3 = '告警描述格式不正确,请输入2-300个字符'
          }
//          event.currentTarget.nextSibling.nextSibling.style.display = 'inline-block'
        }
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../assets/css/global.less";
  @import "../assets/css/variable.less";

  .TypeEdit {padding:20px; text-align:left;
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
