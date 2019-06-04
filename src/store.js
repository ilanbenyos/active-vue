import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const baseApi = "http://localhost:3333";

import backApp from "./storeModules/backApp";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { backApp },
  state: {
    isLoading: false,
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
    setUsers(state, users = state.users) {
      let JsonUsers = JSON.stringify(users);
      localStorage.setItem("users", JsonUsers);
      state.users = users;
    },
    createUser(state, user) {
      state.users.push(user);
    },
    deleteUser(state, userId) {
      let idx = state.users.findIndex(i => i._id === userId);
      state.users.splice(idx, 1);
    },
    editUser(state, user) {
      let idx = state.users.findIndex(i => i._id === user._id);
      state.users[idx] = user;
    }
  },
  actions: {
    async initUsers({ commit }) {
      let users = localStorage.getItem("users");
      users = JSON.parse(users);
      commit("setUsers", users);
    },
    async getUserLocation({ state, dispatch, commit }, address) {
      let str = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8`;
      try {
        let res = await axios.post(str);
        if(res.status === 'OVER_QUERY_LIMIT') {
          debugger
          return {lat:'55555', lng:'6666666666'}
        }
        return res.results[0].geometry.location;
      } catch (err) {
        console.log('error getting geo', err);
      }
    },
    async createUser({ state, dispatch, commit }, user) {
      user._id = Math.random()
        .toString()
        .substring(3);
      user.geo = await dispatch('getUserLocation', user.address)

      commit("createUser", user);
      commit("setUsers");
    },
    async editUser({ state, dispatch, commit }, user) {
      user.geo = await dispatch('getUserLocation', user.address)
      commit("editUser", user);
      commit("setUsers");
    },
    async deleteUser({ state, dispatch, commit }, userId) {
      commit("deleteUser", userId);
      commit("setUsers");
    },
    async getUser({ state }, id) {
      // let res = await axios.post(`${baseApi}/users/getUser`);
      return state.users.find(i => i._id === id);
    },
    async getUsers({ state }) {
      // let res = await axios.post(`${baseApi}/users/getAll`);
      return state.users;
    }
  }
});
