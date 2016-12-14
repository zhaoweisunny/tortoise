/**
* Created by myao on 16/11/14.
*/

<template>
  <div class="login">
    <div class="loginContent">
      <img src="../../assets/images/login1.png" alt=""/>
      <div class="loginBox">
        <h1>贵阳公交后台管理系统</h1>
        <div class="inputBox clear">
          <img class="userName pull-left" src="../../assets/images/user.png" width="30" alt=""/>
          <input v-model="userName" type="text" class="inputText pull-right userInput" placeholder="请输入用户名"/>
        </div>
        <div class="inputBox clear">
          <img class="userName pull-left" src="../../assets/images/password.png" width="30" alt=""/>
          <input v-model="password" type="password" @keydown.enter="login" class="inputText pull-right pwdInput" placeholder="请输入密码"/>
        </div>
        <span class="loginBtn" @click="login" >登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5'
  export default {
    name: 'login',
    data () {
      return {
        userName: 'admin',
        password: ''
      }
    },
    methods: {
      login: function () {
        let that = this
        if (that.userName === '' || that.password === '') {
          console.log('用户名或密码不能为空')
          return
        }
        this.$http.post('/alarmcenter/back/user/login', {
          userName: that.userName, password: md5(that.password)
        }).then(
          (response) => {
            if (response.body.code === 200) {
              that.$router.push({name: 'welcome'})
            }
          },
          (response) => {
            console.log('fail' + response)
          }
        )
      }
    }
//    mounted () {
//      let that = this
//      this.$http({
//        url: 'login',
//        method: 'post',
//        data: {
//          name: that.name,
//          pwd: that.pwd
//        }
//      }).then(
//      (response) => {
//        that.$set('json', response)
//        console.log(response)
//      },
//      (response) => {
//        console.log('fail' + response)
//      }
//    )
//    }
  }

//    mounted () {

//      this.$http.jsonp({
//        url: '',
//        method: 'POST',
//        enulateJSON: true,
//        data: {
//          name: this.name,
//          pwd: this.pwd
//        }
//      }).then(function (response) {
//        console.log(response.data)
//      }, function (response) {
//      })
//    }

</script>


<style lang="less" rel="stylesheet/less" type="text/css">
  @import "../../assets/css/global.less";
  @import "../../assets/css/variable.less";

  .login {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: table;
    text-align: center;
    .loginContent {
      display: table-cell;
      vertical-align: middle;
    }
    .loginBox {
      width: 500px;
      padding: 15px;
      margin: 50px auto 0 auto;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    h1 {
      font-size: 28px;
      color: #313131;
      text-align: center;
      margin-bottom: 40px;
      margin-top: 20px;
    }
    .inputBox {
      width: 430px;
      padding: 8px;
      margin: 0 auto 40px auto;
      border: 1px solid #ddd;
      border-radius: 5px;
      img {
        vertical-align: middle;
        margin-top: 3px;
      }
      .inputText {
        width: 370px;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding: 5px;
        borer: none !important;
        font-size: 16px;
      }
    }
    .loginBtn {
      display: block;
      width: 430px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background-color: #0070bc;
      font-size: 18px;
      color: #fff;
      margin: 0 auto 20px auto;
      border-radius: 5px;
      cursor: pointer
    }
  }
</style>
