<template>
  <div class="todo-list">
    <div class="card" v-for="todo in todos" :key="todo.id">
      <div class="card-body">
        <span @click="updateTodo(todo)" :class="{ complete: todo.completed }">{{ todo.title }}</span>
        <span @click="deleteTodo(todo)">🗑️</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'TodoList',
    props: {
      todos: {
        type: Array,
        required: true,
      }
    },
    computed: {
      requestHeader: function() {
        return this.$store.getters.requestHeader
      }
    },
    methods: {
      deleteTodo(todo) { // 인자 todo가 있으므로 decode할 필요가 없다.
        // this.$session.start() // 세션 활성화
        // const token = this.$session.get('jwt')
        // const requestHeader = {
        //   headers: {
        //     Authorization: 'JWT ' + token
        //   }
        // }
        axios.delete(`http://127.0.0.1:8000/api/v1/todos/${todo.id}/`, this.requestHeader)
          .then(res => {
            console.log(res)
            const targetTodo = this.todos.find(function(el) {
              return el === todo
            })
            const idx = this.todos.indexOf(targetTodo)
            if (idx > -1) {
              this.todos.splice(idx, 1)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      updateTodo(todo) {
        // this.$session.start() // 세션 활성화
        // const token = this.$session.get('jwt')
        // const requestHeader = {
        //   headers: {
        //     Authorization: 'JWT ' + token
        //   }
        // }
        const requestForm = new FormData()
        // 수정 전 기존 로직에서 데이터를 보내고 FormData에 담아야 한다.
        requestForm.append('id', todo.id)
        requestForm.append('title', todo.title)
        requestForm.append('user', todo.user)
        requestForm.append('completed', !todo.completed) // 완료 상태가 반대가 되어야 하므로 !를 붙여 준다.

        axios.put(`http://127.0.0.1:8000/api/v1/todos/${todo.id}/`, requestForm, this.requestHeader)
          .then(res => {
            console.log(res)
            todo.completed = !todo.completed
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style>
  .complete {
    text-decoration: line-through;
    color: rgb(112, 112, 112);
  }
</style>