<template>
  <div id="app" class="container">
    <nav-bar/>
    <alert 
      v-if="isError || isSuccess" 
    />
    <div class="row">
      <div class="col-2">
        <side-bar />
      </div>
      <div class="col-10">
        <div class="tab-content" id="v-pills-tabContent">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import Alert from './components/Alert.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name:'App',
  components: {
    NavBar,
    Alert,
    SideBar
  },

  computed: mapState([
    'isSuccess',
    'isError',

  ]),

}
</script>



