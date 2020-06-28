<template>
  <input type="checkbox" :checked="checked" @change="change">
</template>

<script lang="ts">
import { Vue, Component, Model, Emit } from 'vue-property-decorator';

@Component
export default class MyCheckBox extends Vue {
  @Model('change', {type: Boolean}) readonly checked!: boolean; // checked 값은 부모에서 받아서 쓰는 것이기 때문에 readonly로 설정

  @Emit()
  change(event: Event) {
    return event.target.checked;
  }
}
</script>