<template>
  <li>
    {{ todoItem }}
  </li>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    todoItem: String
  }
});
</script>

<style scoped></style>
