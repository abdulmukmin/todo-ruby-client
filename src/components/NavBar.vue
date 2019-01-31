<template>
  <nav class="d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" >Todo</a>
    <div v-if="!isLogin" class="btn-group" role="group">
      <button type="button" class="btn btn-info" v-on:click="this.signup">Sign Up</button>
      <button type="button" class="btn btn-info" v-on:click="this.signin">Sign In</button>
    </div>
    <button v-if="isLogin" type="button" class="btn btn-outline-danger" v-on:click="this.signOut">Sign out</button>
  </nav>
</template>

<script>
import router from '../router'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NavBar',

  methods: {
    ...mapActions([
      'signOut'
    ]),

    signin: ()=> {
      router.push({path: '/signin'})
    },

    signup: ()=> {
      router.push({path: '/signup'})
    },
  },

  computed: mapState([
    'isLogin'
  ])
}


</script>
