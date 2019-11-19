<template>
  <div class="todo-list">
    <div class="card" v-for="todo in todos" :key="todo.id">
      <div class="card-body">
        <span>{{ todo.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TodoList',
    props: {
      todos: {
        type: Array,
        required: true,
      }
    }
  }
</script>

<style>

</style>