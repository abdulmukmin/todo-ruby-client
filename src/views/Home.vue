<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'
import router from '../router'

export default {
  name: 'home',
  
  components: {
    HelloWorld
  },
  
  mounted() {
    if (!this.isLogin) {
      router.push({path: '/signin'})
    }
  },

  computed: mapState([
    'isLogin'
  ])
}
</script>
