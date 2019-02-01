import Vue from 'vue'
import Vuex from 'vuex'
import APIUrl from './connection/api'
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isLogin: false,

    isError: false,
    errMessage: '',
    isSuccess: false,
    successMessage: '',
  },

  mutations: {
    doLoading(state) {
      state.isLoading = true
    },

    stopLoading(state) {
      state.isLoading = false
    },

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
    doLoading(context) {
      context.commit('doLoading')
    },

    stopLoading(context) {
      context.commit('stopLoading')
    },

    resetAlert(context) {
      context.commit('resetAlert')
    },

    signUp(context, data) {
      context.commit('doLoading')
      let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (validEmail.test(data.email) && data.password && data.password === data.password_confirmation){
        context.commit('resetAlert')
        APIUrl.post('user',{
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        })
        .then( response => {
          context.commit('stopLoading')
          context.commit('showSuccess', 'Register successfully, please login')
          router.push({path: '/signin'})
        })
        .catch( error => {
          context.commit('stopLoading')
          context.commit('showError', error)
        })
      } else {
        context.commit('stopLoading')
        context.commit('showError', 'Please insert valid input!')
      }
    },

    signIn(context, data) {
      context.commit('doLoading')
      let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (validEmail.test(data.email) && data.password){
        APIUrl.post('signin',{
          email: data.email,
          password: data.password
        })
        .then( response => {
          context.commit('stopLoading')
          context.commit('doSignIn', response.data.auth_token)
          context.commit('showSuccess', 'Login success..')
          router.push({path: '/'})
        })
        .catch( error => {
          context.commit('stopLoading')
          context.commit('showError', error.response.data.error || 'Something wrong, call developer!')
        })
      } else {
        context.commit('stopLoading')
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
      context.commit('doLoading')
      let date = new Date().getDate()
      if (date < 10) date = `0${date}`
      let month = new Date().getMonth()
      if (month+1 < 10) month = `0${month+1}`
      let year = new Date().getFullYear()
      
      let today = `${year}-${month}-${date}`
      let validateDate = new Date(data.duedate) >= new Date(today)
      if (data.description && validateDate && data.priority){
        APIUrl.post('tasks',{
          priority: data.priority,
          description: data.description,
          due_date: data.duedate 
        },{
          headers:{Authorization: localStorage.getItem('acc-tkn')}
        })
        .then( response => {
          context.commit('stopLoading')
          context.commit('showSuccess', "Success save data!")
          router.push({path: '/'})
        })
        .catch( error => {
          context.commit('stopLoading')
          context.commit('showError', error.response.data.error || 'Something wrong, call developer!')
        })
      } else {
        context.commit('stopLoading')
        context.commit('showError', 'Please insert valid input!')
      }
    },
  }
})
