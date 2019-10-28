import Vue from 'vue/dist/vue.js'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n)

//注册i18n实例并引入语言文件，文件格式等解析

const i18n = new VueI18n({
    locale:'zh',
    messages:{
        'zh': require('@/assets/languages/zh.json'),
        'en': require('@/assets/languages/en.json')
    }
})

export default i18n