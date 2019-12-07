<template>
    <div class="menu-bar-container" >
    <!-- logo -->
    <div class="logo" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'">
        <img :src="this.logo" /> <div>{{collapse?'':sysName}}</div>
    </div>
    <!-- 导航菜单 -->
    <el-menu default-active="1-1" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'" @open="handleopen" @close="handleclose" @select="handleselect" :collapse="collapse">
      <!--导航菜单树组件，动态加载菜单-->
      <menu-tree v-for="item in navTree" :key = "item.menuId" :menu="item"></menu-tree> 
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{$t("sys.sysMng")}}</span>
        </template>
        <el-menu-item index="1-1" @click="$router.push('user')">{{$t("sys.userMng")}}</el-menu-item>
        <el-menu-item index="1-2" @click="$router.push('dept')">{{$t("sys.deptMng")}}</el-menu-item>
        <el-menu-item index="1-3" @click="$router.push('role')">{{$t("sys.roleMng")}}</el-menu-item>
        <el-menu-item index="1-4" @click="$router.push('menu')">{{$t("sys.menuMng")}}</el-menu-item>
        <el-menu-item index="1-5" @click="$router.push('log')">{{$t("sys.logMng")}}</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{$t("sys.sysMonitor")}}</span>
        </template>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">{{$t("sys.nav3")}}</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">{{$t("sys.nv4")}}</span>
      </el-menu-item> -->
    </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuTree from "@/components/MenuTree"
import { isURL } from '@/utils/validate'
export default {
  data() {
    return {
      sysName: "",
      logo: "",
    };
  },
  components:{
      MenuTree
  },
  methods: {
    handleopen() {
      console.log('handleopen')
    },
    handleclose() {
      console.log('handleclose')
    },
    handleselect(a, b) {
      console.log('handleselect')
    },
    /**
     * 添加动态(菜单)路由
     * @param {*} menuList 菜单列表
     * @param {*} routes 递归创建的动态(菜单)路由
     */
    addDynamicMenuRoutes (menuList = [], routes = []) {
      var temp = []
      for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].children && menuList[i].children.length >= 1) {
          temp = temp.concat(menuList[i].children)
        } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
          menuList[i].url = menuList[i].url.replace(/^\//, '')
          // 创建路由配置
          var route = {
            path: menuList[i].url,
            component: null,
            name: menuList[i].name,
            meta: {
              menuId: menuList[i].menuId,
              title: menuList[i].name,
              isDynamic: true,
              isTab: true,
              iframeUrl: ''
            }
          }
          // url以http[s]://开头, 通过iframe展示
          if (isURL(menuList[i].url)) {
            route['path'] = menuList[i].url
            route['name'] = menuList[i].name
            route['meta']['iframeUrl'] = menuList[i].url
          } else {
            try {
              // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
              // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
              let array = menuList[i].url.split('/')
              let url = array[0].substring(0,1).toUpperCase()+array[0].substring(1) + '/' + array[1].substring(0,1).toUpperCase()+array[1]  .substring(1)
              route['component'] = resolve => require([`@/views/${url}`], resolve)
            } catch (e) {}
          }
          routes.push(route)
        }
      }
      if (temp.length >= 1) {
        this.addDynamicMenuRoutes(temp, routes)
      } else {
        console.log(routes)
      }
      return routes
    },
    // 加载导航菜单
    findMenuTree() {
      this.$api.menu.findNavTree()
      .then( (res) => {
        this.$store.commit('setMenuTree', res.data)
        // 添加动态路由
        let routes = this.addDynamicMenuRoutes(res.data)
        for(var i = 0; i < routes.length; i++) {
          this.$router.options.routes[0].children.push(routes[i])
        }
        this.$router.addRoutes(this.$router.options.routes);
      })
      .catch(function(res) {
        alert(res);
      });
    }
  },
  mounted() {
    this.sysName = "I like Kitty";
    this.logo = require("@/assets/logo.png");
    this.findMenuTree()
  },
  computed:{
      ...mapState({
          appName:state=>state.app.appName,
          collapse:state=>state.app.collapse,
          navTree:state=>state.menu.menuTree
      })
  },
}
</script>

<style scoped lang="scss">
.menu-bar-container {
  .el-menu {
    position:absolute;
    top: 60px;
    bottom: 0px;
    text-align: left;
  }
  .logo {
    position:absolute;
    top: 0px;
    height: 60px;   
    line-height: 60px;
    background: #4b5f6e;
    img {
        width: 40px;
        height: 40px;
        border-radius: 0px;
        margin: 10px 10px 10px 10px;
        float: left;
    }
    div {
      font-size: 22px;
      color: white;
      text-align: left;
    }
  }
  .menu-bar-width {
    width: 200px;
  }
  .menu-bar-collapse-width {
    width: 65px;
  }
}
</style>