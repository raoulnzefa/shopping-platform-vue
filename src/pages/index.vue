<template>
  <div class="index-warp">
    <div class="w clearfix">
      <div class="index-warp__right">
        <slider :slidersInfo="slidersInfo"></slider>
        <!-- 特色介绍 -->
        <div class="index__right__bot">
          <div class="index__right__bot__item" v-for="item in feature" :key="item.id">
            <dl>
              <dt>
                <h3>{{item.title}}</h3>
              </dt>
              <dd class="index__right__bot__item__desc">{{item.desc}}</dd>
              <dd class="index__right__bot__item__img"><img :src="getImg(item.id)" alt=""></dd>
            </dl>
            <button class="index__right__bot__item__btn">立即购买</button>
          </div>
        </div>
      </div>
      <div class="index-warp__left">
        <div class="index-warp__left__top">
          <div class="sidebar">
            <h2 class="sidebar__title">全部产品</h2>
            <div class="sidebar__content" v-for="products in productsList" :key="products.id">
              <div class="sidebar__content__title">
                <h3>{{products.title}}</h3>
              </div>
              <ul class="sidebar__content__list">
                <li v-for="product in products.list" :key="product.title">
                  <a href="#">{{product.title}}</a>
                  <span v-if="product.hot" class="hot">HOT</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="index-warp__left__bot">
          <div class="sidebar">
            <div class="sidebar__title">
              最新消息
            </div>
            <div class="sidebar__content">
              <ul class="sidebar__content__list">
                <li v-for="news in newsList" :key="news.title">
                  <a href="#">{{news.title}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '../components/slider'
import axios from 'axios'

export default {
  components: {
    Slider
  },
  data () {
    return {
      slidersInfo: null,
      productsList: null,
      newsList: null,
      feature: null

    }
  },
  mounted () {
    axios
      .get('api/getProductsList')
      .then(res => {
        this.productsList = res.data.productsList
      })
      .catch(err => {
        console.error(err)
      })
    axios
      .get('api/getNewsList')
      .then(res => {
        this.newsList = res.data.newsList
      })
      .catch(err => {
        console.error(err)
      })
    axios
      .get('api/getSlidersInfo')
      .then(res => {
        this.slidersInfo = res.data.slidersInfo
      })
      .catch(err => {
        console.error(err)
      })
    axios
      .get('api/getFeature')
      .then(res => {
        this.feature = res.data.list
      })
      .catch(err => {
        console.error(err)
      })
  },
  methods: {
    getImg (id) {
      return require('../assets/images/' + (id + 1) + '.png')
    }
  }
}
</script>

<style scoped>
.index-warp__right {
  float: right;
  width: 900px;
}

/* 特色介绍 */
.index__right__bot {
  margin-top: 15px;
}
.index__right__bot__item {
  float: left;
  height: 165px;
  width: 440px;
  background-color: #fff;
}
.index__right__bot__item dl {
  padding: 20px 0 0 140px;
  position: relative;
}
.index__right__bot__item dl dt {
  font-size: 18px;
  line-height: 18px;
  height: 18px;
  margin-bottom: 16px;
}
.index__right__bot__item__img {
  position: absolute;
  left: 20px;
  top: 22px;
}
.index__right__bot__item__desc {
  font-size: 12px;
  height: 12px;
  line-height: 12px;
  margin-bottom: 21px;
}
.index__right__bot__item__btn {
  width: 96px;
  height: 34px;
  background-color: #4fc08d;
  color: #fff;
  line-height: 34px;
  margin-left: 140px;
}
.index-warp__left {
  width: 270px;
}
.index-warp__left__top {
  margin-bottom: 14px;
  border: 1px solid #e8e9ea;
}
.sidebar__title {
  padding-left: 15px;
  height: 34px;
  background-color: #4fc08d;
  color: #fff;
  line-height: 34px;
}
.sidebar__content {
  padding: 5px 0 10px 15px;
  border-bottom: 1px solid #ddd;
  background: #fff;
}
.sidebar__content__title {
  height: 44px;
  color: #222;
  line-height: 44px;
}
.sidebar__content__list {
  padding-left: 5px;
  line-height: 24px;
}
.sidebar__content__list li a {
  color: #444;
}
.sidebar__content__list .hot {
  background: #c00;
  color:#fff;
  padding: 0 2px;
  margin-left : 5px;
}
.index-warp__left__bot {
  margin-bottom: 51px;
}
.index-warp__left__bot .sidebar__content {
  padding-top: 29px;
}
.index-warp__left__bot .sidebar__content__list {
  line-height: 26px;
}
</style>
