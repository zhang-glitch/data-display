<template>
  <div class="total-orders">
    <common-card title="累计订单量" :value="orderToday">
      <template>
        <div id="orders-chart" style="width: 100%; height: 100%;"></div>
      </template>
      <template #footer>
        <span>昨日订单量 </span>
        <span class="emphasis">{{ orderLastDay | format }}</span>
      </template>
    </common-card>
  </div>
</template>

<script>
import axios from "axios";
import CommonCardMixins from "../../mixins/CommonCardMixins";
import Filters from "../../mixins/Filters";
export default {
  name: "TotalOreders",
  mixins: [CommonCardMixins, Filters],
  data() {
    return {
      orderToday: 0,
      orderFullYear: [],
      orderLastMonth: 0,
      orderLastDay: 0,
    };
  },
  mounted() {
    const chartsDom = document.getElementById("orders-chart");
    const chart = this.$echarts.init(chartsDom);
    axios.get("/screen/data").then((res) => {
      // console.log(res)
      const { orderToday, orderFullYear, orderLastMonth, orderLastDay } = res;
      this.orderToday = orderToday;
      this.orderFullYear = orderFullYear;
      this.orderLastMonth = orderLastMonth;
      this.orderLastDay = orderLastDay;
      chart.setOption({
        xAxis: {
          type: "category",
          show: true,
          // 图片距离两边的间距
          boundaryGap: false,
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
        series: [
          {
            type: "line",
            data: this.orderFullYear,
            // 展示面积,而非线段
            areaStyle: {
              color: "purple",
            },
            // 折线样式
            lineStyle: {
              width: 0,
            },
            // 拐点样式
            itemStyle: {
              opacity: 0,
            },
            // 使图像变平滑
            smooth: true,
          },
        ],
      });
    });
  },
};
</script>

<style lang="scss"></style>
