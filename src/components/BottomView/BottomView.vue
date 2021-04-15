<template>
  <div class="bottom-view">
    <el-card class="bottom-view-left" shadow="hover">
      <template #header>
        关键词搜索
      </template>
      <template>
        <div class="bottom-view-charts">
          <div class="left-chart">
            <div class="title">搜索用户数</div>
            <div class="total-num">{{ searchNum | format }}</div>
            <vue-echarts :options="userNumData"></vue-echarts>
          </div>
          <div class="right-chart">
            <div class="title">搜索率</div>
            <div class="rate-num">{{ searchRate | format }}</div>
            <vue-echarts :options="searchNumData"></vue-echarts>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="rank" label="排名" width="180">
          </el-table-column>
          <el-table-column prop="key" label="关键词" width="180">
          </el-table-column>
          <el-table-column prop="searchTotal" label="搜索总量">
          </el-table-column>
          <el-table-column prop="userNum" label="搜索用户数"> </el-table-column>
          <el-table-column prop="rate" label="点击率"> </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="onCurrentChange"
          >
          </el-pagination>
        </div>
      </template>
    </el-card>
    <el-card class="bottom-view-right" shadow="hover">
      <template #header>
        <div class="category-rank">
          <div class="header-title">
            分类销售排行
          </div>
          <el-radio-group
            v-model="radioSelect"
            size="small"
            @change="changeCharts"
          >
            <el-radio-button label="品类"></el-radio-button>
            <el-radio-button label="商品"></el-radio-button>
          </el-radio-group>
        </div>
      </template>
      <template>
        <div class="category-chart">
          <vue-echarts :options="chartData"></vue-echarts>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import Filters from "../../mixins/Filters";
