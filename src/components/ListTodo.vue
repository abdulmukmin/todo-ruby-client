<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Description</th>
        <th scope="col">Due Date</th>
        <th scope="col">Priority</th>
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

  props: ['todos'],

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
    }
  },
}
</script>
