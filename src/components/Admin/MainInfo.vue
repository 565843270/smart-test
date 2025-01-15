<template>
  <div class="dashboard">
    <el-card style="margin: 20px auto">
      <el-row>
        <el-col :span="6">
          <el-statistic title="Daily active users" :value="268500" />
        </el-col>
        <el-col :span="6">
          <el-statistic :value="138">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Ratio of men to women
                <el-icon style="margin-left: 4px" :size="12">
                  <Male />
                </el-icon>
              </div>
            </template>
            <template #suffix>/100</template>
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic title="Total Transactions" :value="outputValue" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="Feedback number" :value="562">
            <template #suffix>
              <el-icon style="vertical-align: -0.125em">
                <ChatLineRound />
              </el-icon>
            </template>
          </el-statistic>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <!-- 用户总数 -->
      <el-col :span="8">
        <el-card class="data-card" shadow="always">
          <h3>用户总数</h3>
          <div class="chart-container" ref="userChart"></div>
        </el-card>
      </el-col>

      <!-- 订单总数 -->
      <el-col :span="8">
        <el-card class="data-card" shadow="always">
          <h3>订单总数</h3>
          <div class="chart-container" ref="orderChart"></div>
        </el-card>
      </el-col>

      <!-- 收入趋势 -->
      <el-col :span="8">
        <el-card class="data-card" shadow="always">
          <h3>收入趋势</h3>
          <div class="chart-container" ref="incomeChart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "MainInfo",
  data() {
    return {
      userChart: null,
      orderChart: null,
      incomeChart: null,
    };
  },
  mounted() {
    // 初始化图表
    this.initCharts();
  },
  methods: {
    initCharts() {
      // 用户总数图表
      this.userChart = echarts.init(this.$refs.userChart);
      this.userChart.setOption({
        title: {
          text: "用户增长",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [500, 600, 700, 800, 900],
            type: "line",
            smooth: true,
          },
        ],
      });

      // 订单总数图表
      this.orderChart = echarts.init(this.$refs.orderChart);
      this.orderChart.setOption({
        title: {
          text: "订单趋势",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [300, 450, 550, 650, 750],
            type: "bar",
            barWidth: "50%",
          },
        ],
      });

      // 收入趋势图表
      this.incomeChart = echarts.init(this.$refs.incomeChart);
      this.incomeChart.setOption({
        title: {
          text: "收入趋势",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [1000, 1200, 1400, 1600, 1800],
            type: "line",
            smooth: true,
            areaStyle: {},
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.data-card {
  height: 300px;
}

.chart-container {
  width: 100%;
  height: 240px;
}
</style>
