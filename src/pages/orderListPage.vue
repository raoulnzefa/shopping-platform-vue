<template>
  <div class="w">
    <p class="heading">您的产品</p>
    <div class="filter clearfix">
      <div class="filter-item">
        <span>选择产品：</span>
        <v-select :selectList="products"
                  @on-change="updateProduct"></v-select>
      </div>
      <div class="filter-item">
        <span>开始日期：</span>
        <input type="text"
               id="regular-date"
               readonly
               @focus="startDateShow = true"
               v-model="startDate">
        <date-picker :max="endDate"
                     color="#E91E63"
                     @close="startDateShow = false"
                     v-if="startDateShow"
                     v-model="startDate">
        </date-picker>
      </div>
      <div class="filter-item">
        <span>结束日期：</span>
        <input type="text"
               id="regular-date"
               readonly
               @focus="endDateShow = true"
               v-model="endDate">
        <date-picker :min="startDate"
                     color="#E91E63"
                     @close="endDateShow = false"
                     v-if="endDateShow"
                     v-model="endDate">
        </date-picker>
      </div>
      <div class="filter-item">
        <span>关键词：</span>
        <input type="text"
               v-model.lazy="keyQuery">
      </div>
    </div>
    <table class="table"
           v-show="tableData && tableData.length>0">
      <thead>
        <tr>
          <th @click="sortData(item,index)"
              :class="{active:sortIndex===index}"
              v-for="(item,index) in tabHeader"
              :key="index">{{item.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in tableData"
            :key="index">
          <td v-for="(head,index) in tabHeader"
              :key="index">{{item[head.id]}}</td>
        </tr>
      </tbody>
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
      sortWay: '',
      sortIndex: -1,
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
      ],
      tableData: []
    }
  },
  methods: {
    sortData (head, index) {
      let _this = this
      _this.sortWay = _this.sortWay === '' ? 'asc' : _this.sortWay
      this.tableData = this.tableData.sort((a, b) => {
        _this.sortIndex = index
        if (_this.sortWay === 'asc') {
          if (parseInt(a[head.id])) {
            return parseInt(a[head.id]) - parseInt(b[head.id])
          }
          return a[head.id] - b[head.id]
        } else {
          if (parseInt(a[head.id])) {
            return parseInt(b[head.id]) - parseInt(a[head.id])
          }
          return b[head.id] - a[head.id]
        }
      })
      if (_this.sortWay === 'asc') {
        _this.sortWay = 'des'
      } else {
        _this.sortWay = 'asc'
      }
    },
    updateProduct (product) {
      this.productId = product.value
      this.getList()
    },
    getList () {
      const params = {
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate,
        keyQuery: this.keyQuery
      }
      axios
        .get('api/getOrderList', params)
        .then(res => {
          this.tableData = res.data.list
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
  margin-bottom: 20px;
}
.table {
  width: 100%;
  margin-bottom: 20px;
}
.table th,
.table td {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.table th.active {
  background: #35495e;
}
</style>
