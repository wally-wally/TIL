<template>
  <div id="app">
    {{ $store.state }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  created() {
    console.log(this.$store);
    this.$store.dispatch('setRootData', 'test');
    this.$store.dispatch('ModuleA/setRootData', 'newTest');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
