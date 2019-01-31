<template>
  <div class="home">
    <list-todo 
      v-bind:todos="todos" 
      @setDone="setDone"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import ListTodo from '@/components/ListTodo.vue'
import { mapState, mapActions } from 'vuex'
import router from '../router'
import APIUrl from '../connection/api'

export default {
  name: 'home',
  data: function(){
    return {
      todos: []
    }
  },

  methods: {
    ...mapActions([
      'successFound',
      'errorFound',
    ]),

    getTodos() {
      APIUrl.get('tasks',{
        headers:{Authorization: localStorage.getItem('acc-tkn')}
      })
      .then(response => {
        this.todos = response.data
      })
      .catch(error=> {
        this.errorFound(error.response.data)
      })
    },

    setDone(id) {
      APIUrl.patch(`tasks/changestatus/${id}`,{},{
        headers:{Authorization: localStorage.getItem('acc-tkn')}
      })
      .then(response=> {
        this.getTodos()
        this.successFound('Success set done todo')
      })
      .catch(error=> {
        this.errorFound(error.response.data)
      })
    }
  },

  components: {
    ListTodo
  },
  
  mounted() {
    if (!this.isLogin) {
      router.push({path: '/signin'})
    } else {
      this.getTodos()
    }

  },

  computed: mapState([
    'isLogin'
  ])
}
</script>
