<template>
  <div class="app">
    <main>
      <SearchInput
        v-model="searchKeyword"
        @search="searchProduct"
      />
      <ul>
        <li
          v-for="product in products"
          :key="product.id"
          class="item flex"
          @click="moveToDetailPage(product.id)"
        >
          <img class="product-image" :src="product.imageUrl" :alt="product.name">
          <p>{{ product.name }}</p>
          <span>{{ product.price }}</span>
        </li>
      </ul>
      <div class="cart-wrapper">
        <button class="btn" @click="moveToCartPage">장바구니 바로가기</button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import SearchInput from '@/components/SearchInput.vue';
import { fetchProductByKeyword } from '@/api';

export default {
  components: { SearchInput },
  // asyncData는 페이지가 그려지기 전(컴포넌트가 생성되기 이전)에 실행되기 때문에
  // 여기서는 컴포넌트를 가리킬 수 있는 값이 없다.
  // [주의!] asyncData는 pages에 있는 컴포넌트에만 정의할 수 있는 인스턴스이다!
  async asyncData() {
    const response = await axios.get('http://localhost:3000/products');
    const products = response.data.map(item => {
      return {
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`
      }
    });
    return { products }
  },

  data() {
    return {
      searchKeyword: '',
    }
  },

  methods: {
    moveToDetailPage(id) {
      this.$router.push(`detail/${id}`);
    },

    async searchProduct() {
      const response = await fetchProductByKeyword(this.searchKeyword);
      this.products = response.data.map(item => {
        return {
          ...item,
          imageUrl: `${item.imageUrl}?random=${Math.random()}`
        }
      });
    },

    moveToCartPage() {
      this.$router.push('/cart');
    }
  },
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}
.product-image {
  width: 400px;
  height: 250px;
}
.app {
  position: relative;
}
.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 50px;
  right: 50px;
}
.cart-wrapper .btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}
</style>
