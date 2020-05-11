<template>
  <div>
    <h1>iTunes 검색하기</h1>
    <br/>
    <form @submit.prevent="submit">
      <input placeholder="아티스트 이름 입력" v-model="search" ref='search' autofocus   />
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
      submit(event) {
        this.$router.push(`results/${this.search}`);
      }
  }
}
</script>

<style>
* {
  text-align: center;
}

h1 {
  padding: 20px;
}
</style>
