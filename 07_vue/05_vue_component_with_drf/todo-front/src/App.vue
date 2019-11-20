<template>
  <div id="app" class="container">
    <div id="nav">
      <!-- <div v-if="isAuthenticated"> -->
      <div v-if="isLoggedIn">
        <router-link to="/">Home</router-link> |
        <a @click.prevent="logout" href="#">Logout</a> <!-- .prevent 로 기본적인 a 태그 동작(href로 이동시키는 기능)을 지워준다. -->
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link> <!-- router-link와 to는 정해진 이름이다. -->
      </div>
    </div>
    <div class="row justify-content-center">
      <router-view class="col-6"/> <!-- 이 곳에서 view가 출력되는 것이다. -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  // data() {
  //   return {
  //     isAuthenticated: this.$session.has('jwt')
  //   }
  // },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn
    }
  },
  // updated() {
  //   // DOM 이 re-render 될 때 다시 토큰의 존재 여부를 확인
  //   this.isAuthenticated = this.$session.has('jwt')
  // },
  methods: {
    logout() {
      // this.$session.destroy()
      this.$store.dispatch('logout')
      this.$router.push('/login') // 로그아웃 후 로그인 페이지로 이동
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
