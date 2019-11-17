<template>
  <div class="todo-list">
    <h2>{{ category }}</h2>
    <input type="text" v-model="newTodo">
    <button @click="addTodo">+</button>
    <li v-for="todo in todos" :key="todo.id">
      <span>{{ todo.content }}</span>
      <button @click="removeTodo(todo.id)">X</button>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      required: true,
      validator: function (value) {
        if (value.length < 5) {
          return true
        } else {
          return false
        }
      },
    }
  },
  data: function () {
    return {
      todos: [],
      newTodo: '',
    }
  },
  methods: {
    addTodo: function () {
      if (this.newTodo.length != 0) {
        this.todos.push({
          id: Date.now(),
          content: this.newTodo,
          completed: false,
        })
        this.newTodo = ''
      }
    },
    removeTodo: function (todoId) {
      this.todos = this.todos.filter(todo => {
        return todo.id !== todoId
      })
    }
  }
}
</script>

<style>
  .todo-list {
    display: inline-block;
    width: 33%;
  }
</style>