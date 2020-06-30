<template>
  <div class="eq_list_box">
    <el-card class="card——box">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>物业设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 头部 添加用户 搜索用户 -->
      <div class="hander_box">
        <div class="box_left">
          <el-input placeholder="请输入搜索设备名称" v-model="searchvlaue"></el-input>
          <!-- 搜索按钮 -->
          <el-button
            type="primary"
            class="btn-rigth"
            :disabled="searchvlaue == '' ? true : false"
            @click="searchEqInfo"
          >搜索</el-button>
        </div>
        <div class="box_rigth">
          <!-- 搜索按钮 -->
          <el-button type="warning" class="btn-rigth" @click="addEqInfo" :disabled="restrict === '0' ? false : true">添加设备信息</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="name" label="名称" width="200"></el-table-column>
        <el-table-column prop="date" label="购入时间" width="200">
          <template v-slot:default="scope">{{scope.row.date | dateFormt}}</template>
        </el-table-column>
        <el-table-column prop="state" label="当前状态" width="200">
          <!-- 判断当前状态   0 是正在使用  1是维修中 -->
          <template v-slot:default="scope">
            <el-tag
              :type="scope.row.state=='0' ? 'success':'' "
            >{{scope.row.state == '0' ? '正在使用' : '维修中'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="floor" label="设备所在楼层" width="200"></el-table-column>
        <el-table-column prop="img" label="实物">
          <template v-slot:default="scope">
            <img :src="scope.row.img" class="imgSize" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-tooltip class="item" effect="dark" content="当前状态修改" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="hadnEditClick((scope.row.id))"
                :disabled="restrict === '0' ? false : true"
              ></el-button>
            </el-tooltip>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handRemoveClick(scope.row.id)"
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
    <!-- 添加设备信息 弹出框 -->
    <el-dialog title="添加设备信息" :visible.sync="dialogVisible" width="50%">
      <!-- 表单 -->
      <el-form label-width="auto" hide-required-asterisk>
        <el-form-item label="设备名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所在楼层">
          <el-input v-model="addForm.floor"></el-input>
        </el-form-item>
        <!-- 状态选择 -->
        <el-form-item label="状态">
          <el-select v-model="addForm.state" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.state"
              :label="item.label"
              :value="item.state"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 图片选择 非必选参数 -->
        <!-- 
            action 是上传到哪儿的地址
            on-preview 是预览图片的回调
            on-remove   删除图片的回调
            list-type    当前使用组件上传文件的样式
        -->
        <el-upload
          :action="url"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEsc">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleEnter">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 当前状态修改弹出框 -->
    <el-dialog title="修改当前设备状态" :visible.sync="dialogVisibleEdit" width="50%">
      <!-- 表单 -->
      <el-form label-width="auto" hide-required-asterisk>
        <!-- 状态选择 -->
        <el-form-item label="状态">
          <el-select v-model="addForm.state" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.state"
              :label="item.label"
              :value="item.state"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEditEsc">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleEditEnter">确 定</el-button>
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
      // 所有数据列表
      tableData: [],
      //查询参数 page页
      page: 1,
      //total
      total: 0,
      //每一页显示多少条
      pageNum: 3,
      // 添加表单信息
      addForm: {
        //设备信息
        name: "",
        //楼层信息
        floor: "",
        // 当前选择框选中的值
        state: "",
        // 当前选中的图片链接地址
        img: ""
      },
      // 选择权限数据
      options: [
        {
          state: "0",
          label: "正在使用"
        },
        {
          state: "1",
          label: "维修中"
        }
      ],
      // 上传图片的链接地址
      url: "http://localhost:3000/upload",
      // 添加弹出框 显示 隐藏
      dialogVisible: false,
      // 搜索关键词
      searchvlaue: "",
      // 修改当前状态弹出框
      dialogVisibleEdit: false,
      // 修改当前状态 id
      id: ""
    };
  },
  created() {
       this.restrict = window.sessionStorage.getItem('restrict')
    this.geteqListData();
  },
  methods: {
    // 查询所有设备信息
    async geteqListData() {
      let res = await this.$http.get("/queryEqAll", {
        params: { page: this.page }
      });
      this.tableData = res.data.data;
      this.total = res.data.total;
    },
    // 点击添加设备信息按钮
    addEqInfo() {
      this.dialogVisible = true;
    },
    // 处理图片预览
    handlePreview(file) {},
    // 处理删除图片
    handleRemove() {},
    // 上传成功后的回调
    handleSuccess(response) {
      this.addForm.img = response;
    },
    // 点击确定按钮 添加信息
    async dialogVisibleEnter() {
      let res = await this.$http.post("/addData", this.addForm);
      this.dialogVisible = false;
      this.geteqListData();
    },
    // 点击取消按钮  清空信息
    dialogVisibleEsc() {
      this.dialogVisible = false;
      this.addForm = "";
    },
    //当前页码发生改变触发
    handleCurrentChange(newPage) {
      // 重新赋值 要请求的页码
      this.page = newPage;
      // 重新渲染数据
      this.geteqListData();
    },
    // 点击删除按钮 根据id 删除当前信息
    async handRemoveClick(id) {
      let removeHomeUser = await this.$confirm(
        "此操作将永久删除该设备信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      // 如果 当前点击的不是 确认删除按钮
      if (removeHomeUser !== "confirm") {
        return this.$message.info("取消删除");
      }
      let res = await this.$http.delete("/removeEq", { params: { id } });

      this.$message.success("删除设备成功");
      //重新刷新页面
      this.geteqListData();
    },
    // 点击搜索按钮 搜索
    async searchEqInfo() {
      let res = await this.$http.get("/searchEq", {
        params: { key: this.searchvlaue }
      });
      console.log(res);

      this.tableData = res.data.data;
      this.total = res.data.total;
    },
    // 当前点击修改状态
    hadnEditClick(id) {
      this.dialogVisibleEdit = true;
      this.id = id;
    },
    // 点击取消修改
    dialogVisibleEditEsc() {
      this.dialogVisibleEdit = false;
      this.addForm.state = "";
    },
    async dialogVisibleEditEnter() {
      let res = await this.$http.put("/editState", {
        state: this.addForm.state,
        id: this.id
      });

      this.dialogVisibleEdit = false;
      this.addForm.state = "";
      this.geteqListData();
      this.$message.success("修改成功");
    }
  }
};
</script>

<style lang="less" scoped>
.eq_list_box {
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
  .imgSize {
    width: 100px;
    height: 100px;
  }
  .el-table {
    margin-top: 30px;
  }
  .el-pagination {
  padding: 10px 0;
}
}
</style>