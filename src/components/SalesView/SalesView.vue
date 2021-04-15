<template>
  <div class="sales-view">
    <el-card shadow="hover">
      <template #header>
       <div class="menu-wrapper">
          <el-menu 
            mode="horizontal"
            :default-active="currentMenuIndex"  
            @select="changeCharts"
          >
            <el-menu-item index="1">销售总额</el-menu-item>
            <el-menu-item index="2">访问总量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group v-model="radioSelect" size="small">
              <el-radio-button label="今日"></el-radio-button>
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
              <el-radio-button label="今年"></el-radio-button>
            </el-radio-group>
            <el-date-picker
              v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panel
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
       </div>
      </template>
      <template>
        <div class="sales-view-chart-wrapper">
          <vue-echarts
          class="sales-view-chart" 
            :options="chartsOptions"
          ></vue-echarts>
          <div class="sales-view-list">
            <div class="list-name">排行榜</div>
            <div :class="['list-item', +item.no > 3 ? 'list-item-next-three': '']" v-for="item in listRaw" :key="item.no">
              <div :class="['list-item-no', +item.no <= 3 ? 'top-no': '']">{{item.no}}</div>
              <div class="list-item-name">{{item.name}}</div>
              <div class="list-item-money">{{item.money}}</div>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SalesView',
  data() {
    return {
      currentMenuIndex: '1',
      radioSelect: '今日',
      // 销售总额
      orderFullYear: [410, 82, 200, 334, 390, 330, 220, 150, 82, 200, 134, 290],
      // 访问总量
      userFullYear: [110, 120, 90, 220, 175, 212, 192, 95, 88, 120, 250, 310],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            // getTime单位是毫秒
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            debugger
            picker.$emit('pick', [start, end], true);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end], true);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end], true);
          }
        }]
      },
      date: '',
      // 柱状图数据
      chartsOptions: {},
      listRaw: [
        {
          no: 1,
          name: '肯德基',
          money: '32,323,232'
        },
        {
          no: 2,
          name: '肯德基',
          money: '32,323,232'
        },
        {
          no: 3,
          name: '肯德基',
          money: '32,323,232'
        },
        {
          no: 4,
          name: '肯德基',
          money: '32,323,232'
        },
        {
          no: 5,
          name: '肯德基',
          money: '32,323,232'
        },
        {
          no: 6,
          name: '肯德基',
          money: '32,323,232'
        },
        {
          no: 7,
          name: '肯德基',
          money: '32,323,232'
        },
        {
          no: 8,
          name: '肯德基',
          money: '32,323,232'
        },
        {
          no: 9,
          name: '肯德基',
          money: '32,323,232'
        }
      ]
    }
  },
  created() {
    this.changeCharts('1')
  },
  mounted() {
    axios.get("/screen/data").then(res => {
      // console.log(res)
      const {userRank, orderFullYear, userFullYear} = res
      this.listRaw = userRank
      this.orderFullYear = orderFullYear
      this.userFullYear = userFullYear
    })
  },
  methods: {
    changeCharts(index) {
      this.currentMenuIndex = index
      if(index === '1') {
        this.render('年度销售业绩数据', this.orderFullYear)
      }else {
        this.render('年度用户访问数据', this.userFullYear)
      }
    },
    render(textTitle, data) {
      this.chartsOptions = {
        title: {
          text: textTitle,
          textStyle: {
            fontSize: 12,
            color: '#666'
          },
          left: 15,
          top: 0
        },
        tooltip: {
          formatter: (pramas) => {
            // console.log(pramas)
            return `${pramas.name}<br />
              ${pramas.marker}sales: ${pramas.value}`
          }
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          // 这里表示的是每个x断点的分割线的样式
          axisTick: {
            // 让短竖线在柱状图中间
            alignWithLabel: true,
            lineStyle: {
              color: '#999'
            }
          },
          // 修改x轴线的选项
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: {
          // 隐藏y轴，但是数据不隐藏。
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          // 修改y轴得分割线样式
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: '#eee'
            }
          }
        },
        series: [
          {
            type: 'bar',
            data: data,
            barWidth: '35%'
          }
        ],
        color: ['#3398DB'],
        grid: {
          top: 70,
          left: 60,
          right: 60,
          bottom: 50
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .top-no {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    background: #000;
    color: #fff;
  }

  .sales-view {
    margin-top: 20px;

    .menu-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-radio-group {
        margin-right: 20px;
      }
    }

    .sales-view-chart-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 270px;

      .sales-view-chart {
        flex: 0 0 70%;
        width: 80%;
        height: 100%;
      }

      .sales-view-list {
        flex: 1;
        font-size: 12px;
        box-sizing: border-box;
        margin-right: 20px;
        height: 100%;
        overflow: hidden;

        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }
      }
    }
  }

  .el-card__header {
    padding: 0px 20px;
  }

  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }

  .list-item-next-three {
    margin-left: 10px;
  }
</style>