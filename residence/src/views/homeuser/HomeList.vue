<template>
  <div class="home_list_box">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>住户信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>所有住户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 头部 添加用户 搜索用户 -->
      <div class="hander_box">
        <div class="box_left">
          <el-input placeholder="仅支持输入楼层信息查找" v-model="searchvlaue"></el-input>
          <!-- 搜索按钮 -->
          <el-button
            type="primary"
            class="btn-rigth"
            @click="searchHomeUser"
            :disabled="searchvlaue == '' ? true : false"
          >搜索</el-button>
        </div>
        <div class="box_rigth">
          <!-- 添加按钮 -->
          <el-button type="warning" class="btn-rigth" @click="addHomeUserData" :disabled="restrict === '0' ? false : true">添加用户</el-button>
        </div>
      </div>
      <!-- 列表 -->
      <el-table :data="homeUserList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="date" label="入住时间" width="250">
          <template v-slot:default="scope">{{scope.row.date | dateFormt}}</template>
        </el-table-column>
        <el-table-column prop="floor" label="楼层信息" width="180"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column label="操作">
          <!-- 删除当前住户信息 -->
          <template v-slot:default="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="removeHomeUser(scope.row.id)"
              :disabled="restrict === '0' ? false : true"
            ></el-button>
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
    <!-- 添加住户信息 弹出框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisibleadd " width="50%">
      <!-- 表单 -->
      <el-form label-width="auto" hide-required-asterisk>
        <el-form-item label="住户名">
          <el-input v-model="addUser.name" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="所住楼层">
          <el-input v-model="addUser.floor" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="addUser.phone" maxlength="11"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleOff ">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleEnter">确 定</el-button>
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
      // 所有用户信息
      homeUserList: [],
      // 当前页码
      page: 1,
      //当前总页数
      total: 0,
      //每一页显示多少条
      pageNum: 6,
      // 搜索框 值
      searchvlaue: "",
      // 统计住户信息 数据
      addUser: {
        name: "",
        floor: "",
        phone: ""
      },
      // 添加住户信息 弹出框 显示隐藏
      dialogVisibleadd: false
    };
  },
  created() {
    this.getUserInfoList();
       this.restrict = window.sessionStorage.getItem('restrict')
  },
  methods: {
    //发起数据请求 查询所有用户信息
    async getUserInfoList() {
      let res = await this.$http.get("/queryall", {
        params: { page: this.page }
      });
      this.total = res.data.total;
      this.homeUserList = res.data.data;
    },
    //当前页码发生改变触发
    handleCurrentChange(newPage) {
      // 重新赋值 要请求的页码
      this.page = newPage;
      // 重新渲染数据
      this.getUserInfoList();
    },
    //点击搜索按钮
    async searchHomeUser() {
      //判断如果当前搜索输入为空的话
      let res = await this.$http.get("/seachKey", {
        params: { key: this.searchvlaue }
      });
      console.log(res);
      
      // 先清空页面上的原数据
      this.homeUserList = []
        // 把查询到的 重新赋值
      this.homeUserList = res.data.data
       this.total = res.data.total
    },
    // 点击删除当前住户信息
    async removeHomeUser(id) {
      let removeHomeUser = await this.$confirm(
        "此操作将永久删除该住户信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      // 如果 当前点击的不是 确认删除按钮
      if (removeHomeUser !== "confirm") {
        return this.$message.info("取消删除用户");
      }
      let res = await this.$http.delete("/remove", { params: { id } });

      this.$message.success("删除用户成功");
      //重新刷新页面
      this.getUserInfoList();
    },
    //点击添加按钮
    addHomeUserData() {
      this.dialogVisibleadd = true;
    },
    // 点击取消 关闭当前添加对话框 并清空里面信息
    dialogVisibleOff() {
      this.dialogVisibleadd = false;
      this.addUser.name = "";
      this.addUser.floor = "";
      this.addUser.phone = "";
    },
    // 点击确定   发起数据请求 添加当前填写的住户信息内容
    async dialogVisibleEnter() {
      let res = await this.$http.post("/addHomeUser", this.addUser);

      if (res.data.code != 200) return this.$message.error("添加失败");

      this.$message.success("添加成功");

      this.dialogVisibleadd = false;

      this.addUser.name = "";
      this.addUser.floor = "";
      this.addUser.phone = "";

      this.getUserInfoList();
    }
  }
};
</script>

<style lang="less" scoped>
.home_list_box {
  background-color: #fff;
  padding: 20px;
  .hander_box {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .box_left {
      display: flex;
      .btn-rigth {
        margin-left: 15px;
      }
    }
  }
  .el-table {
    margin-top: 20px;
  }
  .el-pagination {
    padding: 10px 0;
  }
}
</style>
