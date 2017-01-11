/**
* Created by myao on 16/12/14.
*/

<template>
<div class="TypeEdit" v-show="showDialog">
  <div class="wrap">
    <div class="wHead">
      {{title}}
      <i class="closeBtn" @click="close"></i>
    </div>
    <div class="wContent">
      <div class="mess">
        <span class="lal">类型代码:<i>*</i></span>
        <input type="text" v-model="typeId" @blur="validateNum(1,5,typeId,/^\d{1,5}$/,1)" class="inputText">
        <span class="tips">{{tips1}}</span>
      </div>
      <div class="mess">
        <span class="lal">类型名称:<i>*</i></span>
        <input type="text" v-model="typeName" @blur="validat(2,100,typeName,2)" class="inputText">
        <span class="tips">{{tips2}}</span>
      </div>
      <div class="mess">
        <span class="lal">描述信息:<i>*</i></span>
        <textarea type="text" v-model="typeDesc" @blur="validat(2,300,typeDesc,3)" class="typeDesc inputText"></textarea>
        <span class="tips">{{tips3}}</span>
      </div>
    </div>
    <div class="wButtons">
      <span class="save" @click="save">保存</span>
      <span class="cancel" @click="close">取消</span>
    </div>
  </div>
  <div class="modalLayer"></div>
</div>
</template>
<script>
  import { default as swal } from 'sweetalert2'
  export default {
    name: 'TypeEdit',
    props: ['selectId', 'jsonData', 'opType'],
    data () {
      return {
        typeId: '',
        typeName: '',
        typeDesc: '',
        showDialog: true,
        tips1: '',
        tips2: '',
        tips3: '',
        flag: false,
        title: '',
        url: '',
        parms: {}
      }
    },
    watch: {
      'selectId' (newValue, oldValue) {
        this.setMess()
      },
      'opType' (newValue, oldValue) {
        if (newValue === 'edit') {
          this.title = '编辑告警类型'
        }
        if (newValue === 'add') {
          this.jsonData = ''
          this.title = '添加告警类型'
        }
      }
    },
    mounted () {
      if (this.opType === 'edit') {
        this.title = '编辑告警类型'
      }
      if (this.opType === 'add') {
        this.title = '添加告警类型'
      }
    },
    methods: {
      setMess: function () {
        if (this.selectId === '') {
          this.typeId = ''
          this.typeName = ''
          this.typeDesc = ''
        }
        for (let i = 0; i < this.jsonData.length; i++) {
          if (this.jsonData[i].id === this.selectId) {
            this.typeId = this.jsonData[i].typeId
            this.typeName = this.jsonData[i].typeName
            this.typeDesc = this.jsonData[i].typeDesc
          }
        }
      },
      save: function () {
        let tips = ''
        if (this.opType === 'edit') {
          tips = '修改成功'
          this.url = '/alarmcenter/back/AlarmType/update'
          this.parms = {id: JSON.parse(this.selectId), typeId: this.typeId, typeName: this.typeName, typeDesc: this.typeDesc}
        }
        if (this.opType === 'add') {
          tips = '添加成功'
          this.url = '/alarmcenter/back/AlarmType/insert'
          this.parms = {typeId: this.typeId, typeName: this.typeName, typeDesc: this.typeDesc}
        }
        if (this.tips1 === '' && this.tips2 === '' && this.tips3 === '') {
          let that = this
          this.$http.post(this.url, this.parms
          ).then(
            (response) => {
              if (response.body.code === 200) {
                if (this.opType === 'add') {
                  this.setNull()
                }
                that.showDialog = false
                that.flag = true
                that.$emit('update-data', that.flag)
                swal(tips)
              } else {
                swal(response.body.message)
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
      setNull: function () {
        this.typeId = ''
        this.typeName = ''
        this.typeDesc = ''
      },
      close: function () {
        if (this.opType === 'add') {
          this.setNull()
        }
        this.showDialog = false
        this.flag = true
        this.$emit('update-data', this.flag)
        this.tips1 = ''
        this.tips2 = ''
        this.tips3 = ''
      },
      validat: function (min, max, obj, thisIndex) {
        if (obj.length >= parseInt(min) && obj.length <= parseInt(max)) {
          if (thisIndex === 2) {
            this.tips2 = ''
          }
          if (thisIndex === 3) {
            this.tips3 = ''
          }
        } else if (obj.length === 0 || obj.length < parseInt(min) || obj.length > parseInt(max)) {
          if (thisIndex === 2) {
            this.tips2 = '告警类型名称格式不正确,请输入2-100位'
          }
          if (thisIndex === 3) {
            this.tips3 = '告警描述格式不正确,请输入2-300个字符'
          }
        }
      },
      validateNum: function (min, max, obj, reg, thisIndex) {
        if (reg && thisIndex === 1) {
          if (obj === '' || obj === null) {
            this.tips1 = '告警类型编码格式不正确,请输入1-5位数字'
          }
          let result = reg.test(obj)
          if (!result) {
            this.tips1 = '告警类型编码格式不正确,请输入1-5位数字'
          } else {
            this.tips1 = ''
          }
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
    .wHead{width: 100%;height: 50px;line-height: 50px; border-bottom: 1px solid #f1f1f1; text-align: center; color:#fff; font-size: 20px; font-weight: bold;
      background-color: #949494;border-top-left-radius: 5px; border-top-right-radius: 5px; position: relative;
      .closeBtn{display: block; position: absolute; right:-10px; top:-16px; width:32px; height: 32px;background: url("../assets/images/close2.png") no-repeat center; background-size: 100% ; z-index: 200; cursor: pointer}
    }
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
<style rel="stylesheet" lang="css">
  @import "../assets/css/sweetalert2.css";
</style>
