import Vue from "vue";
import Router from "vue-router";
import CharGen from "./views/Generator";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "",
      component: CharGen
    },
  ]
});