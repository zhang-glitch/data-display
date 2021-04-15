<template>
  <ve-bmap
    :settings="chartSettings"
    :title="title"
    :tooltip="{}"
    :series="chartSeries"
    height="100%"
  ></ve-bmap>
</template>

<script>
import axios from 'axios'

  const convertData = function (data, geo) {
    const res = []
    data.forEach(item => {
      const { name, value } = item
      const coord = geo[name]
      res.push({
        name,
        value: [...coord, value]
      })
    })
    return res
  }

  export default {
    name: 'MapView',
    data() {
      return {
        data: [],
        geo: {},
        title: {
          text: '慕课外卖销售数据大盘',
          subtext: '销售趋势统计',
          sublink: 'https://github.com/zhang-glitch/',
          left: 'center'
        },
        chartSettings: {
          key: 'G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb',
          bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: false,
            // mapStyle: {
            //     styleId: 'f21dcb881a0146f692358c13cc9f83e2'
            // }
          }
        },
        chartSeries: []
      }
    },
    created() {
      this.getData()
    },
    //这里为什么获取不到data, geo的值
    // mounted() {
    //     if(this.geo.length !== 0 && this.data.length !== 0) {
      //       this.chartSeries = [
      //   {
      //     name: '销售额',
      //     type: 'scatter',
      //     coordinateSystem: 'bmap',
      //     data: convertData(this.data, this.geo),
      //     encode: {
      //       value: 2
      //     },
      //     itemStyle: {
      //       color: 'purple'
      //     },
      //     symbolSize: function (val) {
      //       return val[2] / 10
      //     },
      //     label: {
      //       show: false,
      //       position: 'right',
      //       formatter: function (v) {
      //         return `${v.data.name} - ${v.data.value[2]}`
      //       }
      //     },
      //     emphasis: {
      //       label: {
      //         show: true
      //       }
      //     }
      //   },
      //   {
      //     name: 'Top 10',
      //     type: 'effectScatter',
      //     coordinateSystem: 'bmap',
      //     data: convertData(this.data.sort(function (a, b) {
      //       return b.value - a.value
      //     }), this.geo).slice(0, 10),
      //     symbolSize: function (val) {
      //       return val[2] / 10
      //     },
      //     encode: {
      //       value: 2
      //     },
      //     label: {
      //       formatter: function (v) {
      //         return `${v.data.name} - ${v.data.value[2]}`
      //       },
      //       position: 'right',
      //       show: true
      //     },
      //     hoverAnimation: true,
      //     rippleEffect: {
      //       brushType: 'stroke'
      //     },
      //     itemStyle: {
      //       color: 'purple',
      //       shadowBlur: 10,
      //       shadowColor: '#333'
      //     }
      //   }
      // ]
        // }
      
    // },
    methods: {
      getData() {
        axios.get('/screen/map/scatter').then(res => {
          // console.log(res)
          this.data = res.data
          this.geo = res.geo
           this.chartSeries = [
        {
          name: '销售额',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: convertData(this.data, this.geo),
          encode: {
            value: 2
          },
          itemStyle: {
            color: 'purple'
          },
          symbolSize: function (val) {
            return val[2] / 10
          },
          label: {
            show: false,
            position: 'right',
            formatter: function (v) {
              return `${v.data.name} - ${v.data.value[2]}`
            }
          },
          emphasis: {
            label: {
              show: true
            }
          }
        },
        {
          name: 'Top 10',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: convertData(this.data.sort(function (a, b) {
            return b.value - a.value
          }), this.geo).slice(0, 10),
          symbolSize: function (val) {
            return val[2] / 10
          },
          encode: {
            value: 2
          },
          label: {
            formatter: function (v) {
              return `${v.data.name} - ${v.data.value[2]}`
            },
            position: 'right',
            show: true
          },
          hoverAnimation: true,
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            color: 'purple',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        }
      ]
        })
      }
    }
  }
</script>
