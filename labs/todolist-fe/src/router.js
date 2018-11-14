import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Todo from "./views/Todo.vue";
import ComponentView from "./views/ComponentView.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/todo",
      name: "todo",
      component: Todo
    },
    {
      path: "/component-view",
      name: "Components",
      component: ComponentView
    }
  ]
});
