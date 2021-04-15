<template>
  <div class="top-view">
    <el-row :gutter="20">
      <el-col :span="6">
        <total-sales></total-sales>
      </el-col>
      <el-col :span="6">
        <total-orders></total-orders>
      </el-col>
      <el-col :span="6">
        <today-users></today-users>
      </el-col>
      <el-col :span="6">
        <total-users></total-users>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TotalSales from "./TotalSales.vue";
import TotalOrders from "./TotalOrders.vue";
import TotalUsers from "./TotalUsers.vue";
import TodayUsers from "./TodayUsers.vue";
export default {
  name: "TopView",
  components: {
    TotalSales,
    TotalOrders,
    TodayUsers,
    TotalUsers,
  },
};
</script>

<style></style>
