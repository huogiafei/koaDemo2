import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/layout/Main'
import Login from '../views/auth/Login.vue'
import User from '../views/user/User'
import userRouters from "./r_users"

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '',
            component: Main,
            meta: {requireAuth: true},
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/about',
                    name: 'about',
                    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
                },
                {
                    path: '/user',
                    name: 'user',
                    component: User,
                    children: userRouters,
                },
            ]
        },
    ]
})
