<template>
  <div id="app">
    <header class="app-header">
      <div class="w">
        <div class="app-header__left">
          <router-link :to="{path:'/'}">
            <img src="./assets/logo.png" alt="vue-logo">
          </router-link>
        </div>
        <div class="app-header__right">
          <span v-if="islogin">{{username}}</span>
          <span v-if="islogin">|</span>
          <a href="#" @click.prevent="exitLogin" v-if="islogin">退出登录</a>
          <a href="#" @click.prevent="showLogin" v-if="!islogin">登录</a>
          <span v-if="!islogin">|</span>
          <a href="#" @click.prevent="showReg" v-if="!islogin">注册</a>
          <span>|</span>
          <a href="#" @click.prevent="showAbout">关于</a>
        </div>
      </div>
    </header>
    <div class="app-main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <footer class="app-footer">
      &copy; 2016 fishenal MIT
    </footer>
    <my-dialog v-if="isDialog" @onclose="closeDialog">
      <div :is="dialogCon" @login-success="loginSuccess" @onclose="closeDialog"></div>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from './components/dialog'
import MyLogin from './components/login'
import MyReg from './components/reg'
import MyAbout from './components/about'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    MyDialog,
    MyLogin,
    MyReg,
    MyAbout
  },
  data () {
    return {
      dialogCon: '',
      isDialog: false,
      islogin: false,
      username: ''
    }
  },
  methods: {
    showDialog () {
      this.isDialog = true
    },
    hideDialog () {
      this.isDialog = false
    },
    showLogin () {
      this.showDialog()
      this.dialogCon = 'MyLogin'
    },
    showReg () {
      this.showDialog()
      this.dialogCon = 'MyReg'
    },
    showAbout () {
      this.showDialog()
      this.dialogCon = 'MyAbout'
    },
    closeDialog () {
      this.hideDialog()
    },
    loginSuccess (username) {
      this.username = username
      this.islogin = true
    },
    exitLogin () {
      axios
        .get('api/exit-login')
        .then(res => {
          this.islogin = res.data.loginInfo.loginStatus
          this.username = ''
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style>
/*css 初始化 */
html,
body,
ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img {
  margin: 0;
  padding: 0;
}

fieldset,
img,
input,
button,
select {
  /*fieldset组合表单中的相关元素*/
  border: none;
  padding: 0;
  margin: 0;
  outline-style: none;
}

ul,
ol {
  list-style: none; /*清除列表风格*/
}

input {
  padding-top: 0;
  padding-bottom: 0;
  font-family: 'SimSun', '宋体';
  position: relative;
}

select,
input {
  vertical-align: middle;
}

select,
input,
textarea {
  font-size: 12px;
  margin: 0;
}
/*防止多行文本框拖动*/
textarea {
  resize: none;
}

img {
  border: 0;
  vertical-align: middle;
}

/*  去掉图片低测默认的3像素空白缝隙*/
table {
  border-collapse: collapse; /*合并外边线*/
  border-spacing: 0;
}

body {
  font: 12px/150% Arial, Verdana, '\5b8b\4f53'; /*宋体，Unicode，统一码*/
  color: #666;
  background: #fff;
}

/*初始化中原有的清除浮动*/
.clearfix:before,
.clearfix:after {
  content: '';
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1; /*IE/7/6*/
}

a {
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-decoration: none;
  font-weight: normal;
  font-size: 100%;
}

s,
i,
em {
  font-style: normal;
  text-decoration: none;
}
/* 版心 */
.w {
  width: 1179px;
  margin: 0 auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  font-size: 12px;
}
/* app-header模块 */
.app-header {
  width: 100%;
  background-color: #363636;
  height: 90px;
  margin-bottom: 15px;
}
.app-header__left {
  float: left;
}
.app-header__left a {
  display: block;
  height: 50px;
  margin-top: 20px;
}
.app-header__left a img {
  height: 100%;
}
.app-header__right {
  float: right;
}

.app-header__right a,
.app-header__right span {
  padding-left: 10px;
  color: #b2b2b2;
  line-height: 90px;
}
.app-header__right a:hover {
  color: #eee;
}

/* body 背景 */
body {
  background-color: #f0f2f5;
}
/* app-footer模块 */
.app-footer {
  width: 100%;
  background-color: #e3e4e8;
  height: 80px;
  text-align: center;
  line-height: 80px;
}
</style>
