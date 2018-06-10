<template>
  <div class="w">
    <p class="heading">您的产品</p>
    <div class="filter clearfix">
      <div class="filter-item">
        <span>选择产品：</span>
        <v-select :selectList="products" @on-change="updateProduct"></v-select>
      </div>
      <div class="filter-item">
        <span>开始日期：</span>
        <input type="text" id="regular-date" readonly @focus="startDateShow = true" v-model="startDate">
        <date-picker :max="endDate" color="#E91E63" @close="startDateShow = false" v-if="startDateShow" v-model="startDate">
        </date-picker>
      </div>
      <div class="filter-item">
        <span>结束日期：</span>
        <input type="text" id="regular-date" readonly @focus="endDateShow = true" v-model="endDate">
        <date-picker :min="startDate" color="#E91E63" @close="endDateShow = false" v-if="endDateShow" v-model="endDate">
        </date-picker>
      </div>
      <div class="filter-item">
        <span>关键词：</span>
        <input type="text" v-model.lazy="keyQuery">
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <td></td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import VSelect from '../components/vSelect'
import DatePicker from '../components/vDate'
import axios from 'axios'
export default {
  components: {
    VSelect,
    DatePicker
  },
  data () {
    return {
      products: [
        {
          label: '数据统计',
          value: 0
        },
        {
          label: '数据预测',
          value: 1
        },
        {
          label: '流量分析',
          value: 2
        },
        {
          label: '广告发布',
          value: 3
        }
      ],
      productId: null,
      startDateShow: false,
      startDate: '',
      endDateShow: false,
      endDate: '',
      keyQuery: '',
      tabHeader: [
        {
          name: '订单号',
          id: 'orderId'
        },
        {
          name: '购买产品',
          id: 'product'
        },
        {
          name: '版本类型',
          id: 'version'
        },
        {
          name: '有效时间',
          id: 'period'
        },
        {
          name: '购买日期',
          id: 'date'
        },
        {
          name: '数量',
          id: 'buyNum'
        },
        {
          name: '总价',
          id: 'amount'
        }
      ]
    }
  },
  methods: {
    updateProduct (product) {
      this.productId = product.value
      this.getList()
    },
    getList () {
      console.log(this.productId)
      console.log(this.startDate)
      console.log(this.endDate)
      console.log(this.keyQuery)
      const params = {
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate,
        keyQuery: this.keyQuery
      }
      axios
        .get('api/getOrderList', params)
        .then(res => {
          console.log(res.data.list)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  watch: {
    startDate (date) {
      this.getList()
    },
    endDate (date) {
      this.getList()
    },
    keyQuery (val) {
      this.getList()
    }
  }
}
</script>

<style scoped>
.heading {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 20px;
}
.filter-item {
  float: left;
  margin-right: 20px;
}
</style>
