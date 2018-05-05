<template>
  <div class="login">
    <h2 class="login__title">登录</h2>
    <div class="login__item">
      <span class="login__txt">用户名：</span>
      <input class="login__username" type="text" name="username" placeholder="请输入账号" v-model="username">
      <span class="errTxt">{{usernameError.errTxt}}</span>
    </div>
    <div class="login__item">
      <span class="login__txt">密码：</span>
      <input class="login__psd" type="password" name="psd" placeholder="请输入密码" v-model="psd">
      <span class="errTxt">{{psdError.errTxt}}</span>
    </div>
    <span class="errTxt">{{loginError?loginError.errTxt:''}}</span><br>
    <button class="login__btn" @click="loginAccount">登录</button>
    <span class="loginTipErr">{{loginTip}}</span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MyLogin',
  data () {
    return {
      username: '',
      psd: '',
      loginError: null,
      loginTip: ''
    }
  },
  methods: {
    loginAccount () {
      if (
        this.usernameError.errStatus === true ||
        this.psdError.errStatus === true
      ) {
        this.loginError = {
          errStatus: true,
          errTxt: '请输入正确的账号和密码'
        }
      } else {
        this.loginError = {
          errStatus: false,
          errTxt: ''
        }
        axios
          .post('api/login', { username: this.username, psd: this.psd })
          .then(res => {
            if (res.data.loginInfo.loginStatus) {
              this.$emit('login-success', res.data.loginInfo.username)
              this.$emit('onclose')
            } else {
              this.loginTip = '登录失败，请重新尝试'
            }
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  },
  computed: {
    usernameError () {
      let errStatus = true
      let errTxt = ''
      if (/@/g.test(this.username)) {
        errStatus = false
        errTxt = ''
      } else if (this.username === '') {
        errStatus = true
        errTxt = ''
      } else {
        errStatus = true
        errTxt = '账号中不含@'
      }
      return {
        errStatus,
        errTxt
      }
    },
    psdError () {
      let errStatus = true
      let errTxt = ''
      if (/^\w{1,6}$/.test(this.psd)) {
        errStatus = false
        errTxt = ''
      } else if (this.psd === '') {
        errStatus = true
        errTxt = ''
      } else {
        errStatus = true
        errTxt = '请输入1-6位密码'
      }
      return {
        errStatus,
        errTxt
      }
    }
  }
}
</script>

<style scoped>
.login {
  padding: 20px 30px;
}
.login__item {
  margin-bottom: 20px;
}
.login__title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin: 10px 0;
}
.login__txt {
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
  width: 100px;
}
.login__txt,
.login__username,
.login__psd,
.login__errTxt {
  vertical-align: middle;
}
.login__username,
.login__psd {
  width: 250px;
  height: 30px;
  padding-left: 5px;
  box-shadow: 0 0 1px 0 #ccc;
}
.errTxt {
  color: red;
  margin-left: 10px;
}
.login__btn {
  background: #4fc08d;
  color: #fff;
  padding: 10px 20px;
  margin-left: 100px;
  border-radius: 3px;
  cursor: pointer;
}
.loginTipErr {
  color: red;
  margin-left: 5px;
}
</style>
