<template>
  <div class="amount-wrap">
    <div class="minus" @click="decrNum">-</div>
    <input type="text" class="cont" v-model="num" @keyup="fixNumber">
    <div class="plus" @click="addNum">+</div>
  </div>
</template>

<script>
export default {
  props: {
    minNum: {
      type: [Number, String],
      default: 0
    },
    maxNum: {
      type: [Number, String],
      default: 5
    }
  },
  data () {
    return {
      num: 0
    }
  },
  mounted () {
    this.num = this.minNum
    this.$emit('on-change', this.num * 1)
  },
  methods: {
    decrNum () {
      if (this.num * 1 > this.minNum) {
        this.num--
      }
    },
    addNum () {
      if (this.num * 1 < this.maxNum) {
        this.num++
      }
    },
    fixNumber () {
      this.num = this.num.toString().replace(/\D/g, '')
      if (this.num === '') {
        this.num = 0
      }
      if (this.num * 1 < this.minNum) {
        this.num = this.minNum
      } else if (this.num * 1 > this.maxNum) {
        this.num = this.maxNum
      }
    }
  },
  watch: {
    num (val) {
      if (!isNaN(val) && (val * 1 <= this.maxNum) && (val * 1 >= this.minNum)) {
        this.$emit('on-change', val * 1)
      }
    }
  }
}
</script>

<style scoped>
.amount-wrap {
  display: inline-block;
  font-size: 0;
  margin-left: 1px;
}
.amount-wrap .minus,
.amount-wrap .cont,
.amount-wrap .plus {
  display: inline-block;
  border: 1px solid #e3e3e3;
  font-size: 12px;
  width: 25px;
  height: 25px;
  text-align: center;
  vertical-align: middle;
  margin-left: -1px;
}
.amount-wrap .minus,
.amount-wrap .plus {
  user-select: none;
  cursor: pointer;
}
.amount-wrap .cont {
  width: 30px;
}
</style>
