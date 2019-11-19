<template>
  <div class="home">
    <h1>Todo with Django</h1>
    <TodoInput @createTodo="createTodo"/>
    <TodoList :todos="todos" />
  </div>
</template>

<script>
import router from '../router'
import TodoList from '@/components/TodoList'
import TodoInput from '@/components/TodoInput'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default {
  name: 'home',
  components: {
    TodoList,
    TodoInput,
  },
  data() {
    return {
      todos: [],
    }
  },
  methods: {
    checkLoggedIn() {
      this.$session.start()
      if (!this.$session.has('jwt')) {
        router.push('/login')
      }
    },
    getTodos() {
      this.$session.start()
      const token = this.$session.get('jwt')
      const requestHeader = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      const user_id = jwtDecode(token).user_id
      console.log(jwtDecode(token))
      axios.get(`http://127.0.0.1:8000/api/v1/users/${user_id}/`, requestHeader)
      .then(res => {
        console.log(res)
        this.todos = res.data.todo_set
      })
      .catch(err => {
        console.log(err)
      })
    },
    createTodo(title) {
      this.$session.start() // 세션 활성화
      const token = this.$session.get('jwt')
      const requestHeader = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      const user_id = jwtDecode(token).user_id
      const requestForm = new FormData()
      // 아래 두 줄이 Postman의 body로 들어가는 것이다.
      requestForm.append('user', user_id)
      requestForm.append('title', title)

      axios.post('http://127.0.0.1:8000/api/v1/todos/', requestForm, requestHeader)
        .then(res => {
          this.todos.push(res.data)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  // DOM 에 Vue instance 가 mount 될 때마다 checkLoggedIn 이 실행되어 로그인 여부를 체크
  mounted () { // Home Vue 인스턴스가 실행될 때 마다 실행될 내용들
    this.checkLoggedIn()
    this.getTodos()
  },
}
</script>
