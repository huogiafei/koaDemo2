import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import router from './routers/router'

import "./assets/css/common.styl"

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if(to.meta.title){
        window.document.title = to.meta.title;
    }else{
        window.document.title = 'Koa Demo2'
    }
  next()
})

new Vue({
    router,
    render: h => h(App),
    mounted:function(){
    }
}).$mount('#app')
