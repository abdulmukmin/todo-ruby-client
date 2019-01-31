<template>
  <div class="btn-group-vertical">
    <button type="button" class="btn btn-outline-primary" v-on:click="this.myTodo">
      My Todos
    </button>
    <button type="button" class="btn btn-outline-primary" v-on:click="this.newTodo">
      Create New
    </button>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'SideBar',

  methods: {
    newTodo: ()=> {
      router.push({path: '/create'})
    },

    myTodo: ()=> {
      router.push({path: '/'})
    },
  }
}
</script>
