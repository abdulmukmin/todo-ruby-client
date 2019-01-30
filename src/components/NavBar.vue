<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Todo</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link">
            <router-link to="/">Home</router-link>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <div v-if="!isLogin" class="btn-group" role="group">
        <button type="button" class="btn btn-info" v-on:click="this.signup">Sign Up</button>
        <button type="button" class="btn btn-info" v-on:click="this.signin">Sign In</button>
      </div>
      <button v-if="isLogin" type="button" class="btn btn-outline-danger">Sign out</button>
    </div>
  </nav>
</template>

<script>
import router from '../router'
import {mapState} from 'vuex'

export default {
  name: 'NavBar',

  methods: {
    signin: ()=> {
      router.push({path: '/signin'})
    },

    signup: ()=> {
      router.push({path: '/signup'})
    } 
  },

  computed: mapState([
    'isLogin'
  ])
}


</script>
