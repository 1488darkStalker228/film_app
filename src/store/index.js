import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_KEY: 'd448071af123aced6f063258a728b028',
    currentPage: 1,
    lists: [],
    loading: true
  },

  mutations: {
    SET_CURRENT_PAGE(state, payload) {
      state.currentPage = payload.value;
    },

    SET_FILMS_LISTS(state, payload) {
      state.lists = payload;
    },

    SET_LOADING(state, payload) {
      state.loading = payload;
    }
  },

  actions: {
    async GET_FILMS_LISTS({commit}) {
      const sessionId = JSON.parse(localStorage.getItem('sessionId'));
      const url = `https://api.themoviedb.org/3/account/{account_id}/lists?api_key=${this.state.API_KEY}&language=en-US&session_id=${sessionId}&page=1`
      const req = await fetch(url);
      const res = await req.json()
      commit('SET_FILMS_LISTS', res.results);
      commit('SET_LOADING', false);
    }
  },

  getters: {
    API_KEY: (state) => state.API_KEY,
    CURRENT_PAGE: (state) => state.currentPage,
    LISTS: (state) => state.lists,
    LOADING: (state) => state.loading
  },

  modules: {}
});
