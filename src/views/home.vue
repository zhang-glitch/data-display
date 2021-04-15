<template>
  <div class="home">
    <top-view></top-view>
    <sales-view></sales-view>
    <bottom-view></bottom-view>
    <div class="map-liquidfill-wordcloud">
      <el-row :gutter="20">
        <el-col :span="19">
          <div class="left">
            <el-card shadow="hover">
              <map-view></map-view>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="right">
            <el-card shadow="hover" class="right-liquid-fill">
              <template #header>
                <p>用户月同比增长</p>
              </template>
              <template>
                <liquid-fill></liquid-fill>
              </template>
            </el-card>
            <el-card shadow="hover" class="right-word-cloud">
              <template #header>
                <p>热门搜索</p>
              </template>
              <template>
                <word-cloud></word-cloud>
              </template>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TopView from '../components/TopView/TopView.vue'
import BottomView from '../components/BottomView/BottomView.vue'
import MapView from '../components/MapView/MapView.vue'
import SalesView from '../components/SalesView/SalesView.vue'
import LiquidFill from '../components/LiquidFill.vue'
import WordCloud from '../components/WordCloud.vue'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    TopView,
    BottomView,
    MapView,
    SalesView,
    LiquidFill,
    WordCloud
  }
}
</script>

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: #eee;

    .map-liquidfill-wordcloud {
      margin: 20px 0;
      height: 600px;
    .el-row {
      height: 100%;

      .el-col {
        height: 100%;
      }
    }
    .left {
      height: 100%;

      .el-card {
        height: 100%;

        .el-card__body {
          height: 100%;
          padding: 0;
        }
      }
    }

    .right {
      height: 100%;
      box-sizing: border-box;

      .right-liquid-fill {
        margin-bottom: 30px;

        .el-card__header {
          padding: 0 20px;
        }
      }

      .right-word-cloud {

        .el-card__header {
          padding: 0 20px;
        }
      }
    }
    }
  }
</style>