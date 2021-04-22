<template>
  <div id="app">
    <tool-bar></tool-bar>
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
    <spinner :loading="loadingStatus"></spinner>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue'
import Spinner from './components/Spinner.vue'
import bus from './utils/bus.js'

export default {
  components: {
    ToolBar,
    Spinner
  },
  created() {
    console.log(process.env.VUE_APP_TITLE)
  },
  data() {
    return {
      loadingStatus: false
    }
  },
  methods: {
    startSpinner() {
      this.loadingStatus = true
    },
    endSpinner() {
      this.loadingStatus = false
    }
  },
  created() {
    bus.$on('start:spinner', this.startSpinner)
    bus.$on('end:spinner', this.endSpinner)
  },
  beforeDestroy() { // [필수!]이벤트 버스는 해당 컴포넌트에서 역할이 끝나기 전에 .$off를 해줘야 이벤트 객체가 쌓이지 않는다.
    bus.$off('start:spinner', this.startSpinner)
    bus.$off('end:spinner', this.endSpinner)
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  a {
    color: #34495e;
    text-decoration: none;
  }

  a:hover {
    color: #42b883;
    text-decoration: underline;
  }

  a.router-link-exact-active {
    text-decoration: underline;
  }

  /* Router Transition */
  .page-enter-active, .page-leave-active {
    transition: opacity .4s ease;
  }
  .page-enter, .page-leave-to {
    opacity: 0;
  }
</style>
