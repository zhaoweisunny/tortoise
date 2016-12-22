/**
* Created by myao on 16/12/22.
*/

<template>
  <div class="PhoneEdit" v-show="showDialog">
    <div class="wrap">
      <div class="wHead">{{title}}</div>
      <div class="wContent">
        <div class="mess">
          <span class="lal">用&nbsp;&nbsp;户&nbsp;&nbsp;名:<i>*</i></span>
          <input type="text" v-model="userName" @blur="validat(6,32,userName,1)" class="inputText">
          <span class="tips">{{tips1}}</span>
        </div>
        <div class="mess">
          <span class="lal">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:<i>*</i></span>
          <input type="text" v-model="password" @blur="validat(5,32,password,2)" class="inputText">
          <span class="tips">{{tips2}}</span>
        </div>
        <div class="mess">
          <span class="lal">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:<i>*</i></span>
          <input type="text" v-model="nickName" @blur="validat(1,32,nickName,3)" class="inputText">
          <span class="tips">{{tips3}}</span>
        </div>
        <div class="mess">
          <span class="lal">手机号码&nbsp;:<i>*</i></span>
          <input type="text" v-model="callPhone" @blur="validatPhone(/^[1][3,4,5,7,8][0-9]{9}$/,callPhone,4)" class="inputText">
          <span class="tips">{{tips4}}</span>
        </div>
        <div class="mess">
          <span class="lal">所属分组:&nbsp;&nbsp;&nbsp;</span>
          <textarea disabled="disabled" class="packet inputText" v-model="groups"></textarea>
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
    name: 'PhoneEdit',
    props: ['selectId', 'jsonData', 'opType'],
    data () {
      return {
        userName: '',
        nickName: '',
        password: '',
        callPhone: '',
        groups: '',
        showDialog: true,
        tips1: '',
        tips2: '',
        tips3: '',
        tips4: '',
        flag: false,
        title: '',
        url: '',
        parms: {}
      }
    },
    watch: {
      'selectId' (newValue, oldValue) {
        console.log(newValue)
        this.setMess()
      },
      'opType' (newValue, oldValue) {
        if (newValue === 'edit') {
          this.title = '编辑手机端管理'
        }
        if (newValue === 'add') {
          this.jsonData = ''
          this.title = '添加手机端管理'
        }
      }
    },
    mounted () {
      if (this.opType === 'edit') {
        this.title = '编辑手机端管理'
      }
      if (this.opType === 'add') {
        this.title = '添加手机端管理'
      }
    },
    methods: {
      setMess: function () {
        if (this.selectId === '') {
          this.userName = ''
          this.nickName = ''
          this.password = ''
          this.callPhone = ''
          this.groups = ''
        }
        for (let i = 0; i < this.jsonData.length; i++) {
          if (this.jsonData[i].id === this.selectId) {
            console.log(this.jsonData[i].userName)
            this.userName = this.jsonData[i].userName
            this.nickName = this.jsonData[i].nickName
            this.callPhone = this.jsonData[i].callPhone
            this.groups = this.jsonData[i].groups
          }
        }
      },
      save: function () {
        if (this.opType === 'edit') {
          this.parms = {id: JSON.parse(this.selectId), userName: this.userName, password: this.password, nickName: this.nickName, callPhone: this.callPhone}
        }
        if (this.opType === 'add') {
          this.parms = {userName: this.userName, password: this.password, nickName: this.nickName, callPhone: this.callPhone}
        }
        this.url = '/alarmcenter/back/mobileUser/saveUser'
        if (this.tips1 === '' && this.tips2 === '' && this.tips3 === '' && this.tips4 === '') {
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
        this.userName = ''
        this.nickName = ''
        this.password = ''
        this.callPhone = ''
        this.groups = ''
        this.tips1 = ''
        this.tips2 = ''
        this.tips3 = ''
        this.tips4 = ''
      },
      close: function () {
        if (this.opType === 'add') {
          this.setNull()
        }
        this.showDialog = false
        this.flag = true
        this.$emit('update-data', this.flag)
      },
      validat: function (min, max, obj, thisIndex) {
        if (obj.length >= parseInt(min) && obj.length <= parseInt(max)) {
          if (thisIndex === 1) {
            this.tips1 = ''
          }
          if (thisIndex === 2) {
            this.tips2 = ''
          }
          if (thisIndex === 3) {
            this.tips3 = ''
          }
        } else if (obj.length === 0 || obj.length < parseInt(min) || obj.length > parseInt(max)) {
          if (thisIndex === 1) {
            this.tips1 = '用户名格式不正确，请输入6-32位的用户名'
          }
          if (thisIndex === 2) {
            if (this.opType === 'edit' && this.password === '') {
              this.tips2 = ''
            }
            if (this.opType === 'edit' && this.password !== '') {
              this.tips2 = '密码格式不正确，请输入5-32位的密码！'
            }
            if (this.opType === 'add') {
              this.tips2 = '密码格式不正确，请输入5-32位的密码！'
            }
          }
          if (thisIndex === 3) {
            this.tips3 = '昵称格式不正确，请输入1-32位的昵称！'
          }
//          if (thisIndex === 4) {
//            this.tips4 = '手机号格码式不正确，请输入正确的手机号码!'
//          }
        }
      },
      validatPhone: function (reg, obj, thisIndex) {
//        if (obj === this.typeId) {
//          let result = reg.test(this.typeId)
//          if (!result) {
//            this.tips1 = '告警类型编码格式不正确,请输入1-5位数字'
//          } else {
//            this.tips1 = ''
//          }
//        }
        if (obj === '') {
          this.tips4 = '手机号格码式不正确，请输入正确的手机号码!'
        }
        if (thisIndex === 4 && obj === this.callPhone) {
          let result = reg.test(obj)
          if (!result) {
            this.tips4 = '手机号格码式不正确，请输入正确的手机号码!'
          } else {
            this.tips4 = ''
          }
        }
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../assets/css/global.less";
  @import "../assets/css/variable.less";

  .PhoneEdit {padding:20px; text-align:left;
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
    .packet{width: 300px; height: 100px; border-radius: 5px;}
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
