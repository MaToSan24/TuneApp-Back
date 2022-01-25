import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
const BoardAdmin = () => import("../components/BoardAdmin.vue")
const RebuildSong = () => import("../views/RebuildSong.vue")
const FreePractice = () => import("../views/FreePractice.vue")
const PerfectPitch = () => import("../views/PerfectPitch.vue")

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/admin",
    name: "admin",
    component: BoardAdmin,
  },
  {
    path: "/rebuildSong",
    name: "rebuildSong",
    component: RebuildSong,
  },
  {
    path: "/freePractice",
    name: "freePractice",
    component: FreePractice,
  },
  {
    path: "/perfectPitch",
    name: "perfectPitch",
    component: PerfectPitch,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/register', '/freePractice', '/perfectPitch'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});


export default router
