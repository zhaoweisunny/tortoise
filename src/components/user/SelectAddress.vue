/**
* Created by myao on 16/12/19.
*/

<template>
  <div class="SelectAddress">
    <select class="province" v-model="provinceId" @change="selectC">
      <option v-for="p in proData" :value="p.pk" >{{p.pv}}</option>
    </select>
    <select class="city" v-model="cityId" @change="selectCi">
      <option v-for="c in cityList" :value="c.ck" >{{c.cv}}</option>
    </select>
    <select class="county" v-model="countryValue" @change="selectCo">
      <option v-for="co in countryList" :value="co.cyv">{{co.cyv}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'SelectAddress',
    props: ['province', 'city', 'county'],
    data () {
      return {
        msg: 'hello',
        proData: [],
        cityData: [],
        countryData: [],
        provinceId: '',  // 选择的省id
        cityId: '',      // 选择的市id
        countryValue: '',   // 选择的县id
        cityList: [],    // 对应的市数据
        countryList: [], // 对应的县数据
        p: '',  // 传给父组件当前选中的省数据
        ci: '',  // 传给父组件当前选中的是数据
        co: '' // 传给父组件当前选中的县数据
      }
    },
    watch: {
      'province' (newValue, oldValue) {
        this.getP()
      },
      'city' (newValue, oldValue) {
        this.selectC()
        this.getNewci()
      },
      'county' (newValue, oldValue) {
        this.selectCi()
        this.getNewco()
      }
    },
    mounted () {
      this.$http.get('../../../static/address.json').then(
        (response) => {
          this.proData = response.body.proData
          this.cityData = response.body.cityData
          this.countryData = response.body.countryData
        },
        (response) => {
          console.log('fail')
        }
      )
    },
    methods: {
      getP: function () { // 获取对应的市新数据
        for (let i = 0; i < this.proData.length; i++) {
          if (this.province === this.proData[i].pv) {
            this.provinceId = this.proData[i].pk
          }
        }
//        console.log('父组件传来的当前省id:' + this.provinceId + this.province)
//        this.selectC()   // 获取对应的市新数据
//        this.selectCi() // 获取对应的县新数据
//        this.getNewp()  //  把传过来的省与省数组里面的数据做对比,如果相等,就把当前省的id换做此省的id
//        this.getNewci() //  把传过来的市与市数组里面的数据做对比,如果相等,就把当前市的id换做此市的id
//        this.getNewco() //  把传过来的县与县数组里面的数据做对比,如果相等,就把当前县的value换做此县的value
      },
      selectC: function () {
        this.cityList = []
        let pId = this.provinceId
        for (let i = 0; i < this.cityData.length; i++) {
          if (this.cityData[i].pk === pId) {
            this.cityList.push(this.cityData[i])
          }
        }
        for (let j = 0; j < this.proData.length; j++) {
          if (pId === this.proData[j].pk) {
            this.p = this.proData[j].pv
          }
        }
        this.$emit('p-data', this.p)
        // 当前选择的省数据,需要传给父组件
      },
      selectCi: function () {
        this.countryList = []
        let cId = this.cityId
        for (let i = 0; i < this.countryData.length; i++) {
          if (this.countryData[i].ck === cId) {
            this.countryList.push(this.countryData[i])
          }
        }
        for (let j = 0; j < this.cityList.length; j++) {
          if (cId === this.cityList[j].ck) {
            this.ci = this.cityList[j].cv
          }
        }
        this.$emit('ci-data', this.ci)
      },
      selectCo: function () {
        this.co = this.countryValue
        this.$emit('co-data', this.co)
      },
      getNewp: function () {
        for (let i = 0; i < this.proData.length; i++) {
          if (this.proData[i].pv === this.province) {
            this.provinceId = this.proData[i].pk
          }
        }
//        console.log('父组件传来的当前省id:' + this.provinceId + this.province)
      },
      getNewci: function () {
        for (let i = 0; i < this.cityList.length; i++) {
          if (this.cityList[i].cv === this.city) {
            this.cityId = this.cityList[i].ck
          }
        }
//        console.log('父组件传来的当前市id:' + this.cityId + this.city)
      },
      getNewco: function () {
        for (let i = 0; i < this.countryList.length; i++) {
          if (this.countryList[i].cyv === this.county) {
            this.countryValue = this.countryList[i].cyv
          }
        }
//        console.log('父组件传来的当前县为:' + this.countryValue)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .SelectAddress {
  }
</style>
