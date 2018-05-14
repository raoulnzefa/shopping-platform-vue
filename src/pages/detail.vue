<template>
  <div class="detail-wrap clearfix w">
    <div class="detail-wrap__left">
      <div class="detail-wrap__left__top">
        <img :src="imgPath?imgPath:''" alt="">
      </div>
      <ul class="detail-wrap__left__bot">
        <router-link class="detail-wrap__left__bot__item" v-for="product in feature" :key="product.id" :to="{name:product.name}" tag="li" active-class="detail-wrap__left__bot__item_status_active">{{product.title}}</router-link>
      </ul>
    </div>
    <div class="detail-wrap__right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      feature: [],
      imgMap: {
        '/detail/statistics': require('../assets/images/1.png'),
        '/detail/forecast': require('../assets/images/2.png'),
        '/detail/analysis': require('../assets/images/3.png'),
        '/detail/advertising': require('../assets/images/4.png')
      }
    }
  },
  methods: {
    getFeature () {
      axios.get('api/getFeature')
        .then(res => {
          this.feature = res.data.list
        })
    }
  },
  mounted () {
    this.getFeature()
  },
  computed: {
    imgPath () {
      return this.imgMap[this.$route.path]
    }
  }
}
</script>

<style>
.detail-wrap {
  margin-top: 20px;
  margin-bottom: 30px;
}
.detail-wrap__left {
  float: left;
  background: #fff;
  width: 200px;
  padding: 20px 0;
}
.detail-wrap__right {
  float: right;
  width: 980px;
}
.detail-wrap__left__top {
  text-align: center;
  margin-bottom: 22px;
}
.detail-wrap__left__top img {
  width: 100px;
  height: 100px;
}
.detail-wrap__left__bot__item {
  cursor: pointer;
  height: 34px;
  line-height: 34px;
  padding-left: 15px;
  color: #444;
}
.detail-wrap__left__bot__item:hover,
.detail-wrap__left__bot__item_status_active {
  background: #4fc08d;
  color:#fff;
}
/* 四个子页面公共样式 */
.detail-wrap__right__top {
  margin-bottom: 20px;
  background: #fff;
  padding-bottom: 50px;
}
.detail-wrap__right__top__title {
  height: 60px;
  line-height: 60px;
  font-size:16px;
  padding: 0 20px;
}
.detail-wrap__right__top__desc {
  background-color: #f7fcff;
  padding: 10px 20px;
  line-height: 25px;
  margin-bottom: 30px;
  color:#999;
}
.detail-wrap__right__top__form__item {
  height: 47px;
}
.detail-wrap__right__top__form__item__left {
  display:inline-block;
  width: 124px;
  text-indent:20px;
}
.detail-wrap__right__top__form__btn {
  margin-left: 124px;
  width: 96px;
  height: 34px;
  background: #4fc08d;
  color:#fff;
  cursor: pointer;
}
.detail-wrap__right__bot {
  background: #fff;
  padding: 0 20px 15px;
  color: #444;
}
.detail-wrap__right__bot__title {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}
.detail-wrap__right__bot__desc {
  line-height: 22px;
}
</style>
