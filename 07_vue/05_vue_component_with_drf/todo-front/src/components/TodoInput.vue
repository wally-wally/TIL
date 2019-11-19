<template>
  <div class="todo-input">
    <form class="input-group mb-3" @submit.prevent="createTodo"> <!-- submit 시에는 prevent를 꼭 쓰자! -->
      <input type="text" class="form-control" v-model="title">
      <button type="submit" class="btn btn-primary">+</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'TodoInput',
    data() {
      return {
        title: ''
      }
    },
    methods: {
      createTodo() {
        this.$emit('createTodo', this.title)
        this.title = '' // title을 보낸 후 empty string으로 초기화 시켜야 한다.
      }
    }
  }
</script>

<style>

</style>