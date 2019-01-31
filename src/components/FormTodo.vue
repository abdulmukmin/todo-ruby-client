<template>
  <form>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Description</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="Descritption of todo.." v-model="description">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Due Dates</label>
      <div class="col-sm-3">
        <input type="date" class="form-control" :min="this.today()" v-model="duedate">
      </div>
      <small class="form-text text-muted">*Minimum date is today</small>
    </div>
    <div class="form-group row active">
      <label class="col-sm-2 col-form-label">Priority</label>
      <div class="col-sm-3">
        <select class="form-control" v-model="priority">
          <option value="0">None</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </div>
    </div>
    <div class="d-flex justify-content-around">
      <div class="form-group row">
        <button type="button" class="btn btn-primary" @click="save">Save</button>
        <button type="button" class="btn btn-secondary ml-2" @click="cancel">Cancel</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '../router'


export default {
  name: 'Form_Todo',
  data:()=> {
    return {
      description: '',
      duedate: '',
      priority: '0',
    }
  },

  mounted() {
    if (!this.isLogin) {
      router.push({path: '/signin'})
    }
  },

  computed: mapState([
    'isLogin'
  ]),

  methods: {
    ...mapActions([
      'saveTodo'
    ]),

    save() {
      this.saveTodo({
        description: this.description,
        duedate: this.duedate,
        priority: this.priority,
      })
    },

    cancel() {
      router.push({part: '/'})
    },

    today: ()=> {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1;
      let yyyy = today.getFullYear();
      if(dd<10){
              dd='0'+dd
          } 
          if(mm<10){
              mm='0'+mm
          } 
      today = yyyy+'-'+mm+'-'+dd;
      return today
    }
  }
}
</script>
