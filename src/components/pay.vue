<template>
  <div class="pay-wrap">
    <my-dialog v-if="isShowPayDialog">
      <table class="pay-table">
        <thead>
          <tr>
            <th>购买数量</th>
            <th>行业</th>
            <th>其他可选</th>
            <th>有效时间</th>
            <th>总价</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{proNum}}</td>
            <td>{{vocation.label}}</td>
            <td>
              <span v-for="(item,index) in otherSel" :key="index">{{index!==0?'、':''}}{{item.label}} </span>
            </td>
            <td>{{time}}</td>
            <td>{{price}}</td>
          </tr>
        </tbody>
      </table>
      <div class="pay-w pay-text">
        请选择银行
      </div>
      <div class="pay-w">
        <bank-select @on-change="selBank"></bank-select>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from './dialog'
import BankSelect from './bankSelect'
export default {
  components: {
    MyDialog,
    BankSelect
  },
  props: {
    isShowPayDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
