import axios from 'axios'
import store from './store'
import router from './routers/router'

axios.interceptors.request.use((config) => {
        if (store.state.token) {
            config.headers.Authorization = `Bearer ${store.state.token}`
        }
        return config;
    }, err => {
        return Promise.reject(err);
    }
)

axios.interceptors.response.use(res => res, error => {
    if(error.response){
        switch(error.response.status){
            case 401:
                console.log(error.response.status)
                store.commit('logout');
                router.replace({
                    path:'/login',
                    query:{redirect:router.currentRoute.fullPath}
                })
        }
    }
})
