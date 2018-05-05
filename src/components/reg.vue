<template>
  <div class="reg">
    <h2 class="reg__title">注册</h2>
    <div class="reg__item">
      <span class="reg__txt">用户名：</span>
      <input class="reg__username" type="text" name="username" v-model="username" placeholder="请输入注册账号">
      <span class="errTxt">{{usernameError.errTxt}}</span>
    </div>
    <div class="reg__item">
      <span class="reg__txt">设置密码：</span>
      <input class="reg__psd" type="password" name="psd" v-model="psd" placeholder="请输入密码">
      <span class="errTxt">{{psdError.errTxt}}</span>
    </div>
    <div class="reg__item">
      <span class="reg__txt">确认密码：</span>
      <input class="reg__psd" type="password" name="repsd" v-model="repsd" placeholder="请再次输入密码">
      <span class="errTxt">{{repsdError1.errTxt}}</span>
      <span class="errTxt">{{repsdError2.errTxt}}</span>
    </div>
    <button class="reg__btn" @click="regAccount">登录</button>
    <span :class="regTipClass">{{regTip}}</span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MyReg',
  data () {
    return {
      username: '',
      psd: '',
      repsd: '',
      regError: null,
      regTipClass: 'regTip',
      regTip: ''
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
    },
    repsdError1 () {
      let errStatus = true
      let errTxt = ''
      if (/^\w{1,6}$/.test(this.repsd)) {
        errStatus = false
        errTxt = ''
      } else if (this.repsd === '') {
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
    },
    repsdError2 () {
      let errStatus = true
      let errTxt = ''
      if (this.psd === '' && this.repsd === '') {
        errStatus = true
        errTxt = ''
      } else if (this.psd !== this.repsd) {
        errStatus = true
        errTxt = '密码不一致'
      } else {
        errStatus = false
        errTxt = ''
      }
      return {
        errStatus,
        errTxt
      }
    }
  },
  methods: {
    regAccount () {
      if (
        this.usernameError.errStatus === true ||
        this.psdError.errStatus === true ||
        this.repsdError1.errStatus === true ||
        this.repsdError2.errStatus === true
      ) {
        this.loginError = {
          errStatus: true,
          errTxt: '请输入正确的账号和密码'
        }
      } else {
        this.regError = {
          errStatus: false,
          errTxt: ''
        }
        axios
          .post('api/reg', { username: this.username, psd: this.psd })
          .then(res => {
            if (res.data.regInfo.regStatus) {
              this.regTipClass = 'regTip'
              this.regTip = '注册成功'
              setTimeout(() => {
                this.$emit('onclose')
              }, 1000)
            } else {
              this.regTipClass = 'regTipErr'
              this.regTip = '注册失败，请重新尝试'
            }
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }
}
</script>

<style scoped>
.reg {
  padding: 20px 30px;
}
.reg__item {
  margin-bottom: 20px;
}
.reg__title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin: 10px 0;
}
.reg__txt {
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
  width: 100px;
}
.reg__txt,
.reg__username,
.reg__psd,
.reg__errTxt {
  vertical-align: middle;
}
.reg__username,
.reg__psd {
  width: 250px;
  height: 30px;
  padding-left: 5px;
  box-shadow: 0 0 1px 0 #ccc;
}
.errTxt {
  color: red;
  margin-left: 10px;
}
.reg__btn {
  background: #4fc08d;
  color: #fff;
  padding: 10px 20px;
  margin-left: 100px;
  border-radius: 3px;
  cursor: pointer;
}
.regTip {
  color: #4fc08d;
  margin-left: 5px;
}
.regTipErr {
  color: red;
  margin-left: 5px;
}
</style>
