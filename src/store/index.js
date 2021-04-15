import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API_KEY: 'd448071af123aced6f063258a728b028'
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    API_KEY: (state) => state.API_KEY
  },
  modules: {
  }
})
