<template>
  <div>
    <input @change="onInput" type="text"> <!-- @input : 입력될 때마다 "" 안의 함수가 실행 -->
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',
    methods: {
      onInput(e) {
        // console.log(e)
        // console.log(e.target.value)
        this.$emit('inputChange', e.target.value) // $emit(이벤트 이름(event name), 데이터(arguments))
      }
    }
  }
</script>

<style scoped> /* scoped : 이 vue 에만 아래 style 적용 */
  input {
    width: 75%;
  }

  div {
    text-align: center;
    margin: 20px;
  }
</style>