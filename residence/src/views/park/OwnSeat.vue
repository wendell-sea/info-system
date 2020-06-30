<template>
  <el-card>
    <top-com>
      <span slot="title">停车场车位管理</span>
      <span slot="name">私有车位</span>
      <el-button type="warning" slot="btn-add"    :disabled="restrict === '0' ? false : true">添加私有车位</el-button>
    </top-com>
    <!-- 表格 -->
    <el-card>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="carnm" label="车牌"></el-table-column>
        <el-table-column prop="floor" label="所住楼层"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="stallname" label="车位所在"></el-table-column>
      </el-table>
      <!--  分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="pageNum"
      ></el-pagination>
    </el-card>
  </el-card>
</template>

<script>
import TopCom from "@/components/common/TopCom.vue";
export default {
  data() {
    return {
              // 用户权限状态
      restrict:'',
      //列表数据
      tableData: [],
      //数据总条数
      total: 0,
      //获取当前第几页
      page: 1,
      // 当前一页展示今天数据
      pageNum: 10
    };
  },

  created() {
        this.getTableDataList();
           this.restrict = window.sessionStorage.getItem('restrict')
  },
  methods: {
    //
   async getTableDataList(){
    let res = await this.$http.get('/allownstall',{params:{page:this.page}})
     this.total =  res.data.total
     this.tableData  = res.data.data
   },
    // 分页
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.getTableDataList();
    },
  },

  components: {
    TopCom
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