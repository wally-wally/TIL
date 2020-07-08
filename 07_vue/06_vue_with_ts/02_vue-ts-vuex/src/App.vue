<template>
  <div id="app">
    <Count></Count>
    <button @click="increase">증가</button>
    <button @click="decrease">감소</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Count from '@/components/Count.vue';

@Component({
  components: {
    Count,
  },
})
export default class App extends Vue {
  increase() {
    this.$store.dispatch('increase');
  }
  decrease() {
    this.$store.dispatch('decrease');
  }
}
</script>
