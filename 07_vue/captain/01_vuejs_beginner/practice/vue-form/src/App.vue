<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <input id="username" type="text" v-model="username">
    </div>
    <div>
      <label for="password">pw: </label>
      <input id="password" type="password" v-model="password">
    </div>
    <!-- button의 type이 submit이면 input의 enter까지 form에서 입력을 받아 데이터를 넘길 수 있다.-->
    <!-- 이벤트 버블링과 캡쳐링 개념 참고 (https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/) -->
    <button type="submit">login</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      // event.preventDefault(event) // form의 이동, 새로고침을 막는 방법 (이 경우 함수의 인자에 event 작성해야 함)
      console.log(this.username, this.password)
      let url = 'https://jsonplaceholder.typicode.com/users'
      let data = {
        username: this.username,
        password: this.password
      }
      axios.post(url, data)
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>