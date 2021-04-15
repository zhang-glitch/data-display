<template>
  <div class="liquid-fill">
    <ve-liquidfill :data="liquidData" :settings="chartSettings" height="100%"></ve-liquidfill>
  </div>
</template>

<script>

function getColor(value) {
      return value > 0 && value <= 0.5 ? 'rgba(97,216,0,.7)'
        : value > 0.5 && value <= 0.8 ? 'rgba(204,178,26,.7)'
          : value > 0.8 ? 'rgba(241,47,28,.7)' : '#c7c7cb'
    }

export default {
  name: 'LiquidFill',
  data() {
    return {
      liquidData: {
        columns: ['name', 'percent'],
        rows: [{
          name: '支付转化率',
          percent: 0.2019
        }]
      },
      chartSettings: {}
    }
  },
  mounted() {
    this.chartSettings = {
      seriesMap: {
        支付转化率: {
          radius: '80%',
          // 文字配置
          label: {
            formatter: (v) => {
              return `${(v.data.value * 100).toFixed(2)}%`
            },
            textStyle: {
              fontSize: 36,
              color: '#999',
              fontWeight: 'normal'
            },
            position: ['50%', '50%'],
            // 当水滴和label文字重叠是显示的label颜色
            insideColor: '#fff'
          },

          // 轮廓配置
          outline: {
            itemStyle: {
              borderColor: '#aaa4a4',
              borderWidth: 1,
              color: 'none',
              shadowBlur: 0,
              shadowColor: '#fff'
            },
            // 轮廓和边框的距离
            borderDistance: 0
          },
          backgroundStyle: {
            color: '#fff'
          },
          
          itemStyle: {
            shadowBlur: 0,
            shadowColor: '#fff'
          },
          // 水波的振幅
          amplitude: 8,
          // 可以是字符串，可以是一个函数
          color: [getColor(this.liquidData.rows[0].percent)],
          tooltip: {
              show: true
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">

  .liquid-fill {

    .ve-liquidfill {
      height: 190px !important;
      width: 100% !important;
    }
  }
  
</style>