<template>
  <div class="total-sales">
    <common-card title="累计销售额" :value="'￥' + salesToday">
      <template>
        <div class="sales-chart">
          <div class="total-sales-change">
            <span>日同比</span>
            <span class="emphasis">{{ salesGrowthLastDay }} {{ "%" }}</span>
            <span class="bottom-triangle"></span>
          </div>
          <div class="total-sales-change">
            <span>月同比</span>
            <span class="emphasis">{{ salesGrowthLastMonth }} {{ "%" }}</span>
            <span class="top-triangle"></span>
          </div>
        </div>
      </template>
      <template #footer>
        <span>昨日销售额 </span>
        <span class="emphasis">{{ "￥" }} {{ salesLastDay | format }}</span>
      </template>
    </common-card>
  </div>
</template>

<script>
import axios from "axios";
import CommonCardMixins from "../../mixins/CommonCardMixins";
import Filters from "../../mixins/Filters";
export default {
  name: "TotalSales",
  mixins: [CommonCardMixins, Filters],
  data() {
    return {
      salesGrowthLastDay: 0,
      salesGrowthLastMonth: 0,
      salesToday: 0,
      salesLastDay: 0,
    };
  },
  mounted() {
    axios.get("/screen/data").then((res) => {
      // console.log(res)
      const {
        salesGrowthLastDay,
        salesGrowthLastMonth,
        salesToday,
        salesLastDay,
      } = res;
      this.salesGrowthLastDay = salesGrowthLastDay;
      this.salesGrowthLastMonth = salesGrowthLastMonth;
      this.salesToday = salesToday;
      this.salesLastDay = salesLastDay;
    });
  },
};
</script>

<style lang="scss">
.total-sales {
  span {
    font-size: 12px;
  }

  .sales-chart {
    // background: red;
    // // 高度不会被继承
    // height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.total-sales-change {
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
