<template>
  <div>
    <app-header
      :propsdata="str"
      @renew="renewStr"></app-header>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue' // 상대 경로(확장자까지 작성하자!)
// import AppHeader from '@/components/AppHeader.vue' 절대 경로

export default {
  name: 'App',
  components: {
    'app-header': AppHeader
  },
  data() {
    return {
      str: 'Header'
    }
  },
  methods: {
    renewStr() {
      this.str = 'hi'
    }
  }
}
</script>

<style>

</style>