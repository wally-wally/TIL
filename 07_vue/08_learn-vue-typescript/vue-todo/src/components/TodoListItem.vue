<template>
  <li>
    <span class="item" :class="todoItemClass" @click="toggleItem">{{
      todoItem.title
    }}</span>
    <button @click="removeItem">식제</button>
  </li>
</template>

<script lang="ts">
import { Todo } from "@/App.vue";
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    // vue.js에서 prop의 type 정의는 PropType을 이용한다.
    // PropType의 제네릭으로 구체적인 타입을 넘겨줘야 한다.
    todoItem: Object as PropType<Todo>,
    index: Number
  },
  computed: {
    // computed의 특정 클래스의 return 값은 항상 type이 잘 정리되어 있어야 올바르게 타입 추론이 일어난다.
    todoItemClass(): string | null {
      return this.todoItem.done ? "complete" : null;
    }
  },
  methods: {
    toggleItem() {
      this.$emit("toggle", this.todoItem, this.index);
    },
    removeItem() {
      this.$emit("remove", this.index);
    }
  }
});
</script>

<style scoped>
.item {
  cursor: pointer;
}

.complete {
  text-decoration: line-through;
}
</style>
