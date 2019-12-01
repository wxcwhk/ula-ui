import Vue from 'vue/dist/vue.js'
import vuex from 'vuex'

Vue.use(vuex)

import AppStore from './modules/AppStore.js';
import MenuStore from './modules/MenuStore.js';

const store = new vuex.Store({
    modules:{
        app:AppStore,
        menu:MenuStore
    }
})
export default store