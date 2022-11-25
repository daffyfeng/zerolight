<template>
  <el-row class="home-row">
    <el-col :span="16">
      <TrendChart :type="'今日'"></TrendChart>
    </el-col>
    <el-col :span="8">
      <Top10Chart :type="'今日'"></Top10Chart>
    </el-col>
  </el-row>
  <el-row class="home-row">
    <el-col :span="16">
      <TrendChart></TrendChart>
    </el-col>
    <el-col :span="8">
      <Top10Chart></Top10Chart>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import TrendChart from './components/TrendChart.vue';
import Top10Chart from './components/Top10Chart.vue';


</script>

<style lang="scss">
.home-row {
  height: 50%;
}
</style>
