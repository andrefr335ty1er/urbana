import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Callback from '../views/Callback.vue'
import Tracks from '../views/Tracks.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  },
  {
    path: '/tracks/:playlistID',
    name: 'Tracks',
    component: Tracks
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
