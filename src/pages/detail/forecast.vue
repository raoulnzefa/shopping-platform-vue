<template>
  <div class="wrap">
    <div class="detail-wrap__right__top">
      <h2 class="detail-wrap__right__top__title">
        数据预测
      </h2>
      <div class="detail-wrap__right__top__desc">
        <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
      </div>
      <div class="detail-wrap__right__top__form">
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">购物数量：</span>
          <amount v-if="isGetParams" :minNum="amount.min" :maxNum="amount.max" @on-change="onParamChange('buyNum',$event)"></amount>
        </div>
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">媒介：</span>
          <v-mul-choice v-if="isGetParams"  :mulChoiceList="mediumList" @on-change="onParamChange('mediumSel',$event)"></v-mul-choice>
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
      <p class="detail-wrap__right__bot__desc">2020年的一天，在你驱车前往公司的路上，导航系统通过预测交通流量，会自动帮你选择一条最合适的交通路线；车内推荐系统会根据你的饮食习惯预测你可能会喜欢吃什么，并推荐沿途的早餐店；你的电子社交助理已经为你自动选择了你可能感兴趣的社交网信息；当车内系统预测到你驾车有些分心时，座椅会自动震动进行提醒…… 以上这些情景不是科幻大片独有的，它们有的已经或会在未来的某一天成为现实。而这一切所倚靠的就是预测分析技术。 大数据时代下，作为其核心，预测分析已在商业和社会中得到广泛应用。随着越来越多的数据被记录和整理，未来预测分析必定会成为所有领域的关键技术。 作为预测分析领域的专家，埃里克·西格尔博士深谙预测分析界已经实现和正在发生的事情、面临的问题和将来可能的前景。在《大数据预测》一书中，他结合预测分析的应用实例，对其进行了深入、细致且全面的解读。 关于预测分析，你想了解的全部，你的生活以及这个世界会因为预测分析改变到什么程度，《大数据预测》都会告诉你。</p>
    </div>
  </div>
</template>

<script>
import Amount from '../../components/amount'
import VMulChoice from '../../components/vMulChoice'
import axios from 'axios'
export default {
  components: {
    Amount,
    VMulChoice
  },
  data () {
    return {
      time: '',
      mediumList: [],
      amount: {},
      buyNum: 0,
      mediumSel: [],
      price: 0,
      isGetParams: false,
      isPrice: {
        buyNum: false,
        mediumSel: false
      }
    }
  },
  methods: {
    onParamChange (attr, val) {
      this[attr] = val
      this.isPrice[attr] = true
      if (this.isPrice.buyNum === true && this.isPrice.mediumSel === true) {
        this.getPrice()
      }
    },
    getPrice () {
      const mediumSelMap = this.mediumSel.map(function (val) {
        return val.value
      })
      const reqParams = {
        buyNum: this.buyNum,
        mediumSel: mediumSelMap.join(',')
      }
      axios
        .post('api/getPrice', reqParams)
        .then(res => {
          this.price = res.data.price
        })
        .catch(err => {
          console.error(err)
        })
    },
    getForecastInfo () {
      axios
        .get('api/getForecastInfo')
        .then(res => {
          const data = res.data.list
          this.amount = data.amount
          this.time = data.time
          this.mediumList = data.mediumList
          this.buyNum = data.amount.min

          this.isGetParams = true
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted () {
    this.getForecastInfo()
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
