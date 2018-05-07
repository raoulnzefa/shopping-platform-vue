<template>
  <div class="wrap">
    <div class="detail-wrap__right__top">
      <h2 class="detail-wrap__right__top__title">
        流量分析
      </h2>
      <div class="detail-wrap__right__top__desc">
        <p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
      </div>
      <div class="detail-wrap__right__top__form">
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">购物数量：</span>
          <amount v-if="isGetParams"  :minNum="amount.min" :maxNum="amount.max" @on-change="onParamChange('buyNum',$event)"></amount>
        </div>
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">产品类型：</span>
          <v-select  v-if="isGetParams"  :selectList="productTypeList" @on-change="onParamChange('productType',$event)"></v-select>
        </div>
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">有效时间：</span>
          <v-radio  v-if="isGetParams"  :radioList="timeList" @on-change="onParamChange('time',$event)"></v-radio>
        </div>
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">其他可选：</span>
          <v-mul-choice  v-if="isGetParams"  :mulChoiceList="otherList" @on-change="onParamChange('otherSel',$event)"></v-mul-choice>
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
      <p class="detail-wrap__right__bot__desc">网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>
      <div class="detail-wrap__right__bot__content">

        <h3>用户行为指标</h3>
        <p>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括： 用户在网站的停留时间； </p>
        <p>用户来源网站（也叫“引导网站”）； </p>
        <p>用户所使用的搜索引擎及其关键词；</p>
        <p>在不同时段的用户访问量情况等。</p>

        <h3>浏览网站方式</h3>
        <ul>
          <li>用户上网设备类型</li>
          <li>用户浏览器的名称和版本</li>
          <li>访问者电脑分辨率显示模式</li>
          <li>用户所使用的操作系统名称和版本</li>
          <li>用户所在地理区域分布状况等</li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import Amount from '../../components/amount'
import VSelect from '../../components/vSelect'
import VRadio from '../../components/vRadio'
import VMulChoice from '../../components/vMulChoice'
import axios from 'axios'
export default {
  components: {
    Amount,
    VSelect,
    VRadio,
    VMulChoice
  },
  data () {
    return {
      productTypeList: [],
      timeList: [],
      otherList: [],
      amount: {},
      buyNum: 0,
      productType: {},
      time: {},
      otherSel: [],
      price: 0,
      isGetParams: false,
      isPrice: {
        buyNum: false,
        productType: false,
        time: false,
        otherSel: false
      }
    }
  },
  methods: {
    onParamChange (attr, val) {
      this[attr] = val
      this.isPrice[attr] = true
      if (this.isPrice.buyNum === true && this.isPrice.productType === true && this.isPrice.time === true && this.isPrice.otherSel === true) {
        this.getPrice()
      }
    },
    getPrice () {
      const otherSelMap = this.otherSel.map(function (val) {
        return val.value
      })
      const reqParams = {
        buyNum: this.buyNum,
        productType: this.productType.value,
        time: this.time.value,
        otherSel: otherSelMap.join(',')
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
    getAnalysisInfo () {
      axios
        .get('api/getAnalysisInfo')
        .then(res => {
          const data = res.data.list
          this.isGetParams = true
          this.amount = data.amount
          this.productTypeList = data.productTypeList
          this.timeList = data.timeList
          this.otherList = data.otherList
          this.buyNum = data.amount.min
          this.productType = data.productTypeList[0]
          this.time = data.timeList[0]
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted () {
    this.getAnalysisInfo()
  }
}
</script>

<style scoped>
.detail-wrap__right__bot__content {
  padding: 10px;
}
.detail-wrap__right__bot__content h3 {
  height: 38px;
  line-height: 38px;
  font-size:16px;
  font-weight: 700;
}
.detail-wrap__right__bot__content p,
.detail-wrap__right__bot__content li {
  line-height: 24px;
}

</style>
