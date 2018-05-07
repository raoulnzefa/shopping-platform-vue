<template>
  <div class="wrap">
    <div class="raido-item" :class="{active:nowIndex===index}" v-for="(item,index) in radioList" :key="item.value" @click="selItem(index)">
      {{item.label}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    radioList: {
      type: Array,
      default () {
        return [
          {
            label: 'test1',
            value: 0
          }
        ]
      }
    }
  },
  data () {
    return {
      nowIndex: 0
    }
  },
  methods: {
    selItem (index) {
      if (this.nowIndex !== index) {
        this.nowIndex = index
        this.$emit('on-change', this.radioList[this.nowIndex])
      }
    }
  },
  mounted () {
    this.$emit('on-change', this.radioList[this.nowIndex])
  }
}
</script>

<style scoped>
.wrap {
  display: inline-block;
}
.raido-item {
  display: inline-block;
  min-width: 40px;
  padding: 0 5px;
  height: 25px;
  color: #444;
  border: 1px solid #e3e3e3;
  border-radius: 3px;
  text-align: center;
  line-height: 25px;
  margin-right: 5px;
  cursor: pointer;
  user-select: none;
}
.raido-item.active {
  color: #fff;
  background-color: #4fc08d;
  border: 1px solid #4fc08d;
}
</style>
