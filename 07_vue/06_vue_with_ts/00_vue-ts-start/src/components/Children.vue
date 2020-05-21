<template>
  <div>
    <p>{{ alertMessage }}</p>
    {{ parentMessage }}
    <button @click=addCounter>자식에서 숫자 1 증가</button>
    <p>부모 컴포넌트에서 provide로 보낸 데이터 : {{ injectMessage }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit, Inject } from 'vue-property-decorator';

@Component
export default class Children extends Vue {
  @Prop() parentMessage?: string;

  alertMessage: string = '';

  childNum: number = 0;

  @Inject() readonly injectMessage!: string;

  @Watch('parentMessage')
  update(value: string, oldValue: string) {
    this.alertMessage = '메세지를 업데이트 했습니다.';
  }

  @Emit('addCounter')
  addCounter() {
    return ++this.childNum;
  }
}
</script>