<template>
  <div class="eq_info_box">
    <el-card class="card_box">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>物业设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备维修记录</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 头部 添加用户 搜索用户 -->
      <div class="hander_box">
        <div class="box_left">
          <el-input placeholder="请输入搜索设备名称"></el-input>
          <!-- 搜索按钮 -->
          <el-button type="primary" class="btn-rigth">搜索</el-button>
        </div>
        <div class="box_rigth">
          <!-- 搜索按钮 -->
          <el-button type="warning" class="btn-rigth" @click="AdddialogVisib" :disabled="restrict === '0' ? false : true">添加维修记录</el-button>
        </div>
      </div>
      <!-- 列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="name" label="设备名称" width="200"></el-table-column>
        <el-table-column prop="date" label="开始维修时间" width="200">
          <template v-slot:default="scope">{{scope.row.date | dateFormt}}</template>
        </el-table-column>
        <el-table-column prop="info" label="维修问题信息"></el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot:default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handEditInfo(scope.row.id)"
              :disabled="restrict === '0' ? false : true"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handRemoveInfo(scope.row.id)"
              :disabled="restrict === '0' ? false : true"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tatol"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="pageNum"
      ></el-pagination>
    </el-card>
    <!-- 添加设备维修记录弹出框 -->
    <el-dialog title="添加设备维修信息" :visible.sync="dialogVisibleAddShow" width="50%">
      <!-- 表单 -->
      <el-form label-width="auto" hide-required-asterisk>
        <el-form-item label="设备名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="维修问题信息">
          <el-input type="textarea" placeholder="请简要描述维修问题" v-model="addForm.info"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAddEsc">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleAddEnter">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改设备维修记录 -->
    <el-dialog title="修改用户" :visible.sync="dialogVisibleEdit" width="50%">
      <!-- 表单 -->
      <el-form label-width="auto" hide-required-asterisk>
        <el-form-item label="设备昵称">
          <el-input v-model="editInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="维修时间">
           <el-date-picker v-model="editInfo.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="问题信息">
          <el-input v-model="editInfo.info" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEditEsc">取 消</el-button>
        <el-button type="primary"  @click="dialogVisibleEditEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
            // 用户权限状态
      restrict:'',
      tableData: [],
      // 查询页面
      page: 1,
      // 总页数
      tatol: 0,
      //每一页显示多少条
      pageNum: 3,
      // 添加弹出框显示隐藏
      dialogVisibleAddShow: false,
      // 添加表单信息
      addForm: {
        name: "",
        date: "",
        info: ""
      },
      // 修改信息提示框
      dialogVisibleEdit: false,
      // 修改表单信息
      editInfo: {
        name: '',
        data:'',
        info:'',
        id:''
      }
    };
  },
  created() {
       this.restrict = window.sessionStorage.getItem('restrict')
    this.getTableData();
  },
  methods: {
    // 获取所有数据
    async getTableData() {
      let res = await this.$http.get("/queryMaInfo", {
        params: { page: this.page }
      });
      this.tatol = res.data.tatol;
      this.tableData = res.data.data;
    },
    //当前页码发生改变触发
    handleCurrentChange(newPage) {
      // 重新赋值 要请求的页码
      this.page = newPage;
      // 重新渲染数据
      this.getTableData();
    },
    // 点击添加记录按钮
    AdddialogVisib() {
      this.dialogVisibleAddShow = true;
    },
    // 点击取消按钮 清空当前输入框内容
    dialogVisibleAddEsc() {
      this.dialogVisibleAddShow = false;
      this.addForm = "";
    },
    // 点击确定添加记录 发起数据请求
    async dialogVisibleAddEnter() {
      if (this.addForm.name == "" || this.addForm.info == "")
        return this.$message.error("请填写必要的信息");
      let res = await this.$http.post("/addMaInfo", {
        name: this.addForm.name,
        info: this.addForm.info
      });
      this.dialogVisibleAddShow = false;
      this.addForm = "";
      this.getTableData();
    },
    // 点击删除按钮
    async handRemoveInfo(id) {
      let remove = await this.$confirm("此操作将永久删除该该信息, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      // 如果 当前点击的不是 确认删除按钮
      if (remove !== "confirm") {
        return this.$message.info("取消删除");
      }
      let res = await this.$http.delete("/removeMaInfo", { params: { id } });

      this.$message.success("删除设备成功");
      //重新刷新页面
      this.getTableData();
    },
    //点击修改按钮
    handEditInfo(id) {
      this.dialogVisibleEdit = true;
      this.editInfo.id = id
    },
    //点击取消
    dialogVisibleEditEsc(){
      this.dialogVisibleEdit = false
      this.editInfo = ''
    },
    // 点击确定按钮
   async dialogVisibleEditEnter(){
      if(this.editInfo.name == '' ||  this.editInfo.info == '' || this.editInfo.date == '')return this.$message.error("请填写必要的信息");

      let res = await this.$http.put('/editMaInfo', this.editInfo)
      this.dialogVisibleEdit = false
      this.editInfo = ''
      this.$message.success("修改成功");
      this.getTableData();

      
       
    }
  }
};
</script>

<style lang="less" scoped>
.eq_info_box {
  background-color: #fff;
  .hander_box {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    .box_left {
      display: flex;
      .btn-rigth {
        margin-left: 15px;
      }
    }
  }
  .el-table {
    margin-top: 30px;
  }
  .el-pagination {
  padding: 10px 0;
}
}
</style>