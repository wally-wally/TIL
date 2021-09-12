<template>
  <div class="input-wrapper flex">
    <input
      type="text"
      class="search-input"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keyup.enter.exact="$emit('search')"
    />
    <!--
      참고로 testable한 코드를 위해서는 template 단에 직접 $emit()와 같이 작성하지 않고
      모두 메소드로 분리하는 것이 좋은 방식이다.
    -->
    <button class="btn" type="button" @click="$emit('search')">search</button>
  </div>
</template>

<script>
export default {
  // model: {},

  // 부모 컴포넌트에서 v-model을 사용하면 이 때 props는 무조건 value여야 한다.
  // 다른 값으로 하고 싶다면 model API를 사용하면 된다.
  props: {
    value: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.input-wrapper {
  height: 40px;
  margin: 1rem 0;
}
.search-input {
  width: 200px;
  font-size: 1.2rem;
  font-weight: 500;
}
.btn {
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
