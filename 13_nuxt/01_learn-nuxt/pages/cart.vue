
<template>
  <div class="container">
    <h1 class="list-title">담긴 상품 목록</h1>
    <div class="list-wrapper">
      <ul>
        <li v-for="cart in carts" :key="cart.id" class="list-item">
          <img class="thumbnail" :src="cart.imageUrl" :alt="cart.name" />
          <div class="description">
            <p>{{ cart.name }}</p>
            <span>{{ cart.price }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="extra-panel">
      <button>구매하기</button>
    </div>
  </div>
</template>

<script>
// import { FETCH_CART_ITEMS } from '@/store';

export default {
  // store의 actions에서 nuxtServerInit을 사용하면
  // 아래와 같이 구현할 필요가 없다.
  // async asyncData({ store }) {
  //   await store.dispatch(FETCH_CART_ITEMS);
  // },

  computed: {
    carts() {
      return this.$store.state.cartItems;
    },
  },
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
