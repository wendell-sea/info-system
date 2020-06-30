<template>
  <el-card>
    <!-- 头部 面包屑 搜索 添加  -->
    <top-com>
      <span slot="title">停车场车位管理</span>
      <span slot="name">公共停车卡管理</span>
      <el-button type="warning" slot="btn-add" @click="handAddCarInfo" :disabled="restrict === '0' ? false : true">添加停车卡用户信息</el-button>
    </top-com>
    <!-- 表格 -->
    <el-card>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="carnm" label="车牌"></el-table-column>
        <el-table-column prop="startdate" label="办理时间">
          <template v-slot:default="scope">{{scope.row.startdate | dateFormt}}</template>
        </el-table-column>
        <el-table-column prop="enddate" label="过期时间">
          <template v-slot:default="scope">{{scope.row.enddate | dateFormt}}</template>
        </el-table-column>
        <el-table-column prop="state" label="当前状态">
          <template v-slot:default="scope">
            <el-button
              :type="scope.row.state === '0' ? 'success' : 'danger' "
              round
            >{{scope.row.state === '0' ? '正常' : '过期'}}</el-button>
          </template>
        </el-table-column>
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
    <!-- 添加弹框 -->
    <el-dialog title="添加停车卡信息" :visible.sync="dialogVisibleShow" width="50%">
      <el-form    label-width="100px">
        <el-form-item label="持卡人姓名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>

        <el-form-item label="持卡人车牌号">
          <el-input v-model="addForm.carnm"></el-input>
        </el-form-item>

        <el-form-item label="过期时间">
          <el-date-picker v-model="addForm.enddate" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEsc">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleEnter">确 定</el-button>
      </span>
    </el-dialog>
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
      pageNum: 10,
      // 添加表单
      addForm: {
        name: "",
        carnm: "",
        enddate: ""
      },
      //添加弹框显示隐藏
      dialogVisibleShow: false
    };
  },
  created() {
    this.getTableDataList();
       this.restrict = window.sessionStorage.getItem('restrict')
  },
  methods: {
    async getTableDataList() {
      let res = await this.$http.get("/allstall", {
        params: { page: this.page }
      });
      this.tableData = res.data.data;
      this.total = res.data.total;
    },
    // 分页
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.getTableDataList();
    },
    // 点击添加按钮
    handAddCarInfo() {
      this.dialogVisibleShow = true;
    },
    // 点击取消按钮
    dialogVisibleEsc() {
      this.addForm = "";
      this.dialogVisibleShow = false;
    },
    //点击确认按钮
    async dialogVisibleEnter() {
      if (
        this.addForm.name === "" ||
        this.addForm.carnm === "" ||
        this.addForm.enddate === ""
      )
        return this.$message.error("请填写必要的信息");

      let res = await this.$http.post("/addstall", this.addForm);

      this.$message.success("添加成功");

      this.addForm = "";
      this.dialogVisibleShow = false;
      this.getTableDataList();
    }
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