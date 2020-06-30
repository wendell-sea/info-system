<template>
  <div class="home_box">
    <el-row>
      <el-col :span="4">
        <div class="home_left">
          <div class="left_img">
            <img class="logo_img" src="@/assets/img/Logo.png" alt  @click="handPathClick"/>
          </div>
          <!-- 选择导航 -->
          <el-menu
            unique-opened
            class="el-menu-vertical-demo"
            background-color="#303133"
            text-color="#fff"
            router
            :default-activ="$route.path"
          >
            <!-- 用户管理 -->
            <el-submenu :index="item.id + ''" v-for="item in MenusList" :key="item.id">
              <!-- 一级菜单 -->
              <template slot="title">
                <i :class="objicon[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index=" '/' + subitem.path"
                v-for="subitem in item.children"
                :key="subitem.id"
              >
                <!-- 二级菜单模板 -->
                <template slot="title">
                  <i class="el-icon-grape"></i>
                  <span>{{subitem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MenusList: [],
      objicon: {
        "1": "el-icon-user",
        "2": "el-icon-office-building",
        "3": "el-icon-attract",
        "4": "el-icon-document",
        "5": "el-icon-truck",
        "6": "el-icon-s-flag",
      }
    };
  },
  created() {
    this.getMenusData();
  },
  methods: {
    // 获取菜单栏数据
    async getMenusData() {
      let res = await this.$http.get("/menus");
      this.MenusList = res.data.data;
    },
    // 点击logo 跳转欢迎页
    handPathClick(){
      this.$router.push('/welcome')
    }
  },
  watch: {
    $route(n,l){
      if(n.path ==='/welcome'){
           // 强制刷新浏览器
           location.reload()
      }
    }
  },
};
</script>

<style lang="less" scoped>
.home_box {
  color: white;
  .logo_img {
    width: 100%;
    height: 100%;
  }
}
.el-submenu .el-menu-item {
  min-width: 0;
}
.el-menu {
  border: none;
}
</style>