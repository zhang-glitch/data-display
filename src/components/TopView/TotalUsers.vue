<template>
  <div class="total-users">
    <common-card title="累计用户数" :value="userToday">
      <template>
        <div id="total-users-chart" style="width: 100%; height: 100%;"></div>
      </template>
      <template #footer>
        <div class="total-users-footer">
          <span>日同比</span>
          <span class="emphasis radio">{{ userGrowthLastDay }} {{ "%" }}</span>
          <span class="bottom-triangle" style="margin-right: 10px;"></span>
          <span>月同比</span>
          <span class="emphasis radio"
            >{{ userGrowthLastMonth }} {{ "%" }}</span
          >
          <span class="top-triangle"></span>
        </div>
      </template>
    </common-card>
  </div>
</template>

<script>
import CommonCardMixins from "../../mixins/CommonCardMixins";
import axios from "axios";
export default {
  name: "TotalUsers",
  mixins: [CommonCardMixins],
  data() {
    return {
      userToday: 0,
      userGrowthLastDay: 0,
      userGrowthLastMonth: 0,
    };
  },
  mounted() {
    const chartsDom = document.getElementById("total-users-chart");
    const chart = this.$echarts.init(chartsDom);
    axios.get("/screen/data").then((res) => {
      // console.log(res)
      const { userToday, userGrowthLastDay, userGrowthLastMonth } = res;
      this.userToday = userToday;
      this.userGrowthLastDay = userGrowthLastDay;
      this.userGrowthLastMonth = userGrowthLastMonth;
      chart.setOption({
        xAxis: {
          show: false,
        },
        yAxis: {
          show: false,
          type: "category",
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        series: [
          {
            type: "bar",
            data: [200],
            barWidth: 10,
            itemStyle: {
              color: "#45c946",
            },
            // 指定表示类型
            stack: "总量",
          },
          {
            type: "bar",
            data: [250],
            barWidth: 10,
            itemStyle: {
              color: "#eee",
            },
            // 指定表示类型
            stack: "总量",
          },
          {
            type: "custom",
            data: [200],
            renderItem: (params, api) => {
              // console.log(api.style())
              // api.style({fill: 'green', stroke: 'yellow'})
              const value = api.value(0);
              const endPoint = api.coord([value, 0]);
              return {
                type: "group",
                position: endPoint,
                children: [
                  {
                    type: "path",
                    shape: {
                      d:
                        "M1024 255.996 511.971 767.909 0 255.996 1024 255.996z",
                      x: -5,
                      y: -20,
                      width: 10,
                      height: 10,
                      layout: "cover",
                    },
                    style: {
                      fill: "#45c946",
                    },
                    // style: api.style() //这个函数的默认值是什么，表示的是哪个样式。
                  },
                  {
                    type: "path",
                    shape: {
                      //svg中的图标
                      d: "M0 767.909l512.029-511.913L1024 767.909 0 767.909z",
                      x: -5,
                      y: 10,
                      width: 10,
                      height: 10,
                      layout: "cover",
                    },
                    style: {
                      fill: "#45c946",
                    },
                  },
                ],
              };
            },
          },
        ],
      });
    });
  },
};
</script>

<style lang="scss">
.total-users {
  .radio {
    color: #000;
    font-weight: 700;
    margin-left: 5px;
  }
}

.total-users-footer {
  display: flex;
  align-items: center;
}
</style>
