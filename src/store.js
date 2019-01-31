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
    doSignOut(state) {
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
    resetAlert(context) {
      context.commit('resetAlert')
    },

    signUp(context, data) {
      let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (validEmail.test(data.email) && data.password && data.password === data.password_confirmation){
        context.commit('resetAlert')
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
      context.commit('resetAlert')
      let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (validEmail.test(data.email) && data.password){
        APIUrl.post('signin',{
          email: data.email,
          password: data.password
        })
        .then( response => {
          context.commit('doSignIn', response.data.auth_token)
          context.commit('showSuccess', 'Login success..')
          router.push({path: '/'})
        })
        .catch( error => {
          context.commit('showError', error.response.data.error || 'Something wrong, call developer!')
        })
      } else {
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
      context.commit('showSuccess', data)
    },

    saveTodo(context, data) {
      let validateDate = new Date(data.duedate) > new Date()
      if (data.description && validateDate && data.priority){
        APIUrl.post('tasks',{
          priority: data.priority,
          description: data.description,
          due_date: data.duedate 
        },{
          headers:{Authorization: localStorage.getItem('acc-tkn')}
        })
        .then( response => {
          context.commit('showSuccess', "Success save data!")
          router.push({path: '/'})
        })
        .catch( error => {
          context.commit('showError', error.response.data.error || 'Something wrong, call developer!')
        })
      } else {
        context.commit('showError', 'Please insert valid input!')
      }
    },
  }
})
