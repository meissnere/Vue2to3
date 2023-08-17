import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import ApiComponent from "./components/WeatherAPI.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: "/weatherAPI",
    name: "ApiComponent",
    component: ApiComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
