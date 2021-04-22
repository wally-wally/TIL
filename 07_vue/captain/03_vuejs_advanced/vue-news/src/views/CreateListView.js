import ListView from './ListView.vue'
import bus from '../utils/bus.js'

export default function createListView(name) {
  return {
    // 재사용할 인스턴스(컴포넌트) 옵션들이 들어갈 자리
    name,
    created() {
      bus.$emit('start:spinner')
      this.$store.dispatch('FETCH_LIST', this.$route.name)
      // 반환 객체가 Promise 이므로 Promise chaining이 가능하다
        .then(() => {
          console.log('fetched')
          bus.$emit('end:spinner')
        })
        .catch(error => {
          console.log(error)
        })
    },
    render(createElement) {
      return createElement(ListView)
    }
  }
}