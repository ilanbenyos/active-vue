import Vue from "vue";
import Router from "vue-router";
import BackApp from "./views/BackApp.vue";
import FrontApp from "./views/FrontApp.vue";
import User from "./views/User";
import Users from "./views/Users";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/users",
      name: "Users",
      component: Users
    },{
      path: "/user/:id",
      name: "User",
      component: User,
      props: true
    },{
      path: "/front-app",
      name: "FrontApp",
      component: FrontApp
    },
      {
      path: "/back-app",
      name: "BackApp",
      component: BackApp
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
