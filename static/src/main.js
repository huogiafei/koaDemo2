import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import router from './routers/router'
import Vuelidate from 'vuelidate'
import "./assets/css/common.styl"
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuelidate)

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (store.state.token == '') {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        next()
    }

    if (to.meta.title) {
        window.document.title = to.meta.title;
    } else {
        window.document.title = 'Koa Demo2'
    }
    next()
})

new Vue({
    router,
    render: h => h(App),
    store,

    mounted: function () {
    }
}).$mount('#app')
