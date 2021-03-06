import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Signup from "./views/Signup.vue";
import Logout from "./views/Logout.vue";
import New from "./views/New.vue";
import Show from "./views/Show.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    { path: "/signup", name: "signup", component: Signup },
    { path: "/logout", name: "logout", component: Logout },
    {
      path: "/new",
      name: "New",
      component: New
    },
    {
      path: "/products/:id",
      name: "Show",
      component: Show
    }
  ]
});
