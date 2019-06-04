import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import backApp from "./storeModules/backApp";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { backApp },
  state: {
    users: [],
  },
  getters: {
    users: state => {
      return state.users;
    },
  },
  mutations: {
    setLoading(state, bool) {
      state.isLoading = bool;
    },

  },
  actions: {

  }
});
