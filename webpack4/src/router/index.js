import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/Error/404'
import Main from '@/views/Main';
import User from '@/views/User';
import Menu from '@/views/Menu';

Vue.use(Router)

const router = new Router({
    routes:[{
        path:'/',
        name:'首页',
        component:Home,
        children:[
            {path:'/main',name:'系统介绍',component:Main},
            {path:'/user',name:'用户管理',component:User},
            {path:'/menu',name:'菜单管理',component:Menu}
        ]
    },{
        path:'/login',
        name:'登陆',
        component:Login
    },{
        path: '/404',
        name: 'notFound',
        component: NotFound
    }]
})

router.beforeEach((to,form,next) =>{
    //登陆界面登陆成功以后，会把用户信息保存本地会话
    //存在时间为会话生命周期，页面关闭及失效
    let user = sessionStorage.getItem('user');
    if(to.path==='/login'){
        //如果访问的是登陆界面，如果用户会话信息存在，代表已经登陆过，跳转到主页
        if(user){
            next({path:'/'})
        }else{
            next()
        }
    }else{
        //如果访问的是非登陆界面，用户会话信息不存在，代表非登陆跳转到登陆界面
        if(!user){
            next({path:'/login'})
        }else{
            next()
        }
    }
})

export default router