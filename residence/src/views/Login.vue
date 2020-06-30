<template>
  <div class="login_box">
    <div class="img_box">
      <img src="@/assets/img/Logo.png" />
    </div>
    <!-- 表单区域 -->
    <el-form ref="form" label-position="top" :model="form" class="login_form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="login_button">
        <el-button type="primary" @click="handLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      }
    };
  },
  created() {},
  methods: {
    // 点击登录按钮
    async handLogin() {
      // 发起数据请求（登录）
      let res = await this.$http.get("/login", {
        params: { username: this.form.name, password: this.form.password }
      });
      console.log(res);
      
      // 提示信息
      if(res.data.code != 200) return this.$message.error('账号或密码错误')
      this.$message.success('登录成功')
      // 将token 保存在sessionStorage中 
      window.sessionStorage.setItem('token',res.data.token)
      // 把当前登录的用户状态存储sessionStorage中，方便后面用户权限使用
      window.sessionStorage.setItem('restrict',res.data.restrict)
      // 跳转欢迎界面
      this.$router.push('/welcome')
    }
  }
};
</script>

<style lang="less" scoped>
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .img_box {
    width: 200px;
    height: 130px;
    position: absolute;
    top: -70px;
    left: 50%;
    transform: translate(-50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .login_form {
    position: absolute;
    top: 10px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    .el-form-item {
      margin: 0;
    }
    .login_button {
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>