export default {
  name: "BottomView",
  mixins: [Filters],
  data() {
    return {
      radioSelect: "品类",
      tableData: [],
      totalData: [],
      searchNum: 0,
      searchRate: 0,
      pageSize: 4,
      total: 0,
      userNumData: {
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
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        series: [
          {
            type: "line",
            data: [],
            // 展示面积,而非线段
            areaStyle: {
              color: "#c7e7ff",
            },
            // 折线样式
            lineStyle: {
              width: 2,
              color: "#5fbbff",
            },
            // 拐点样式
            itemStyle: {
              opacity: 0,
            },
            // 使图像变平滑
            smooth: true,
          },
        ],
      },
      searchNumData: {
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
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        series: [
          {
            type: "line",
            data: [],
            // 展示面积,而非线段
            areaStyle: {
              color: "#c7e7ff",
            },
            // 折线样式
            lineStyle: {
              width: 2,
              color: "#5fbbff",
            },
            // 拐点样式
            itemStyle: {
              opacity: 0,
            },
            // 使图像变平滑
            smooth: true,
          },
        ],
      },
      // 饼图
      chartData: {},
      // 饼图数据
      goodsdata: {},
      categorydata: {},
      categoryTotal: 0,
      goodsTotal: 0,
      // 关键字数据
      wordCloud: [],
    };
  },
  created() {
    this.changeCharts("品类");
  },
  mounted() {
    axios.get("/screen/wordcloud").then((res) => {
      // console.log(res)
      this.wordCloud = res;
    });
  },
  watch: {
    wordCloud() {
      // console.log("watch", this.wordCloud)
      this.wordCloud.forEach((item, index) => {
        this.totalData.push({
          rank: index + 1 + "",
          key: item.word,
          searchTotal: item.count,
          userNum: item.user,
          rate: `${((item.user / item.count) * 100).toFixed(2)}%`,
        });

        // this.totalData.sort((item1, item2) => (item2.searchTotal - item1.searchTotal) && (item2.userNum - item1.userNum))

        // 总数据
        this.total = this.wordCloud.length;
        // 图
        this.userNumData.series[0].data.push(item.user);
        this.searchNumData.series[0].data.push(item.count);
      });
      // 搜索用户数
      this.searchNum = this.wordCloud.reduce((pre, item) => {
        return pre + item.user;
      }, 0);

      // 搜索总量
      this.searchRate = this.wordCloud.reduce((pre, item) => {
        return pre + item.count;
      }, 0);

      // 初始化表格数据
      this.tableData = this.totalData.slice(0, 4);
    },
  },
  methods: {
    getCategory() {
      // console.log(label)
      axios.get("/screen/data").then((res) => {
        // console.log(res)
        const { category } = res;
        if (this.radioSelect === "商品" && category) {
          const data = category.data1.data1;
          const axisX = category.data1.axisX;
          const total = data.reduce((pre, item) => pre + item, 0);
          this.categoryTotal = total;
          const categorydata = [];
          data.forEach((item, index) => {
            categorydata.push({
              name: axisX[index],
              value: item,
              percent: `${((item / total) * 100).toFixed(2)}`,
            });
          });
          this.categorydata = categorydata;
        } else {
          const data = category.data2.data1;
          const axisX = category.data2.axisX;
          const total = data.reduce((pre, item) => pre + item, 0);
          this.goodsTotal = total;
          const goodsdata = [];
          data.forEach((item, index) => {
            goodsdata.push({
              name: axisX[index],
              value: item,
              percent: `${((item / total) * 100).toFixed(2)}`,
            });
          });
          this.goodsdata = goodsdata;
        }
      });
    },
    // 根据页数返回表格数据
    renderTable(page) {
      this.tableData = this.totalData.slice(
        (page - 1) * this.pageSize,
        (page - 1) * this.pageSize + this.pageSize
      );
    },

    onCurrentChange(page) {
      this.renderTable(page);
    },

    changeCharts(label) {
      this.radioSelect = label;
      this.getCategory(label);
      if (label === "品类" && this.categorydata) {
        this.render("品类分布", this.categorydata, this.categoryTotal);
      } else {
        this.render("商品分类", this.goodsdata, this.goodsTotal);
      }
    },

    render(title, data, total) {
      this.chartData = {
        // 添加多个标题使用数组。副标题是subtext
        title: [
          {
            text: title,
            textStyle: {
              fontSize: 14,
              color: "#666",
            },
            left: 20,
            top: 20,
          },
          {
            text: "累计订单量",
            subtext: total,
            textStyle: {
              fontSize: 14,
              color: "#999",
            },
            subtextStyle: {
              fontSize: 28,
              color: "#000",
              fontWeight: 700,
            },
            //文字水平方向的对齐方式
            textAlign: "center",
            textVerticalAlign: "middle",
            x: "35.5%",
            y: "48.5%",
          },
        ],
        xAxis: {
          show: false,
        },
        yAxis: {
          show: false,
        },
        // 数据源中必须要有name属性
        legend: {
          type: "scroll",
          // 竖直排列
          orient: "vertical",
          right: 80,
          top: 110,
          // 每一个label间距
          itemGap: 20,
        },
        tooltip: {
          trigger: "item",
          // 自定义提示蒙层
          formatter: function(params) {
            const str =
              params.seriesName +
              "<br />" +
              params.marker +
              params.data.name +
              "<br />" +
              "数量：" +
              params.data.value +
              "<br />" +
              "占比：" +
              params.data.percent +
              "%";
            return str;
          },
        },
        series: [
          {
            name: title,
            type: "pie",
            data: data,
            // 图形上的文本标签，可用于说明图形的一些数据信息
            label: {
              show: true,
              position: "outter",
              formatter: (params) => {
                return params.data.name;
              },
            },
            // 圆心距离画布左上角的位置
            center: ["35%", "55%"],
            // 内半径和外半径。这里的百分号相对的是画布宽度和高度最小的那个数。
            radius: ["45%", "60%"],
            // 折线拐点标志的样式。或饼图每项处的样式
            itemStyle: {
              borderWidth: 4,
              // 每一项的边框，设置白色即是障眼法
              borderColor: "#fff",
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-view {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .bottom-view-left {
    width: 50%;
    margin-right: 10px;
    height: 520px;

    .bottom-view-charts {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px 20px;

      .echarts {
        height: 50px;
        // width: 254px;
        width: 100%;
      }

      .left-chart {
        // width: 50%;
        flex: 1;
        height: 100%;
        padding-right: 10px;
        box-sizing: border-box;

        .title {
          font-size: 14;
          color: #999;
        }

        .total-num {
          font-weight: 500;
          font-size: 24px;
          margin-top: 5px;
          margin-bottom: 10px;
        }
      }

      .right-chart {
        flex: 1;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;

        .title {
          font-size: 14;
          color: #999;
        }

        .rate-num {
          font-weight: 500;
          font-size: 24px;
          margin-top: 5px;
          margin-bottom: 10px;
        }
      }
    }

    .el-table {
      padding: 0 20px;
    }

    .page {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }

  .bottom-view-right {
    flex: 1;
    height: 520px;

    .category-rank {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: -6px 0;
    }
  }
}
</style>
