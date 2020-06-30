<template>
  <div class="welcome_box">
    <!-- 退出登录 -->
    <div class="esc_login">
      <el-button type="info" @click="EscLogin">退出登录</el-button>
    </div>
    <div class="welcome_rigth">
      <img src="@/assets/img/Logo.png" />
      <div class="welcome_text">"蓝鲸" 小区信息管理系统</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 点击退出登录按钮 清除当前token 并 跳转登录页面
    EscLogin() {
      //清除当前token
      window.sessionStorage.clear();
      // 跳转登录页面
      this.$router.replace("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.welcome_box {
  color: white;
}
.esc_login {
  text-align: right;
  padding: 20px;
}
.welcome_rigth {
  width: 100%;
  height: 100%;
  text-align: center;
  .welcome_text {
    font-size: 50px;
  }
}
</style>