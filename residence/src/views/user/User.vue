<template>
  <div class="user_box">
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 头部 添加用户 搜索用户 -->
      <div class="hander_box">
        <div class="box_left">
          <el-input placeholder="请输入搜索用户名" v-model="searchvlaue"></el-input>
          <!-- 搜索按钮 -->
          <el-button type="primary" class="btn-rigth" @click="searchUser" :disabled="searchvlaue == '' ? true : false">搜索</el-button>
        </div>
        <div class="box_rigth">
          <!-- 搜索按钮 -->
          <el-button type="warning" class="btn-rigth" @click="addUserData" :disabled="restrict === '0' ? false : true">添加用户</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="restrict" label="权限">
          <!-- 判断当前权限   0 是一级权限  1是二级权限 -->
          <template v-slot:default="scope">
            <el-tag
              :type="scope.row.restrict=='0' ? 'success':'' "
            >{{scope.row.restrict == '0' ? '一级权限' : '二级权限'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" circle @click="EditUser(scope.row.id)" :disabled="restrict === '0' ? false : true"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" circle @click="removeUser(scope.row.id)" :disabled="restrict === '0' ? false : true"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加弹出框 -->
      <el-dialog title="添加用户" :visible.sync="dialogVisibleadd " width="50%">
        <!-- 表单 -->
        <el-form label-width="auto" hide-required-asterisk>
          <el-form-item label="用户名">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" type="password"></el-input>
          </el-form-item>
          <!-- 权限选择 -->
          <el-form-item label="权限">
            <el-select v-model="restrict" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.restrict"
                :label="item.label"
                :value="item.restrict"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleOff">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleEnter">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改弹出框 -->
      <el-dialog title="修改用户" :visible.sync="dialogVisibleEdit" width="50%">
        <!-- 表单 -->
        <el-form label-width="auto" hide-required-asterisk>
          <el-form-item label="用户名">
            <el-input v-model="edidUser.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="edidUser.password" type="password"></el-input>
          </el-form-item>
          <!-- 权限选择 -->
          <el-form-item label="权限">
            <el-select v-model="edidUser.restrict" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.restrict"
                :label="item.label"
                :value="item.restrict"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EasdialogEdit = false">取 消</el-button>
          <el-button type="primary" @click="EnterdialogEdit(edidUser.id)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页 -->
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
      // 数据列表
      tableData: [],
      // 查询当前第几页
      page:1,
      // 总条数
      total:0,
      // 每一页显示多少条数据
      pageNum:8,
      //添加用户弹出框 显示隐藏
      dialogVisibleadd: false,
      //修改用户弹出框 显示隐藏
      dialogVisibleEdit: false,
      // 权限选择 下拉框数据
      options: [
        { restrict: "0", label: "一级权限" },
        { restrict: "1", label: "二级权限" }
      ],
      // 添加用户名
      username: "",
      //添加密码
      password: "",
      // 当前权限选择框的 选择 value  0 / 1
      restrict: "",
      // 搜索内容
      searchvlaue: "",
      // 修改当前的用户信息 数据
      edidUser: []
    };
  },
  created() {
    this.getUserListData();
   this.restrict = window.sessionStorage.getItem('restrict')
  },
  methods: {
    // 查询所有用户列表
    async getUserListData() {
      let res = await this.$http.get("/queryuser",{params:{page:this.page}});
      this.tableData = res.data.data;
      this.total = res.data.total
      console.log(res);
      
    },
    //分页
    handleCurrentChange(newPage){
      this.page =newPage
     this.getUserListData();
    },
    // 点击修改按钮
    async EditUser(id) {
      // 打开修改弹出框
      this.dialogVisibleEdit = true;
      // 根据id 查询 当前要修改的 用户信息
      let res = await this.$http.get("/findindexuser", { params: { id } });
      // 查询的结果 赋值给当前input框
      this.edidUser = res.data.data[0];
    },
    // 点击确认修改用户按钮
    async EnterdialogEdit(id) {
      //发起修改数据请求 参数  当前修改的value值 还是id值
      let res = await this.$http.put("/edituser", {
        username: this.edidUser.username,
        password: this.edidUser.password,
        restrict: this.edidUser.restrict,
        id: id
      });
      // 判断当前的状态码
      if (res.data.code != 200) return this.$message.error("修改失败");
      // 修改成功提示信息
      this.$message.success("修改成功");
      // 关闭当前对话框
      this.dialogVisibleEdit = false;
      // 刷新列表
      this.getUserListData();
    },
    //点击删除按钮
    async removeUser(id) {
      let removeUser = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      console.log(removeUser);

      // 如果 当前点击的不是 确认删除按钮
      if (removeUser !== "confirm") {
        return this.$message.info("取消删除用户");
      }
      //否则进行删除操作 发起网络请求
      let res = await this.$http.get("/removeuser", { params: { id } });
      // 如果 当前 状态码不等于 200
      if (res.data.code != 200) return this.$message.error("删除用户失败！");
      // 否则 提示 删除用户成功
      this.$message.success("删除用户成功");
      // 重新渲染页面
      this.getUserListData();
    },
    // 点击添加按钮 弹出添加用户框
    addUserData() {
      this.dialogVisibleadd = true;
    },
    // 点击弹出框确认按钮 添加用户
    async dialogVisibleEnter() {
      if (this.username == "" || this.password == "" || this.restrict == "")
        return this.$message.error("请填写必要的信息");

      let res = await this.$http.post("/adduser", {
        username: this.username,
        password: this.password,
        restrict: this.restrict
      });
      // 判断当前 添加成功吗
      if (res.data.code != 200) return this.$message.error("添加失败");
      // 提示信息
      this.$message.success(res.data.msg);
      // 关闭对话框
      this.dialogVisibleadd = false;
      //重新渲染 列表
      this.getUserListData();
      // 清空对话框里面的值
      (this.username = ""), (this.password = ""), (this.restrict = "");
    },
    // 点击弹出框 取消按钮 取消添加用户 关闭弹出框 清空 value
    dialogVisibleOff() {
      this.dialogVisibleadd = false;
    },
    // 点击搜索用户
    async searchUser() {
      // 发起数据请求
      let res = await this.$http.get("/searchuser", {
        params: { username: this.searchvlaue }
      });

      console.log(res);
         this.tableData = res.data.data;
      this.total = res.data.total;

    }
  }
};
</script>

<style lang="less" scoped>
.user_box {
  padding: 20px;
  .box-card {
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
  }
    .el-pagination {
  padding: 10px 0;}
}
</style>