<template>
  <div class="list-wrapper">
    <ul>
      <li v-for="cart in $store.state.cartItems" :key="cart.id" class="list-item">
        <img class="thumbnail" :src="cart.imageUrl" :alt="cart.name" />
        <div class="description">
          <p>{{ cart.name }}</p>
          <span>{{ cart.price }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { FETCH_CART_ITEMS } from '~/store'

export default {
  // asyncData와 달리 fetch는 일반적인 컴포넌트에서 동작한다.
  // fetch는 해당 페이지를 새로고침해서 접근했을 때와
  // 다른 페이지에 있다가 링크를 클릭하여 넘어올 때 this가 가리키는 vue component가 달라질 수 있다.
  // 서버 사이드 렌더링을 위해 서버에서 화면을 구성할 때 컴포넌트가 생성되고 나서 실행됨
  // 브라우저에서 URL 주소를 변경해서 페이지를 이동할 때
  // fetch에 함수 parameter가 있는 코드는 2.12 버전 이전의 예전 코드이므로 주의!
  async fetch() {
    await this.$store.dispatch(FETCH_CART_ITEMS);
  }
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
