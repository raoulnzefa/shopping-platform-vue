<template>
  <div class="wrap">
    <div class="raido-item" :class="{active:isActive(index)}" v-for="(item,index) in mulChoiceList" :key="item.value" @click="selItem(index)">
      {{item.label}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mulChoiceList: {
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
      nowIndex: []
    }
  },
  methods: {
    selItem (selIndex) {
      const delIndex = this.nowIndex.indexOf(selIndex)
      if (delIndex !== -1) {
        this.nowIndex.splice(delIndex, 1)
      } else {
        this.nowIndex.push(selIndex)
      }
      this.sendMulChoiceArr()
    },
    isActive (index) {
      return this.nowIndex.indexOf(index) !== -1
    },
    sendMulChoiceArr () {
      let mulChoiceArr = []
      this.nowIndex.forEach((val, index, arr) => {
        mulChoiceArr.push(this.mulChoiceList[val])
      })
      this.$emit('on-change', mulChoiceArr)
    }
  },
  mounted () {
    this.sendMulChoiceArr()
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
