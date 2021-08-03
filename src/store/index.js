import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userinfo:{},
    },
    mutations:{
        setUser(state, info){
            state.userinfo = info;
        },
    }
})
export default store;