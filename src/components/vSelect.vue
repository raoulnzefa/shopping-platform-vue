<template>
  <div class="warp">
    <span class="select" @click="toggle">
      {{selectList[nowIndex]?selectList[nowIndex].label:''}}
      <i class="triangle"></i>
    </span>
    <ul class="options" v-if="isshow">
      <li class="option" v-for="(item,index) in selectList" :key="index" @click="chooseVal(index)">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    selectList: {
      type: Array,
      default () {
        return [
          {
            label: 'test',
            value: 0
          }
        ]
      }
    }
  },
  data () {
    return {
      isshow: false,
      nowIndex: 0
    }
  },
  methods: {
    toggle () {
      this.isshow = !this.isshow
    },
    chooseVal (index) {
      this.nowIndex = index
      this.toggle()
      this.$emit('on-change', this.selectList[this.nowIndex])
    }
  },
  mounted () {
    this.$emit('on-change', this.selectList[this.nowIndex])
  }
}
</script>

<style scoped>
.warp {
  display: inline-block;
  height: 25px;
  position: relative;
  font-size: 0;
  text-align: center;
  background:#fff;
}
.select {
  display: inline-block;
  min-width: 56px;
  height: 25px;
  font-size: 12px;
  border: 1px solid #e3e3e3;
  border-radius: 3px;
  line-height: 25px;
  color: #444;
  position: relative;
  cursor: pointer;
  user-select: none;
  padding-right: 15px;
  padding-left: 5px;
}
.select .triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-top: 5px solid #e3e3e3;
  right: 10px;
  top: 10px;
}
.options {
  position: absolute;
  top: 25px;
  font-size: 12px;
  border: 1px solid #e3e3e3;
  border-radius: 0 0 3px 3px;
  background: #fff;
  z-index: 5;
}
.options .option {
  width: 56px;
  cursor: pointer;
  padding: 0 15px 0 5px;
}
.options .option:hover {
  background: #eee;
}
</style>
