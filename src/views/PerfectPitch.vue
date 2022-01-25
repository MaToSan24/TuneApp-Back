<template>

  <div>
    <div v-if="!currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/register" class="nav-link">
          <font-awesome-icon icon="user-plus" /> Sign Up
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          <font-awesome-icon icon="sign-in-alt" /> Login
        </router-link>
      </li>
    </div>

    <div v-if="currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link">
          <font-awesome-icon icon="user" />
          {{ currentUser.username }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" /> LogOut
        </a>
      </li>
    </div>
  </div>

  <div class="homeWrapper">

    <div class="card col-7" style="display: flex; justify-content: space-around; align-items: center; flex-direction: column; height: 50rem">
      
      <div style="text-align-last: center;">
        <h1>Welcome to Perfect Pitch Mode</h1>
        <img alt="TuneApp Logo" :src="TuneAppLogo" height="100" class="mt-5" />
      </div>

      <div style="display: flex; flex-direction: column; align-items: center;">
        <router-link to="/">
          <Button class="p-button-info">Home</Button>
        </router-link>
      </div>
    </div>

  </div>

</template>

<script>
import Button from 'primevue/button'
import TuneAppLogo from "@/assets/TuneAppLogoCropped.png"
// import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Button,
  },
  data() {
    return {
      TuneAppLogo: TuneAppLogo
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      // this.$router.push('/login');
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    // showAdminBoard() {
    //   if (this.currentUser && this.currentUser['roles']) {
    //     return this.currentUser['roles'].includes('ROLE_ADMIN');
    //   }

    //   return false;
    // },
    // showModeratorBoard() {
    //   if (this.currentUser && this.currentUser['roles']) {
    //     return this.currentUser['roles'].includes('ROLE_MODERATOR');
    //   }

    //   return false;
    // }
  }  
}
</script>

<style>

.homeWrapper {
  display: flex;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
  align-content: space-between;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.p-button {
  place-content: center;
}

</style>
