<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const str = ref("");

    str.value = "hi";

    return { str };
  },

  // 위 코드와 동일
  // data() {
  //   return {
  //     str: "",
  //   };
  // },
  // methods: {
  //   changeString() {
  //     this.str = "hi";
  //   },
  // },
});
</script>

<style scoped></style>
