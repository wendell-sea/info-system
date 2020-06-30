
<template>
  <div class="homelist_box">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>住户信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>楼栋住户信息统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="myChart" :style="{width: '800px', height: '600px'}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.getListData();
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  methods: {
    // 获取数据
    async getListData() {
      let res = await this.$http.get("/visual");

      let objData = res.data.data;
      for (let i in objData) {
        this.data.push(objData[i]);
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "楼栋住户统计" },
        tooltip: {},
        xAxis: {
          data: ["1栋", "2栋", "3栋", "5栋", "6栋", "7栋"]
        },
        yAxis: {},
        series: [
          {
            name: "当前楼栋住户",
            type: "bar",
            data: this.data
          }
        ]
      });
    }
  },
  watch: {
    data(v, l) {
      this.drawLine();
    }
  }
};
</script>

<style lang="less" scoped>
.homelist_box {
  background-color: #fff;
  padding: 20px;
  #myChart {
     padding: 20px;
 
  }
}
</style>