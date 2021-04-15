<template>
  <ve-wordcloud :data="chartData" height="100%"></ve-wordcloud>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        chartData: {
          columns: ['word', 'count'],
          rows: []
        }
      }
    },
    mounted() {
      this.getRows()
    },
    methods: {
      getRows() {
        axios.get('/screen/wordcloud').then(res => {
          // console.log(res)
          this.chartData.rows = res
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .ve-wordcloud {
    width: 100% !important;
    height: 190px !important;
  }
</style>