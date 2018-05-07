<template>
  <div class="dialog-wrap">
    <div class="dialog" @click="closeDialog">
    </div>
    <transition name="slide-dialog">
      <div v-if="isDialogContent" class="dialog__content">
        <div class="dialog__content__close" @click="closeDialog">x</div>
        <slot>no data</slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  data () {
    return {
      isDialogContent: false
    }
  },
  methods: {
    closeDialog () {
      this.up()
      setTimeout(() => {
        this.$emit('onclose')
      }, 210)
    },
    drop () {
      this.isDialogContent = false
      setTimeout(() => {
        this.isDialogContent = true
      }, 10)
    },
    up () {
      this.isDialogContent = true
      setTimeout(() => {
        this.isDialogContent = false
      }, 10)
    }
  },
  mounted () {
    this.drop()
  }
}
</script>

<style scoped>
.dialog {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
}
.dialog__content {
  position: absolute;
  top: 150px;
  width: 50%;
  min-height: 100px;
  background: #fff;
  left: 50%;
  margin-left: -25%;
  border-radius: 5px;
  z-index: 10;
}
.dialog__content__close {
  font-size: 14px;
  position: absolute;
  top: -15px;
  right: -15px;
  border-radius: 50%;
  background: #eee;
  width: 30px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  line-height: 30px;
}
.dialog__content__close:hover {
  background: #ccc;
}
/* dialog动画 */
.slide-dialog-enter {
  transform: translateY(-500px);
}
.slide-dialog-enter-active {
  transition: transform 0.5s;
}
.slide-dialog-leave-active {
  transform: translateY(-500px);
  transition: transform 0.2s;
}
</style>
