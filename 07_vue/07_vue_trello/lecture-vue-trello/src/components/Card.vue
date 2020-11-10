<template>
  <div>
    Card
    <div v-if="loading">loading card...</div>
    <div v-else>cid: {{ cid }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      cid: 0
    }
  },
  watch: {
    '$route': {
      handler: 'fetchData',
      immediate: true // 이 옵션을 사용하면 craeted hook을 사용하지 않아도 된다.
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {
        this.cid = this.$route.params.cid
        this.loading = false
      }, 500)
    }
  },
}
</script>

<style>

</style>