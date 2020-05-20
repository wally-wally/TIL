<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Message></Message>
    <hr>
    <Children :parentMessage="message"></Children>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import Message from '@/components/Message.vue';
import Children from '@/components/Children.vue';

@Component({
  components: {
    Children,
    Message,
  },
})
export default class Home extends Vue {
  // 동적인 데이터 props로 넘기는 방법
  // template 단에서 :을 붙이고 변수명을 작성해서 데이터를 넘기면 된다.
  message: string = 'hello world';
}
</script>
