<template>
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" v-model="password" class="form-control" placeholder="Password">
    </div>
    <div class="form-group" v-if="path === '/signup' ">
      <label for="exampleInputPassword1">Password Confirmation</label>
      <input type="password" v-model="password_confirmation" class="form-control" placeholder="Password Confirmation">
      <small class="form-text text-muted" v-if="password !== password_confirmation">Password didn't match!</small>
    </div>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" v-on:click="signClicked">{{btn}}</button>
      <button type="button" class="btn btn-primary">Cancel</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FormUser',

  data:()=> { 
    return {
      email: '',
      password: '',
      password_confirmation: '',

      path: '',
      btn: ''
    }
  },

  methods: {
    ...mapActions([
      'signUp',
      'signIn',
      'signOut',
      'resetAlert'
    ]),

    resetInput() {
      this.email = '', 
      this.password = '', 
      this.password_confirmation = ''
    },

    signClicked() {
      if (this.path === '/signin') {
        this.signIn({
          email: this.email,
          password: this.password
        })
      } else if (this.path === '/signup'){
        this.signUp({
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation          
        })
      }
    }
  },

  mounted() {
    this.path = this.$route.path
    if (this.path === '/signin') {
      this.resetInput()
      this.btn = 'Sign In'
    } else if (this.path === '/signup') {
      this.btn = 'Save'
      this.resetInput()
    }
  },

  watch: {
    '$route' (to, from) {
      this.path = to.path
      if (this.path === '/signin') {
        this.btn = 'Sign In'
        this.resetInput()
      } else if (this.path === '/signup') {
        this.btn = 'Save'
        this.resetInput()
      }
    }
  },

}
</script>
