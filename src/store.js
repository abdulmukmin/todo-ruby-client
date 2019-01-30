import Vue from 'vue'
import Vuex from 'vuex'
import APIUrl from './connection/api'
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,

    isError: false,
    errMessage: '',
    isSuccess: false,
    successMessage: '',
  },

  mutations: {
    doSignOut() {
      state.isLogin = false
      localStorage.clear()
    },

    doSignIn(state, token) {
      state.isLogin = true
      localStorage.setItem('acc-tkn', token)
    },

    resetAlert(state) {
      state.isError = false
      state.errMessage = ''
      state.isSuccess = false
      state.successMessage = ''
    },

    showError(state, msg) {
      state.isError = true
      state.errMessage = msg
    },

    showSuccess(state, msg) {
      state.isSuccess = true
      state.successMessage = msg
    }

  },

  actions: {
    signUp(context, data) {
      if (data.email && data.password && data.password === data.password_confirmation){
        APIUrl.post('user',{
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        })
        .then( response => {
          context.commit('showSuccess', 'Register successfully, please login')
          router.push({path: '/signin'})
        })
        .catch( error => {
          console.log(`ini error signup`, error)
          context.commit('showError', error)
        })
      } else {
        context.commit('resetAlert')
        context.commit('showError', 'Please insert valid input!')
      }
    },

    signIn(context, data) {
      if (data.email && data.password){
        APIUrl.post('signin',{
          email: data.email,
          password: data.password
        })
        .then( response => {
          console.log(`berhasil login`, response.data)
          context.commit('doSignIn', response.data)
        })
        .catch( error => {
          console.log(`ini error signin`, error)
          context.commit('showError', error)
        })
      } else {
        context.commit('resetAlert')
        context.commit('showError', 'Please insert valid input!')
      }
    },

    signOut(context, data) {
      context.commit('doSignOut')
      router.push({path: '/signin'})
    },

    errorFound(context, data) {
      context.commit('resetAlert')
      context.commit('showError', data)
    },

    successFound(context, data) {
      context.commit('resetAlert')
      context.commit('showSuccessMessage', data)
    }
  }
})
