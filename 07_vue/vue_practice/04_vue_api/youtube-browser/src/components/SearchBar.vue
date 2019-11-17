<template>
  <div>
    <input @change="onInput" type="text">
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    onInput(e) {
      this.$emit('inputChange', e.target.value)
    }
  }
}
</script>

<style scoped>
  input {
    width: 75%;
  }
  
  div {
    text-align: center;
    margin: 20px;
  }
</style>