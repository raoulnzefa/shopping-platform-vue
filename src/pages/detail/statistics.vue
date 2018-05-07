<template>
  <div class="wrap">
    <div class="detail-wrap__right__top">
      <h2 class="detail-wrap__right__top__title">
        数据统计
      </h2>
      <div class="detail-wrap__right__top__desc">
        <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
      </div>
      <div class="detail-wrap__right__top__form">
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">产品类型：</span>
          <v-radio @on-change="getParams('productType',$event)" v-if="isGetParams" :radioList="productTypeList"></v-radio>
        </div>
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">适用地区：</span>
          <v-select @on-change="getParams('region',$event)" v-if="isGetParams" :selectList="regionList"></v-select>
        </div>
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">有效时间：</span>
          {{time}}
        </div>
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">总价：</span>
          {{price}}元
        </div>
        <button class="detail-wrap__right__top__form__btn">立即购买</button>
      </div>

    </div>
    <div class="detail-wrap__right__bot">
      <h2 class="detail-wrap__right__bot__title">产品说明</h2>
      <p class="detail-wrap__right__bot__desc">历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
      <div class="detail-wrap__right__bot__content">
        <table>
          <tbody>
            <tr v-for="row in 5" :key="row">
              <td v-for="col in 7" :key="col">{{tableData[(row-1)*7+(col-1)]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import VSelect from '../../components/vSelect'
import VRadio from '../../components/vRadio'
import axios from 'axios'
export default {
  components: {
    VSelect,
    VRadio
  },
  data () {
    return {
      productTypeList: [],
      productType: {},
      regionList: [],
      region: '',
      time: '',

      isGetParams: false,

      isPrice: {
        productType: false,
        region: false
      },
      price: 0,
      tableData: [
        '安全安保',
        '办公文教',
        '彩票',
        '车辆物流',
        '成人用品',
        '出版传媒',
        '电脑硬件',
        '电子电工',
        '房地产建筑装修',
        '分类平台',
        '服装鞋帽',
        '箱包饰品',
        '化工原料制品',
        '机械设备',
        '家庭日用品',
        '家用电器',
        '教育培训',
        '节能环保',
        '金融服务',
        '礼品',
        '旅游住宿',
        '美容化妆',
        '母婴护理',
        '农林牧渔',
        '软件',
        '商务服务',
        '生活服务',
        '食品保健品',
        '手机数码',
        '通讯服务设备',
        '网络服务',
        '医疗服务',
        '游戏',
        '运动休闲娱乐',
        '招商加盟'
      ]
    }
  },
  methods: {
    getStatisticsInfo () {
      axios
        .get('api/getStatisticsInfo')
        .then(res => {
          const data = res.data.list
          this.productTypeList = data.productTypeList
          this.regionList = data.regionList
          this.time = data.time

          // 标志设为以获取到远程参数
          this.isGetParams = true
        })
        .catch(err => {
          console.error(err)
        })
    },
    getParams (attr, val) {
      this[attr] = val
      this.isPrice[attr] = true
      if (this.isPrice.productType === true && this.isPrice.region === true) {
        this.getPrice()
      }
    },
    getPrice () {
      const reqParams = {
        productType: this.productType.value,
        region: this.region.value
      }
      axios
        .post('api/getPrice', reqParams)
        .then(res => {
          this.price = res.data.price
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted () {
    this.getStatisticsInfo()
  }
}
</script>

<style scoped>
.detail-wrap__right__bot__content {
  margin-top: 20px;
}
.detail-wrap__right__bot__content table {
  width: 900px;
}
.detail-wrap__right__bot__content td {
  padding: 15px;
  border: 1px solid #e3e3e3;
}
</style>
