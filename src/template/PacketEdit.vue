/**
* Created by myao on 16/12/27.
*/

<template>
  <div class="PacketEdit" v-show="showDialog">
    <div class="wrap">
      <div class="wHead">
        {{title}}
        <i class="closeBtn" @click="close"></i>
      </div>
      <div class="wContent">
        <div class="mess">
          <span class="lal">分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组:<i>*</i></span>&nbsp;&nbsp;
          <input type="text" v-model="groupName" @blur="validat(2,32,groupName,1)" class="inputText">
          <span class="tips">{{tips1}}</span>
        </div>
        <div class="mess">
          <span class="lal">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:<i>*</i></span>
          <input type="text" v-model="des" @blur="validat(2,32,des,2)" class="inputText">
          <span class="tips">{{tips2}}</span>
        </div>
        <div class="mess">
          <span class="lal">报警类型:</span>
          <div class="typeList">
            <label class="types" v-for="type in typeData">
              <input type="checkbox" :id="type.id" v-if="type.checked === '0'" @click="selectTypes(type.id)">
              <input type="checkbox" :id="type.id" v-if="type.checked === '1'" :checked="checked" @click="selectTypes(type.id)" >
              {{type.typeName}}
            </label>
          </div>
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
    name: 'PacketEdit',
    props: ['selectId', 'jsonData', 'opType'],
    data () {
      return {
        groupName: '',
        des: '',
        typeData: [],
        showDialog: true,
        tips1: '',
        tips2: '',
        flag: false,
        title: '',
        url: '',
        parms: {},
        alarrmTypeIds: [],
        bool: true,
        checked: 'checked'
      }
    },
    watch: {
      'selectId' (newValue, oldValue) {
        this.setMess()
        this.getTypeById()
      },
      'opType' (newValue, oldValue) {
        if (newValue === 'edit') {
          this.title = '编辑分组'
        }
        if (newValue === 'add') {
          this.jsonData = ''
          this.title = '添加分组'
          this.getAllTypes()
        }
      }
    },
    mounted () {
      if (this.opType === 'edit') {
        this.title = '编辑分组'
      }
      if (this.opType === 'add') {
        this.title = '添加分组'
      }
    },
    methods: {
      getTypeById: function () {   // 根据分组id显示所有报警消息,默认显示第一条分组的报警信息
        if (this.selectId === '') {
          swal('请选择要编辑的行')
          return
        }
        let that = this
        this.$http.post('/alarmcenter/back/TerminalMobileGroup/selectById', {id: JSON.stringify(this.selectId)}).then(
          (response) => {
            if (response.body.code === 200) {
              that.typeData = response.body.data.alarmTypes
            }
          },
          (response) => {
            swal('fail' + response.body.message)
          }
        )
      },
      getAllTypes: function () {
        let that = this
        this.$http.post('/alarmcenter/back/TerminalMobileGroup/selectAlarmTypeByAll', {}).then(
          (response) => {
            if (response.body.code === 200) {
              that.typeData = response.body.data
              for (let i = 0; i < that.typeData.length; i++) {
                that.typeData[i].checked = '1'
              }
            }
          },
          (response) => {
            swal('fail' + response.body.message)
          }
        )
      },
      selectTypes: function (id) {
        let thisData = this.typeData
        for (let i = 0; i < thisData.length; i++) {
          if (thisData[i].id === id) {
            thisData[i].checked === '1' ? thisData[i].checked = '0' : thisData[i].checked = '1'
          }
        }
      },
      selectType: function (id) {
        for (let i = 0; i < this.typeData.length; i++) {
          if (this.typeData[i].id === id) {
            this.typeData[i].checked = this.typeData[i].checked ? this.typeData[i].checked = false : true
            if (this.typeData[i].checked) {
              this.alarrmTypeIds.push(this.typeData[i].id)
            } else {
              let tempRowId = []
              for (let j = 0; j < this.alarrmTypeIds.length; j++) {
                if (this.alarrmTypeIds[j] !== id) {
                  tempRowId.push(this.alarrmTypeIds[j]) // 把alarrmTypeIds里面除了当前id的数据赋值给tempRowId
                }
              }
              this.alarrmTypeIds = tempRowId
            }
          }
        }
      },
      setMess: function () {
        if (this.selectId === '') {
          this.groupName = ''
          this.des = ''
        }
        for (let i = 0; i < this.jsonData.length; i++) {
          if (this.jsonData[i].id === this.selectId) {
            this.groupName = this.jsonData[i].groupName
            this.des = this.jsonData[i].des
          }
        }
      },
      save: function () {
        let tips = ''
        for (let i = 0; i < this.typeData.length; i++) {
          if (this.typeData[i].checked === '1') {
            this.alarrmTypeIds.push(this.typeData[i].id)
          }
        }
        if (this.opType === 'edit') {
          tips = '修改成功'
          this.url = '/alarmcenter/back/TerminalMobileGroup/updateGroup'
          this.parms = {id: JSON.parse(this.selectId), alarrmTypeIds: this.alarrmTypeIds, groupName: this.groupName, des: this.des}
        }
        if (this.opType === 'add') {
          tips = '添加成功'
          this.url = '/alarmcenter/back/TerminalMobileGroup/insertGroup'
          this.parms = {alarrmTypeIds: this.alarrmTypeIds, groupName: this.groupName, des: this.des}
        }
        if (this.tips1 === '' && this.tips2 === '') {
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
        this.alarrmTypeIds = []
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
        } else {
          if (thisIndex === 1) {
            this.tips1 = '分组名称格式不正确,请输入2-32位分组名称'
          }
          if (thisIndex === 2) {
            this.tips2 = '备注式不正确,请输入2-32位备注'
          }
        }
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../assets/css/global.less";
  @import "../assets/css/variable.less";

  .PacketEdit {padding:20px; text-align:left;
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
  }
  .typeList{width:80%; padding:5px; min-height: 100px;display: inline-block;border:1px solid #eee;border-radius: 5px;
    input[type='checkbox']{width:auto; height: auto}
    .types{margin-right: 20px; margin-bottom: 20px;height: 30px; line-height: 30px;}
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
