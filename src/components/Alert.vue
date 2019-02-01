<template>
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong> {{errMessage || successMessage}}</strong>
    <button type="button" class="close" data-dismiss="alert" v-on:click="resetAlert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Alert',

  computed: mapState([
    'errMessage',
    'successMessage'
  ]),

  methods: {
    ...mapActions([
      'resetAlert'
    ])
  }
}
</script>
