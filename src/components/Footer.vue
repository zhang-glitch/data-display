<template>
  <div class="footer">
    <el-row :gutter="20">
      <el-col :span="8">
        <a href="https://github.com/zhang-glitch">zhang-glitch的github</a>
      </el-col>
      <el-col :span="8">
        <a href="https://juejin.cn/user/2225067267204935">臻昊的掘金</a>
      </el-col>
      <el-col :span="8">
        <a href="http://39.97.212.45:3000/">js臻的个人博客</a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
  .footer {

    height: 100px;
    line-height: 100px;
    background: #000;
    opacity: .7;

    .el-col {
      text-align: center;

      a{
        text-decoration: none;
        color: #fff;
        font-size: 20px;
      }
    }

  }

</style>