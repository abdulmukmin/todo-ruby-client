<template>
  <div>
    <div class="btn-group-vertical">
      <button type="button" class="btn btn-outline-primary" v-on:click="this.myTodo">
        My Todos
      </button>
      <button type="button" class="btn btn-outline-primary" v-on:click="this.newTodo">
        Create New
      </button>
    </div>
    <loading v-if="isLoading"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import router from '../router'
import Loading from './Loading'

export default {
  name: 'SideBar',

  components: {
    Loading,
  },

  methods: {
    newTodo: ()=> {
      router.push({path: '/create'})
    },

    myTodo: ()=> {
      router.push({path: '/'})
    },
  },

  computed: mapState([
    'isLoading'

  ]),
}
</script>
