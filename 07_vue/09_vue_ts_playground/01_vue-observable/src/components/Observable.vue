<template>
  <section>
    <h2>{{ value }}</h2>
    <div class="btn-wrapper">
      <button @click="addValue">+</button>
      <button @click="subtractValue">-</button>
      <button @click="multipleValue">X</button>
    </div>
    <hr />
    <form @submit.prevent="changeValue(customNumber)">
      <input type="number" v-model.number="customNumber" pattern="[0-9]+" />
      <button type="submit">change!</button>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mutations } from "@/store";

export default Vue.extend({
  name: "Observable",
  data() {
    return {
      customNumber: 1,
    };
  },

  computed: {
    value(): number {
      return this.$store.value;
    },
  },

  methods: {
    ...mutations,
  },
});
</script>

<style scoped lang="scss">
.btn-wrapper {
  button {
    padding: 2px 10px;
  }
}
</style>
