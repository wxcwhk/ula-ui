import Vue from 'vue/dist/vue.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import App from './App.vue'
import api from './http/index'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(api)

new Vue({
    el:'#app',
    router,
    components:{
        App
    },
    template:"<App/>"
})