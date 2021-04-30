<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

// Vue 3 에서도 Vue 2 방식의 코드 구성 가능
export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      str: "hi",
    };
  },
  methods: {
    changeStr() {
      this.str += "!";
    },
  },
});
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
