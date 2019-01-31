<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">
          <button type="button" class="btn btn-link" @click="sortDescription()">Description</button>
        </th>
        <th scope="col">
          <button type="button" class="btn btn-link" @click="sortDueDate()">Due Date</button>
        </th>
        <th scope="col">
          <button type="button" class="btn btn-link" @click="sortPriority()">Priority</button>
        </th>
        <th scope="col">Status</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(todo, index) in todos" :key="index">
        <th scope="row">{{index + 1}}</th>
        <td>{{todo.description}}</td>
        <td>{{todo.due_date}}</td>
        <td>{{convertPriority(todo.priority)}}</td>
        <td>{{todo.status}}</td>
        <td>
          <button type="button" class="btn btn-outline-success"
            v-if="todo.status === 'not done'"
            @click="setDone(todo.id)" 
          >
            Set Done
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ListTodos',

  data: function(){
    return {
      
    }
  },

  props: ['todos', 'sortBy'],

  methods: {
    convertPriority(value) {
      if (value === 0) {
        return "None"
      } else if (value === 1) {
        return "Low"
      } else if (value === 2) {
        return "Medium"
      } else if (value === 3) {
        return "High"
      }
    },

    setDone(value) {
      this.$emit('setDone', value)
    },

    sortDueDate() {
      if(this.sortBy !=='dueDateAsc') {
        this.$emit('setSortBy', 'dueDateAsc')
        this.$emit('getTodos', 'tasks/duedates/asc')
      } else if (this.sortBy ==='dueDateAsc'){
        this.$emit('setSortBy', 'dueDateDesc')
        this.$emit('getTodos', 'tasks/duedates/desc')
      }
    },

    sortPriority() {
      if(this.sortBy !=='priorityAsc') {
        this.$emit('setSortBy', 'priorityAsc')
        this.$emit('getTodos', 'tasks/priority/asc')
      } else if (this.sortBy ==='priorityAsc'){
        this.$emit('setSortBy', 'priorityDesc')
        this.$emit('getTodos', 'tasks/priority/desc')
      }
    },

    sortDescription() {
      if(this.sortBy !=='descriptionAsc') {
        this.$emit('setSortBy', 'descriptionAsc')
        this.$emit('getTodos', 'tasks/description/asc')
      } else if (this.sortBy ==='descriptionAsc'){
        this.$emit('setSortBy', 'descriptionDesc')
        this.$emit('getTodos', 'tasks/description/desc')
      }
    },
  },
}
</script>
