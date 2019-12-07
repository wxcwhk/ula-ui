import Vue from 'vue/dist/vue.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import App from './App.vue'
import api from './http/index'
import i18n from './i18n'
import store from './store'
import global from '@/utils/global'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(api)

Vue.prototype.global = global
Vue.config.productionTip = false
new Vue({
    el:'#app',
    i18n,
    router,
    store,
    components:{
        App
    },
    template:"<App/>"
})