<template>
  <div class="w">
    <p class="heading">您的产品</p>
    <div class="filter clearfix">
      <div class="filter-item">
        <span>选择产品：</span>
        <v-select></v-select>
      </div>
      <div class="filter-item">
        <span>开始日期：</span>
        <date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
      </div>
      <div class="filter-item">
        <span>结束日期:</span>
        <v-select></v-select>
      </div>
      <div class="filter-item">
        <span>关键词：</span>
        <v-select></v-select>
      </div>
    </div>

  </div>
</template>

<script>
import VSelect from '../components/vSelect'
import MyDatepicker from '../components/vDate'
export default {
  components: {
    VSelect,
    'date-picker': MyDatepicker
  },
  data () {
    return {
      startTime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: 'when?',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F'
        },
        color: {
          header: '#3bb4f2',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm'
      },
      limit: [{
        type: 'weekday',
        available: [1, 2, 3, 4, 5]
      },
      {
        type: 'fromto',
        from: '2016-02-01',
        to: '2016-02-20'
      }]
    }
  }
}
</script>

<style scoped>
.heading {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.filter-item {
  float: left;
}
</style>
