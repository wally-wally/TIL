<template>
  <div>
    <label for="todo-input">오늘 할 일 : </label>
    <input id="todo-input" type="text" :value="item" @input="handleInput" />
    <button @click="addTodo" type="button">추가</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VueEvent } from "@/types/index";

export default Vue.extend({
  props: {
    item: {
      type: String,
      required: true
    }
  },
  methods: {
    handleInput(event: VueEvent.Input<HTMLInputElement>) {
      // if (!event.target) {
      //   return;
      // }
      // const eventTarget = event.target as HTMLInputElement;
      this.$emit("input", event.target.value);
    },
    addTodo() {
      this.$emit("add");
    }
  }
});
</script>

<style scoped></style>
