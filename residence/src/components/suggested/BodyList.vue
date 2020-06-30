<template>
  <div>
    <el-card>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="floor" label="楼层" width="180"></el-table-column>
        <el-table-column prop="date" label="时间">
          <template v-slot:default="scope">{{scope.row.date | dateFormt}}</template>
        </el-table-column>
        <el-table-column prop="info" label="投诉建议信息"></el-table-column>
        <el-table-column prop="result" label="处理结果">
          <template v-slot:default="scope">
            <el-button
              :type="scope.row.result === '0' ? 'success' : 'danger' "
              round
              @click="handResClick(scope.row.id)"
              :disabled="restrict === '0' ? false : true"
            >{{scope.row.result === '0' ? '已处理' : '未处理'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="pageNum"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
data() {
  return {
                     // 用户权限状态
      restrict:'',
  }
},

  props: ["tableData", "total", "page", "pageNum"],
    created() {

       this.restrict = window.sessionStorage.getItem('restrict')
  },
  
  methods: {
    handleCurrentChange(newPage) {
      this.$emit("handleCurrentChange", newPage);
    },

    handResClick(id) {
      this.$emit("handResClick", id);
    }
  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 30px;
}
.el-pagination {
  padding: 10px 0;
}
</style>