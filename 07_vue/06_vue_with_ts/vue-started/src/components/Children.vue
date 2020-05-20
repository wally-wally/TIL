<template>
  <div>
    {{ parentMessage }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Children extends Vue {
  // tsconfig.json에서 strict 모드를 true로 되어 있는데
  // undefined를 포함하지 않는 class 속성은 반드시 초기화 되어야 한다는 규칙을 포함하고 있다.
  // 그래서 parentMessage 값을 초기화 해버리면 부모에서 넘겨준 parentMessage 값이 초기화 값으로 덮어씌워져 버리기 때문에
  // ?를 붙여줌으로써 parentMessage를 optional 하게 설정해야 한다.
  @Prop() parentMessage?: string;
  // 그러면 아래와 같은 오류 안 뜸
  // Property 'parentMessage' has no initializer and is not definitely assigned in the constructor.
}
</script>