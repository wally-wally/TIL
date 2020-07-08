<template>
  <div>
    <p>before</p>
    {{ $store.getters.getterCount }} / {{ $store.state.count }}
    <hr>
    <p>after</p>
    {{ getterCount }} / {{ count }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';

@Component
export default class Count extends Vue {
  @Getter readonly getterCount!: number; // 해당 변수는 변경되면 안 되기 때문에 readonly를 붙인다.
  @State readonly count!: number;
}
</script>