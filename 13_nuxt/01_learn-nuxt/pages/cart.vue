
<template>
  <div class="container">
    <h1 class="list-title">담긴 상품 목록</h1>
    <CartList />
    <div class="extra-panel">
      <button>구매하기</button>
    </div>
  </div>
</template>

<script>
import CartList from '~/components/CartList.vue';
// import { FETCH_CART_ITEMS } from '@/store';

export default {
  components: { CartList },
  // store의 actions에서 nuxtServerInit을 사용하면
  // 아래와 같이 구현할 필요가 없다.
  // async asyncData({ store }) {
  //   await store.dispatch(FETCH_CART_ITEMS);
  // },
}
</script>

<style scoped>
.container {
  margin: 2rem 10rem;
}
.list-title {
  font-weight: 700;
  font-size: 1.4rem;
}
.list-wrapper {
  margin: 0.4rem 0;
}
.list-item {
  display: flex;
}
.thumbnail {
  width: 100px;
  height: 100px;
}
.description {
  padding: 2rem 1rem;
}
.extra-panel {
  text-align: right;
  padding: 0.2rem 0;
}
</style>
