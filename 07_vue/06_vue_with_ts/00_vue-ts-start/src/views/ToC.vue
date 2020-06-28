<template>
  <div>
    <h1>약관</h1>
    <p>
      이곳에는 동의를 필요하는 어떠한 약관 내용이 들어갑니다.
    </p>
    <MyCheckBox v-model="checked" @change="change"></MyCheckBox>
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MyCheckBox from '@/components/MyCheckBox.vue';

@Component({
  components: {
    MyCheckBox,
  },
})
export default class ToC extends Vue {
  checked: boolean = false;
  text: string = '동의하지 않습니다.';

  change(checked: boolean) {
    this.checked = checked;
    this.text = checked ? '동의합니다.' : '동의하지 않습니다.';
  }
}
</script>