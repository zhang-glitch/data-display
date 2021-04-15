<template>
  <div class="common-card">
    <el-card shadow="hover">
      <div class="title">{{ title }}</div>
      <div class="value">{{ value | format }}</div>
      <div class="chart">
        <slot></slot>
      </div>
      <div class="line"></div>
      <div class="total">
        <slot name="footer"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
import Filters from "../../mixins/Filters";
export default {
  name: "CommonCard",
  mixins: [Filters],
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style lang="scss">
.common-card {
  .title {
    font-size: 12px;
    color: #999;
  }

  .value {
    font-size: 25px;
    color: #000;
    margin-top: 5px;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .chart {
    height: 50px;
  }

  .line {
    margin: 10px 0;
    border-top: 1px solid #eee;
  }

  .total {
    color: #666;
    font-size: 12px;
  }

  .emphasis {
    color: #000;
    font-weight: 700;
    margin-left: 5px;
  }
}

.bottom-triangle {
  width: 0;
  height: 0;
  margin-left: 6px;
  margin-top: -2px;
  border-top: 3px solid transparent;
  border-left: 3px solid transparent;
  border-bottom: 3px solid green;
  border-right: 3px solid transparent;
}

.top-triangle {
  width: 0;
  height: 0;
  margin-left: 6px;
  margin-top: 7px;
  border-top: 3px solid red;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-right: 3px solid transparent;
}
</style>
