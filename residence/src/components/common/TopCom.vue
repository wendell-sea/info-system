<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><slot name="title"></slot></el-breadcrumb-item>
      <el-breadcrumb-item><slot name="name"></slot></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 添加用户 搜索用户 -->
    <div class="hander_box">
      <div class="box_left">
        <el-input placeholder="请输入内容"></el-input>
        <!-- 搜索按钮 -->
        <el-button type="primary" class="btn-rigth">搜索</el-button>
      </div>
          <!-- 添加按钮 -->
       <div class="box_rigth"><slot name="btn-add"></slot></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
    .hander_box {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    .box_left {
      display: flex;
      .btn-rigth {
        margin-left: 15px;
      }
    }
  }

</style>