import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userDataStr = localStorage.getItem('userData')
let data = ''
if(userDataStr){
    data = JSON.stringify(userDataStr)
}

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        username:data ? data.username:''
    },
    mutations: {
        login(state,userData) {
            localStorage.setItem('token', JSON.parse(userData).token)
            localStorage.setItem('userData',userData)
            state.token = JSON.parse(userData).token
            state.username =  JSON.parse(userData).username
        },
        logout(state) {
            localStorage.setItem('token','')
            state.token = ''
        }
    },
    actions: {}
})
