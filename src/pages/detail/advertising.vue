<template>
  <div class="wrap">
    <div class="detail-wrap__right__top">
      <h2 class="detail-wrap__right__top__title">
        广告发布
      </h2>
      <div class="detail-wrap__right__top__desc">
        <p>广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>
      </div>
      <div class="detail-wrap__right__top__form">
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">购物数量：</span>
          <amount v-if="isGetParams" :minNum="amount.min" :maxNum="amount.max" @on-change="getParams('proNum',$event)"></amount>
        </div>
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">行业：</span>
          <v-select v-if="isGetParams" :selectList="vocationList" @on-change="getParams('vocation',$event)"></v-select>
        </div>
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">其他可选：</span>
          <v-mul-choice :mulChoiceList="otherList" @on-change="getParams('otherSel',$event)"></v-mul-choice>
        </div>
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">有效时间：</span>
          {{time}}
        </div>
        <div class="detail-wrap__right__top__form__item">
          <span class="detail-wrap__right__top__form__item__left">总价：</span>
          {{price}}元
        </div>
        <button class="detail-wrap__right__top__form__btn" @click="buy">立即购买</button>
      </div>

    </div>
    <div class="detail-wrap__right__bot">
      <h2 class="detail-wrap__right__bot__title">产品说明</h2>
      <p class="detail-wrap__right__bot__desc">广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>
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
    <!-- 支付页面 -->
    <my-dialog v-if="isShowPayDialog" @onclose="closePayDialog">
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
      <div class="pay-w">
        <button class="pay-btn" @click="confirmBuy">确认购买</button>
      </div>
    </my-dialog>
    <my-dialog v-if="isShowCheckDialog" @onclose="closeCheckDialog">
      <p>请检查你的支付状态</p>
      <button>支付成功</button>
      <button>支付失败</button>
    </my-dialog>
  </div>
</template>

<script>
import Amount from '../../components/amount'
import VSelect from '../../components/vSelect'
import VMulChoice from '../../components/vMulChoice'
import MyDialog from '../../components/dialog'
import BankSelect from '../../components/bankSelect'
import axios from 'axios'
export default {
  components: {
    Amount,
    VSelect,
    VMulChoice,
    MyDialog,
    BankSelect
  },
  data () {
    return {
      isGetParams: false,

      amount: {},
      proNum: 0,

      vocationList: [],
      vocation: {},

      otherList: [],
      otherSel: [],

      time: '',

      isPrice: {
        proNum: false,
        vocation: false,
        otherSel: false
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
      ],

      isShowPayDialog: false,
      isShowCheckDialog: false,

      currentBank: {}
    }
  },
  methods: {
    getAdvertisingInfo () {
      axios
        .get('api/getAdvertisingInfo')
        .then(res => {
          this.isGetParams = true
          const data = res.data.list
          this.amount = data.amount

          this.vocationList = data.vocationList

          this.otherList = data.otherList

          this.time = data.time
        })
        .catch(err => {
          console.error(err)
        })
    },
    getParams (attr, val) {
      this[attr] = val
      this.isPrice[attr] = true
      if (
        this.isPrice.proNum === true &&
        this.isPrice.vocation === true &&
        this.isPrice.otherSel === true
      ) {
        this.getPrice()
      }
    },
    getReqParams () {
      const otherSelMap = this.otherSel.map(function (val) {
        return val.value
      })
      return {
        proNum: this.proNum,
        vocation: this.vocation.value,
        otherSel: otherSelMap.join(','),
        period: this.time
      }
    },
    getPrice () {
      const reqParams = this.getReqParams()
      axios
        .post('api/getPrice', reqParams)
        .then(res => {
          this.price = res.data.price
        })
        .catch(err => {
          console.error(err)
        })
    },
    buy () {
      this.isShowPayDialog = true
    },
    selBank (selectedBank) {
      this.currentBank = selectedBank
    },
    confirmBuy () {
      let reqParams = this.getReqParams()
      reqParams.bank = this.currentBank.id
      axios
        .post('api/confirmBuy')
        .then(res => {
          this.buyId = res.data.buyId
          // this.isShowCheckDialog = true
          this.isShowPayDialog = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    closePayDialog () {
      this.isShowPayDialog = false
    },
    closeCheckDialog () {
      this.isShowCheckDialog = false
    }
  },
  mounted () {
    this.getAdvertisingInfo()
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
/* 支付页面 */
.pay-table {
  font-size: 14px;
  width: 90%;
  margin: 10px auto 20px;
  text-align: center;
}
.pay-table th {
  background: #4fc08d;
  color: #fff;
  height: 22px;
  line-height: 22px;
}
.pay-table td {
  border: 1px solid #e3e3e3;
}
.pay-w {
  width: 90%;
  margin: 0 auto;
}
.pay-text {
  margin-bottom: 10px;
}
.pay-btn {
  background: #4fc08d;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
