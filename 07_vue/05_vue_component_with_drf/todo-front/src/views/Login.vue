<template>
  <div> <!-- template에서는 최상단에 div 태그가 항상 있어야 한다. -->
    <LoginForm/>
  </div>
</template>

<script>
  // @ 는 /src 의 alias이다.
  // import LoginForm from '../components/LoginForm' // 상대경로로 작성하는 법
  import LoginForm from '@/components/LoginForm' // 절대경로로 작성하는 법
  export default {
    name: 'login',
    components: {
      LoginForm,
    }
  }
</script>

<style>

</style>