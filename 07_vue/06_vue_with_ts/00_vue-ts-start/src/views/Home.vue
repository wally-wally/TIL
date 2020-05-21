<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Message></Message>
    <hr>
    <Children :parentMessage="message" @addCounter="addCounter"></Children>
    <button @click="changeMessage">메세지를 바꿔줄게요.</button>
    <p>@Emit으로 부모 컴포넌트로 보낸 증가시킨 숫자 : {{ parentNum }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import Message from '@/components/Message.vue';
import Children from '@/components/Children.vue';

@Component({
  components: {
    Message,
    Children,
  },
})
export default class Home extends Vue {
  message: string = 'hello world';

  parentNum: number = 0;

  // @Provide() injectMessage: string = 'provide & inject'; // 보낸 속성(변수명)이 부모와 자식 컴포넌트에서 동일한 경우
  @Provide('injectMessage') msg: string = 'provide & inject'; // 다른 경우

  changeMessage() {
    this.message = 'change';
  }

  addCounter(childNum: number) {
    this.parentNum = childNum;
  }
}
</script>