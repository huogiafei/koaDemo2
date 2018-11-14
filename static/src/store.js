import Vue from 'vue'
import Vuex from 'vuex'
import storage from './utils/storage'

Vue.use(Vuex)

const userDataStr = storage.get('userData')
let data = ''
if (userDataStr) {
    data = JSON.stringify(userDataStr)
}

export default new Vuex.Store({
    state: {
        token: storage.get('token'),
        username: data ? data.username : ''
    },
    mutations: {
        login(state, userData) {
            let data = JSON.parse(userData)
            storage.set('token',data.token,2*3600*1000)
            state.token = data.token
            delete data.token

            storage.set('userData',data,2*3600*1000)
            state.username = data.username
        },
        logout(state) {
            storage.remove('token')
            storage.remove('userData')
            state.token = ''
            state.username = ''
        }
    },
    actions: {}
})


