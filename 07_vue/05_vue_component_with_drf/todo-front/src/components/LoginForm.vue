<template>
  <div class="login-div">

    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>

    <form v-else class="login-form" @submit.prevent="login"> <!-- .prevent를 써야 redirect 되는 기본 동작을 막을 수 있다. -->
      <!-- 에러 메세지 출력 -->
      <div v-if="errors.length" class="error-list alert alert-danger" role="alert">
        <h4>다음의 오류를 해결해주세요.</h4>
        <hr>
        <div v-for="(error, idx) in errors" :key="idx">
          {{ error }}
        </div>
      </div>

      <div class="form-group">
        <label for="id">ID</label>
        <input type="text" class="form-control" id="id" placeholder="아이디 입력" v-model="credentials.username">
      </div>
      <div class="form-group">
        <label for="password">PASSWORD</label>
        <input type="password" class="form-control" id="password" placeholder="비번 입력" v-model="credentials.password">
      </div>
      <button class="btn btn-primary">로그인</button>
    </form>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'LoginForm',
    data() {
      return {
        credentials: {
          username: '',
          password: '',
        },
        loading: false,
        errors: [],
      }
    },
    methods: {
      login() {
        if (this.checkForm()) {
          this.loading = true
          axios.get('http://127.0.0.1:8000', this.credentials)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        } else {
          console.log('로그인 검증 실패') // return이 없으면 undefined 이므로 else 구문이 실행됨
        }
      },
      checkForm() {
        this.errors = [] // 로그인 버튼 누를 때마다 빈 배열로 시작해야 한다. 누적되면 안 됨!
        if (!this.credentials.username) { // 아이디를 입력 안 했을 때
          this.errors.push("아이디를 입력해주세요")
        }
        if (this.credentials.password.length < 8) {// 패스워드 길이가 8 미만인 경우 로그인 막기
          this.errors.push("비밀번호는 8자 이상 입력해주세요.")
        }
        if (this.errors.length === 0) { // 로그인 검증을 모두 통과한 경우
          return true
        }
      }
    }
  }
</script>

<style>

</style>