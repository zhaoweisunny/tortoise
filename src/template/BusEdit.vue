/**
* Created by myao on 16/12/19.
*/

<template>
  <div class="BusEdit" v-show="showDialog">
    <div class="wrap">
      <div class="wHead">{{title}}</div>
      <div class="wContent">
        <div class="mess">
          <span class="lal">登&nbsp;&nbsp;录&nbsp;&nbsp;名:<i>*</i></span>
          <input type="text" v-model="userName" @blur="validat(6,32,userName,1)" class="inputText">
          <span class="tips">{{tips1}}</span>
        </div>
        <div class="mess">
          <span class="lal">登录密码:<i>*</i></span>
          <input type="password" v-model="password" @blur="validat(6,32,password,2)" class="inputText">
          <span class="tips">{{tips2}}</span>
        </div>
        <div class="mess">
          <span class="lal">车&nbsp;&nbsp;牌&nbsp;&nbsp;号:<i>*</i></span>
          <input type="text" v-model="plateNumber" @blur="validat(6,12,plateNumber,3)" class="inputText">
          <span class="tips">{{tips3}}</span>
        </div>
        <div class="mess">
          <span class="lal">公交路数:<i>*</i></span>
          <input type="text" v-model="busRoute" @blur="validat(1,6,busRoute,4)" class="inputText">
          <span class="tips">{{tips4}}</span>
        </div>
        <div class="mess">
          <span class="lal">选择地址:<i>*</i></span>
          <span class="threeA">
            <select-address :province="province" :city="city" :county="county" v-on:p-data="getP" v-on:ci-data="getCi" v-on:co-data="getCo"></select-address>
          </span>
          <span class="tips">{{tips5}}</span>
        </div>
        <div class="mess">
          <span class="lal">司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:<i>*</i></span>
          <textarea v-model="driverName" @blur="validat(1,6,busRoute,6)" class="driverName inputText"></textarea>
          <span class="tips">{{tips6}}</span>
        </div>
        <div class="mess">
          <span class="lal">所属分组:&nbsp;&nbsp;</span>
          <textarea disabled="disabled" class="packet inputText" v-model="terminalMobileGroups"></textarea>
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
  import SelectAddress from '../components/user/SelectAddress'
  import md5 from 'md5'
  export default {
    name: 'BusEdit',
    props: ['selectId', 'jsonData', 'opType'],
    data () {
      return {
        userName: '',
        password: '',
        plateNumber: '',
        busRoute: '',
        province: '',
        city: '',
        county: '',
        driverName: '',
        terminalMobileGroups: '',
        showDialog: true,
        tips1: '',
        tips2: '',
        tips3: '',
        tips4: '',
        tips5: '',
        tips6: '',
        flag: false,
        title: '',
        url: '',
        parms: {}
      }
    },
    components: {SelectAddress},
    watch: {
      'selectId' (newValue, oldValue) {
        this.setMess()
      },
      'opType' (newValue, oldValue) {
        if (newValue === 'edit') {
          this.title = '编辑公交端管理'
        }
        if (newValue === 'add') {
          this.jsonData = ''
          this.title = '添加公交端管理'
        }
      }
    },
    mounted () {
      if (this.opType === 'edit') {
        this.title = '编辑公交端管理'
      }
      if (this.opType === 'add') {
        this.title = '添加公交端管理'
      }
    },
    methods: {
      setMess: function () {
        if (this.selectId === '') {
          this.userName = ''
          this.password = ''
          this.plateNumber = ''
          this.busRoute = ''
          this.province = ''
          this.city = ''
          this.county = ''
          this.driverName = ''
          this.terminalMobileGroups = ''
        } else {
          for (let i = 0; i < this.jsonData.length; i++) {
            if (this.jsonData[i].id === this.selectId) {
              this.userName = this.jsonData[i].userName
              this.plateNumber = this.jsonData[i].plateNumber
              this.busRoute = this.jsonData[i].busRoute
              this.province = this.jsonData[i].province
              this.city = this.jsonData[i].city
              this.county = this.jsonData[i].county
              this.driverName = this.jsonData[i].driverName
              for (let j = 0; j < this.jsonData[i].terminalMobileGroups.length; j++) {
                this.terminalMobileGroups += '[' + this.jsonData[i].terminalMobileGroups[j].des + ']'
              }
            }
          }
        }
        this.$set(this, 'province', this.province)
        this.$set(this, 'city', this.city)
        this.$set(this, 'county', this.county)
      },
      save: function () {
        let tips = ''
        if (this.opType === 'edit') {
          tips = '修改成功'
          this.url = '/alarmcenter/back/TerminalUser/update'
          this.parms = {id: JSON.parse(this.selectId), userName: this.userName, password: '', plateNumber: this.plateNumber, busRoute: this.busRoute, province: this.province, city: this.city, county: this.county, driverName: this.driverName}
        }
        if (this.opType === 'add') {
          tips = '添加成功'
          if (this.province === '' || this.city === '' || this.county === '') {
            this.tips5 = '请将地址填写完整'
          }
          if (this.province !== '' && this.city !== '' && this.county !== '') {
            this.tips5 = ''
          }
          this.url = '/alarmcenter/back/TerminalUser/insert'
          this.parms = {userName: this.userName, password: md5(this.password), plateNumber: this.plateNumber, busRoute: this.busRoute, province: this.province, city: this.city, county: this.county, driverName: this.driverName}
        }
        if (this.tips1 === '' && this.tips2 === '' && this.tips3 === '' && this.tips4 === '' && this.tips5 === '' && this.tips6 === '') {
          let that = this
          this.$http.post(this.url, this.parms
          ).then(
            (response) => {
              if (response.body.code === 200) {
                if (this.opType === 'add') {
                  this.setNull()
                }
                if (this.opType === 'edit') {
                  this.password = ''
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
        this.userName = ''
        this.password = ''
        this.plateNumber = ''
        this.busRoute = ''
        this.province = ''
        this.city = ''
        this.county = ''
        this.driverName = ''
      },
      close: function () {
        if (this.opType === 'add') {
          this.setNull()
        }
        this.tips1 = ''
        this.tips2 = ''
        this.tips3 = ''
        this.tips4 = ''
        this.tips6 = ''
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
          if (thisIndex === 4) {
            this.tips4 = ''
          }
          if (thisIndex === 6) {
            this.tips6 = ''
          }
        } else if (obj.length === 0 || obj.length < parseInt(min) || obj.length > parseInt(max)) {
          if (thisIndex === 1) {
            this.tips1 = '登录名格式不正确，请输入6-32长度的登录名'
          }
          if (thisIndex === 2) {
            if (this.opType === 'edit' && this.password === '') {
              this.tips2 = ''
            }
            if (this.opType === 'edit' && this.password !== '') {
              this.tips2 = '登录密码格式不正确，请输入6-32长度的登录密码'
            }
            if (this.opType === 'add') {
              this.tips2 = '登录密码格式不正确，请输入6-32长度的登录密码'
            }
          }
          if (thisIndex === 3) {
            this.tips3 = '车牌号格式不正确，请输入6-12长度的车牌号'
          }
          if (thisIndex === 4) {
            this.tips4 = '公交路数格式不正确，请输入1-6长度的公交路数'
          }
          if (thisIndex === 6) {
            this.tips6 = '司机名称格式不正确，请输入1-6长度的司机名称'
          }
        }
      },
      getP: function (p) {
        if (p === '') {
          this.tips5 = '请将地址填写完整'
        }
        this.province = p
      },
      getCi: function (ci) {
        if (ci === '') {
          this.tips5 = '请将地址填写完整'
        }
        this.city = ci
      },
      getCo: function (co) {
        if (co === '') {
          this.tips5 = '请将地址填写完整'
        }
        this.county = co
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../assets/css/global.less";
  @import "../assets/css/variable.less";

  .BusEdit{padding:20px; text-align:left;
    .modalLayer{width:100%; height:100%; background: rgba(0,0,0,.7); z-index: 100; position: fixed; left: 0; right: 0; top: 0;bottom: 0}
    .wrap{width: 800px; height:auto;background-color: #fff;z-index: 200; position: absolute; left: 50%; top:0;margin-left: -400px;border-radius:5px;}
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
      .driverName,.packet{width: 300px; height: 100px; border-radius: 5px;}
      .threeA{display: inline-block; margin-left: 20px;}
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
