<template>
  <el-container class="home_container">
    <!--    头部-->
    <el-header>
      <div>
        <img src="../assets/管理.png">
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <!--      侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle_button" @click="toggleCollapse">|||</div>
<!--        菜单区域-->
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          background-color="#2A2F3C"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
          router
        >
          <!--          一级菜单-->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!--            一级菜单模板-->
            <template slot="title">
              <!--              图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--              文本-->
              <span>{{item.authName}}</span>
            </template>
            <!--            二级菜单-->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
              <template slot="title">
                <!--              图标-->
                <i class="el-icon-menu"></i>
                <!--              文本-->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--    主体-->
      <el-main>
        <router-view>

        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        //左侧菜单数据
        menulist: [],
        iconsObj: {
          '125': 'iconfont icon-user',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpin',
          '102': 'iconfont icon-danju',
          '145': 'iconfont icon-baobiao'
        },
        //是否折叠
        isCollapse:false,
        //被激活的地址
        activePath:'',
      }
    },
    created() {
      this.getMenuList(),
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    name: 'Home',
    methods: {
      //退出登录
      loginOut() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      //获取菜单数据
      async getMenuList() {
        const {data: res} = await this.$http.get('menus')
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menulist = res.data
        console.log(res)
      },
      //菜单显示折叠切换
      toggleCollapse(){
        this.isCollapse = ! this.isCollapse
      },
      //保存链接激活状态
      saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath = activePath;
      }
    }
  }
</script>

<style lang="less" scoped>
  .home_container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    img {
      width: 50px;
      height: 50px;
    }

    > div {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #333744;

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #eaedf1;
  }

  .iconfont {
    margin-right: 10px;
  }

  .toggle_button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
