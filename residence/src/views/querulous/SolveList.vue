<template>
  <div class="solve_list_box">
    <el-card>
    <top-com>
      <span slot="title">投诉建议管理</span>
      <span slot="name">已处理列表</span>
    </top-com>

    <body-list
      :tableData="tableData"
      :page="page"
      :total="total"
      :pageNum="pageNum"
      @handleCurrentChange="handleCurrentChange"

    />
    </el-card>

  </div>
</template>

<script>
import TopCom from "@/components/common/TopCom.vue";
import BodyList from "@/components/suggested/BodyList.vue";
export default {
  data() {
    return {
      tableData: [],
      // 查询的页码
      page: 1,
      // 总条数
      total: 0,
      // 每一页显示多少条数据
      pageNum: 5
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 获取数据列表
    async getTableData() {
      let res = await this.$http.get("/untreated");


      this.tableData = res.data.data;
      this.total = res.data.total;
    },
    // 当前页码发送改变
    handleCurrentChange(newPage) {
      this.page = newPage
      this.getTableData();
    },
  },
  components: {
    TopCom,
    BodyList
  }
};
</script>

<style lang="less" scoped>

</style>