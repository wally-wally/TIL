<template>
  <div>
    <p>메인 페이지입니다.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // asyncData는 페이지가 그려지기 전(컴포넌트가 생성되기 이전)에 실행되기 때문에
  // 여기서는 컴포넌트를 가리킬 수 있는 값이 없다.
  // [주의!] asyncData는 pages에 있는 컴포넌트에만 정의할 수 있는 인스턴스이다!
  async asyncData() {
    const response = await axios.get('http://localhost:3000/products');
    const products = response.data;
    return { products }
  },
}
</script>

<style>

</style>
