import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const baseApi = "http://localhost:3333";

import backApp from "./storeModules/backApp";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { backApp },
  state: {
    isLoading:false,
    users: []
  },
  getters: {
    isLoading: state => {
      return state.isLoading;
    },
    users: state => {
      return state.users;
    }
  },
  mutations: {

    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setUsers(state,users= state.users) {
      let JsonUsers = JSON.stringify(users)
      localStorage.setItem('users',JsonUsers)
      state.users = users;
    },
    createUser(state, user) {
      state.users.push(user);
    },
    deleteUser(state, userId) {
      debugger
      let idx = state.users.findIndex(i => i._id === userId);
      state.users.splice(idx,1)
    },
    editUser(state, user) {
      let idx = state.users.findIndex(i => i._id === user._id);
      state.users[idx] = user;
    },
  },
  actions: {
    initUsers({commit}){
      let users = localStorage.getItem('users')
      users = JSON.parse(users)
      commit("setUsers", users);

    },
    async createUser({ state, dispatch, commit }, user) {
      user._id = Math.random()
        .toString()
        .substring(3);
      // let res = await axios.post(`${baseApi}/users/create`,{user});

      commit("createUser", user);
      commit("setUsers");

    },
    async editUser({ state, dispatch, commit }, user) {
      commit("users", user);
      commit("setUsers");

    },
    async deleteUser({ state, dispatch, commit }, userId) {
      commit("deleteUser", userId);
      commit("setUsers");

    },
    async getUser({ state },id) {
      // let res = await axios.post(`${baseApi}/users/getUser`);
      return state.users.find(i=> i._id === id)
    },
    async getUsers({ state }) {
      // let res = await axios.post(`${baseApi}/users/getAll`);
      return state.users
    }
  }
});
