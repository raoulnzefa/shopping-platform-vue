<template>
  <div class="slider-wrap" v-if="slidersInfo" @mouseenter="shopPaly" @mouseleave="autoPaly">
    <div class="slider">
      <transition name="slide">
        <img v-if="isShow" :src="slidersInfo[currentIndex].imgUrl" alt="">
      </transition>
      <transition name="slide-old">
        <img v-if="!isShow" :src="slidersInfo[currentIndex].imgUrl" alt="">
      </transition>
    </div>
    <!-- 遮罩 -->

    <div class="shade">
      <div class="shade-left">
        {{slidersInfo[currentIndex].title}}
      </div>
      <div class="shade-right">
        <a href="#" @click.prevent="gotoIndex(preIndex)">&lt;</a>
        <a href="#" v-for="(sliderInfo,index) in slidersInfo" :key="sliderInfo.id" @click.prevent="gotoIndex(index)" :class="{active:index===currentIndex}">{{ index +1}}</a>
        <a href="#" @click.prevent="gotoIndex(nextIndex)">&gt;</a>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: ['slidersInfo'],
  data () {
    return {
      currentIndex: 0,
      isShow: true,
      timer: null,
      inv: 2000 // 自动播放间隔
    }
  },
  methods: {
    gotoIndex (index) {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
        this.currentIndex = index
      }, 10)
    },
    autoPaly () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.gotoIndex(this.nextIndex)
      }, this.inv)
    },
    shopPaly () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  },
  computed: {
    preIndex () {
      return this.currentIndex - 1 >= 0
        ? this.currentIndex - 1
        : this.slidersInfo.length - 1
    },
    nextIndex () {
      return this.currentIndex + 1 <= this.slidersInfo.length - 1
        ? this.currentIndex + 1
        : 0
    }
  },
  mounted () {
    this.autoPaly()
  }
}
</script>

<style scoped>
.slider-wrap {
  position: relative;
  display: block;
  overflow: hidden;
  width: 900px;
  height: 500px;
}

.slider-wrap .slider img {
  position: absolute;
  top: 0;
  left: 0;
  width: 900px;
  height: 500px;
}
.slider-wrap .shade {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
}
.slider-wrap .shade-left {
  float: left;
  padding-left: 15px;
  color: #ccc;
  letter-spacing: 1px;
}
.slider-wrap .shade-right {
  float: right;
  height: 100%;
}
.slider-wrap .shade-right a {
  margin-right: 25px;
  color: #ccc;
  line-height: 30px;
}
.slider-wrap .shade-right a:hover {
  color: #fff;
}
.slider-wrap .shade-right a.active {
  color: #fff;
  text-decoration: underline;
}
/* 滑动样式 */
.slide-enter {
  transform: translateX(900px);
}
.slide-enter-active {
  transition: transform 0.5s linear;
}
.slide-old-leave-active {
  transition: transform 0.5s linear;
  transform: translateX(-900px);
}
</style>
