<template>
  <div class="home">
    Not Done Todo :
    <list-todo 
      :todos="notDoneTodos"
      :sortBy="sortBy"
      @setDone="setDone"
      @getTodos="getTodos"
      @setSortBy="setSortBy"
    />
    Done Todo :
    <list-todo 
      :todos="doneTodos"
    />
    <todo-alert 
      v-if="showModal" @close="showModal = false"
      :todayTodos="todayTodos"
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
import TodoAlert from '../components/TodoAlert'

export default {
  name: 'home',
  data: function(){
    return {
      doneTodos: [],
      notDoneTodos: [],
      todos: [],
      todayTodos: [],
      sortBy: '',
      showModal: false
    }
  },

  components: {
    ListTodo,
    TodoAlert,
  },

  watch: {
    todayTodos: function(val) {
      if (val.length > 0) {
        this.showModal = true
      }
    }
  },

  methods: {
    ...mapActions([
      'successFound',
      'errorFound',
      'doLoading',
      'stopLoading'
    ]),

    reset() {
      this.doneTodos = [],
      this.notDoneTodos = [],
      this.todos = [],
      this.todayTodos = []
    },

    setSortBy(val) {
      this.sortBy = val
    },

    getTodos(url) {
      this.doLoading()
      APIUrl.get(url,{
        headers:{Authorization: localStorage.getItem('acc-tkn')}
      })
      .then(response => {
        this.reset()
        let date = new Date().getDate()
        if (date < 10) date = `0${date}`
        let month = new Date().getMonth()
        if (month+1 < 10) month = `0${month+1}`
        let year = new Date().getFullYear()
        
        let today = `${year}-${month}-${date}`
        let allTodos = response.data
        for (let i = 0; i < allTodos.length; i++) {
          if (allTodos[i].due_date === today && allTodos[i].status === 'not done') this.todayTodos.push(allTodos[i])
          if (allTodos[i].status === 'done') this.doneTodos.push(allTodos[i])
          if (allTodos[i].status === 'not done') this.notDoneTodos.push(allTodos[i])
        }
        this.todos = response.data
        this.stopLoading()
      })
      .catch(error=> {
        this.stopLoading()
        this.errorFound(error.response.data)
      })
    },

    setDone(id) {
      this.doLoading()
      APIUrl.patch(`tasks/changestatus/${id}`,{},{
        headers:{Authorization: localStorage.getItem('acc-tkn')}
      })
      .then(response=> {
        this.stopLoading()
        this.getTodos('tasks/duedates/asc')
        this.successFound('Success set done todo')
      })
      .catch(error=> {
        this.stopLoading()
        this.errorFound(error.response.data)
      })
    }
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
