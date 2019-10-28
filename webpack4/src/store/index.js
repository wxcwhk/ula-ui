import Vue from 'vue/dist/vue.js'
import vuex from 'vuex'
import dialog_store from '../components/dialog_store.js'
Vue.use(vuex)
export default  new vuex.Store({
    modules:{
        dialog:dialog_store
    }
})