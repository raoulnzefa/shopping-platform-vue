import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/index.vue'
import DetailPage from '../pages/detail.vue'
import StatisticsPage from '../pages/detail/statistics.vue'
import ForecastPage from '../pages/detail/forecast.vue'
import AnalysisPage from '../pages/detail/analysis.vue'
import AdvertisingPage from '../pages/detail/advertising.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/detail',
      redirect: '/detail/statistics'
    },
    {
      path: '/detail',
      component: DetailPage,
      children: [
        {
          name: 'statistics',
          path: 'statistics',
          component: StatisticsPage
        },
        {
          name: 'forecast',
          path: 'forecast',
          component: ForecastPage
        },
        {
          name: 'analysis',
          path: 'analysis',
          component: AnalysisPage
        },
        {
          name: 'advertising',
          path: 'advertising',
          component: AdvertisingPage
        }
      ]
    }
  ]
})
