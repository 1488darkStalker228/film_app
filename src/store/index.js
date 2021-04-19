import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_KEY: 'd448071af123aced6f063258a728b028',
    current_page: 1
  },

  mutations: {
    SET_CURRENT_PAGE(state, payload) {
      state.current_page = payload.value;
    }
  },

  actions: {},

  getters: {
    API_KEY: (state) => state.API_KEY,
    CURRENT_PAGE: (state) => state.current_page
  },

  modules: {}
});
