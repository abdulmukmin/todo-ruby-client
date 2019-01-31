<template>
  <div class="home">
    <list-todo 
      :todos="todos"
      :sortBy="sortBy"
      @setDone="setDone"
      @getTodos="getTodos"
      @setSortBy="setSortBy"
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
      todos: [],
      sortBy: ''
    }
  },

  methods: {
    ...mapActions([
      'successFound',
      'errorFound',
    ]),

    setSortBy(val) {
      this.sortBy = val
    },

    getTodos(url) {
      APIUrl.get(url,{
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
      this.getTodos('tasks/duedates/asc')
      this.sortBy = 'dueDateAsc'
    }

  },

  computed: mapState([
    'isLogin'
  ])
}
</script>
