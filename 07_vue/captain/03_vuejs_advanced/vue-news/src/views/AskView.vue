<template>
  <div>
    <list-item></list-item>
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue'
import ListMixin from '../mixins/ListMixin.js'

export default {
  components: {
    ListItem
  },
  mixins: [ListMixin]
  // computed: {
    // if) getters의 함수명을 그대로 쓰고 싶다면
    // ...mapGetters(['fetchedAsk'])

    // #3) 위에서 getters와 다른 이름인 askItems로 사용하고 싶을 때
    // ...mapGetters({
    //   askItems: 'fetchedAsk'
    // }),

    // #2
    // ...mapState({
    //   fetchedAsk: state => state.ask
    // }),

    // #1
    // ask() {
    //   return this.$store.state.ask
    // }
  // },
  // created() {
  //   this.$store.dispatch('FETCH_ASK')
  // }
}
</script>