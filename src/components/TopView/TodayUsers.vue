<template>
  <div class="today-users">
    <common-card title="今日交易用户数" :value="orderUser">
      <template>
        <div id="today-users-chart" style="width: 100%; height: 100%;"></div>
      </template>
      <template #footer>
        <span>退货率 </span>
        <span class="emphasis">{{ returnRate }} {{ "%" }}</span>
      </template>
    </common-card>
  </div>
</template>

<script>
import axios from "axios";

import CommonCardMixins from "../../mixins/CommonCardMixins";
export default {
  name: "TodayUsers",
  mixins: [CommonCardMixins],
  data() {
    return {
      orderUser: 0,
      orderUserTrendAxis: [],
      returnRate: 0,
      orderTrend: [],
    };
  },
  mounted() {
    const chartsDom = document.getElementById("today-users-chart");
    const chart = this.$echarts.init(chartsDom);
    axios.get("/screen/data").then((res) => {
      // console.log(res)
      const { orderUser, orderUserTrendAxis, returnRate, orderTrend } = res;
      this.orderUser = orderUser;
      this.orderUserTrendAxis = orderUserTrendAxis;
      this.returnRate = returnRate;
      this.orderTrend = orderTrend;
      chart.setOption({
        color: ["#3398db"],
        xAxis: {
          show: false,
          type: "category",
          data: this.orderUserTrendAxis,
        },
        yAxis: {
          show: false,
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        tooltip: {
          formatter: (pramas) => {
            return `${pramas.name}<br />
              ${pramas.marker}直接访问: ${pramas.value}`;
          },
        },
        series: [
          {
            type: "bar",
            data: [
              620,
              432,
              220,
              534,
              790,
              430,
              220,
              320,
              532,
              320,
              834,
              690,
              530,
              220,
              620,
            ],
            barWidth: "60%",
          },
        ],
      });
    });
  },
};
</script>

<style lang="scss">
.total-users {
  .users-number {
    color: #000;
    font-weight: 700;
    margin-left: 5px;
  }
}
</style>
