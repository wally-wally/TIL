<template>
  <div id="app">
    <Count></Count>
    <button @click="increase">증가</button>
    <button @click="decrease">감소</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';
import Count from '@/components/Count.vue';

@Component({
  components: {
    Count,
  },
})
export default class App extends Vue {
  // after
  // 이 컴포넌트 내에서 store의 actions와 mutations에 작성한 함수에 바로 접근할 수 있다.
  @Action readonly increase;
  @Action readonly decrease;
  @Mutation readonly setCount;

  // before
  // increase() {
  //   this.$store.dispatch('increase');
  // }
  // decrease() {
  //   this.$store.dispatch('decrease');
  // }
}
</script>
