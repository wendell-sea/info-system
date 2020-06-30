<template>
  <div class="qu_list_box">
    <el-card>
      <top-com>
        <span slot="title">投诉建议管理</span>
        <span slot="name">未处理列表</span>
      </top-com>
      <body-list
        :tableData="tableData"
        :page="page"
        :total="total"
        :pageNum="pageNum"
        @handleCurrentChange="handleCurrentChange"
        @handResClick="handResClick"
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
    // 获取列表数据
    async getTableData() {
      let res = await this.$http.get("/queryAllQu", {
        params: { page: this.page }
      });
      this.total = res.data.total;
      this.tableData = res.data.data;
    },
    // 当前页码发送改变
    handleCurrentChange(newPage) {
      // 重新赋值 要请求的页码
      this.page = newPage;
      this.getTableData();
    },
    // 点击修改处理结果
    async handResClick(id) {
      let putRes = await this.$confirm("确定已处理当前信息?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      // 如果 当前点击的不是 确认 按钮
      if (putRes !== "confirm") {
        return this.$message.info("已取消");
      }

      let res = await this.$http.put("/disposeInfo", { id });

      this.$message.success("处理成功");
      //重新刷新页面
      this.getTableData();
    }
  },
  components: {
    TopCom,
    BodyList
  }
};
</script>

<style lang="less" scoped>

</style>