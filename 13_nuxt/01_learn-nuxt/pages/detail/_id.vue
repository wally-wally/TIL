<template>
  <div>
    <div class="container">
      <div class="main-panel">
        <img
          class="product-image"
          :src="product.imageUrl"
          :alt="product.name"
        />
      </div>
      <div class="side-panel">
        <p class="name">{{ product.name }}</p>
        <p class="price">{{ product.price }}</p>
        <button type="button" @click="addToCart">카트에 담기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createCartItem, fetchProductById } from '@/api';

export default {
  // asyncData 속성의 파라미터는 context 속성
  // 컨텍스트 속성은 넉스트 프레임워크 전반에 걸쳐 공용으로 사용되는 속성으로써 플러그인, 미들웨어 등의 속성에서도 접근할 수 있다.
  // 컨텍스트에는 스토어, 라우터 관련 정보뿐만 아니라 서버 사이드에서 요청, 응답 관련된 속성도 접근할 수 있다.
  async asyncData({ params }) {
    const response = await fetchProductById(params.id);
    const product = response.data;
    return { product };
  },

  methods: {
    async addToCart() {
      const response = await createCartItem(this.product);
      console.log(response);
      this.$store.commit('addCartItem', this.product);
      this.$router.push('/cart');
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
.product-image {
  width: 500px;
  height: 375px;
}
.side-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  text-align: center;
  padding: 0 1rem;
}
</style>
