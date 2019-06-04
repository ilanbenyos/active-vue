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
    users: [{"_id":"802236572305446","img":"https://res.cloudinary.com/ilanbeyos/image/upload/v1559660016/wqahmmfnwsm4eiokewng.jpg","workTitle":"cto","userName":"popo","address":"maccabim 8, Raanana","workName":"nrg","workAddress1":"kadima","workAddress2":"apoel 15","phone":"56456456","geo":{"lat":"mock1","lng":"mock2"}},
      {"_id":"5295965651136276","img":"https://res.cloudinary.com/ilanbeyos/image/upload/v1559660021/sfuzakzlydzmnstvrgap.jpg","workTitle":"cto","userName":"ilan","address":"bet shean","workName":"youtube","workAddress1":"tlv","workAddress2":"michael st 11","phone":"0502100644","geo":{"lat":"mock1","lng":"mock2"}},
      {"_id":"771424105798251","img":"https://res.cloudinary.com/ilanbeyos/image/upload/v1559660032/yyowugi1usjcg4qjp6ud.jpg","workTitle":"ing","userName":"Adi Malkiel","address":"gershon st. 12","workName":"walla","workAddress1":"tlv","workAddress2":"david st ","phone":"0502554413"},
      {"_id":"5764267379289589","img":"https://res.cloudinary.com/ilanbeyos/image/upload/v1559660038/j2nfbuwlozbt1mmqjluh.jpg","workTitle":"CEO","userName":"Edna Berkovitch","address":"Kibbuts Yad Aemek ","workName":"nrg","workAddress1":"tlv","workAddress2":"haagana 15","phone":"0502100699"}]
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
      if(!users)return
      commit("setUsers", users);
    },
    async getUserLocation({ state, dispatch, commit }, address) {
      let str = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8`;
      try {
        let res = await axios.post(str);
        if (res.results && res.results[0] && res.results[0].geometry) {
          return res.results[0].geometry.location;
        }
        return { lat: "mock1", lng: "mock2" };
      } catch (err) {
        console.log("error getting geo", err);
      }
    },
    async createUser({ state, dispatch, commit }, user) {
      user._id = Math.random()
        .toString()
        .substring(3);
      user.geo = await dispatch("getUserLocation", user.address);

      commit("createUser", user);
      commit("setUsers");
    },
    async editUser({ state, dispatch, commit }, user) {
      user.geo = await dispatch("getUserLocation", user.address);
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
