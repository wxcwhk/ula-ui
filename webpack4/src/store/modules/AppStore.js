export default {
    state:{
        appName:"I like kitty",  //应用名称
        collapse:false,    //导航栏收缩状态
        menuRouterLoaded:false  // 菜单和路由是否已经加载
    },
    getters:{
        collapse(state){
            return this.collapse;
        }
    },mutations:{
        onCollapse(state){
            state.collapse = !state.collapse;
        },menuRouteLoaded(state, menuRouteLoaded){  // 改变菜单和路由的加载状态
            state.menuRouteLoaded = menuRouteLoaded;
        }
    },actions:{

    }
}