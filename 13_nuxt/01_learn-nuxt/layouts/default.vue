<template>
  <div>
    <header>
      <h1>{{ $route.name }}페이지</h1>

      <!-- NuxtLink: router-link와 동일한 역할 -->
      <NuxtLink to="/">홈페이지</NuxtLink>
      <NuxtLink to="/main">메인 페이지</NuxtLink>
      <NuxtLink to="/product">상품 페이지</NuxtLink>
    </header>

    <!-- Nuxt: router-view와 동일한 역할 -->
    <Nuxt />
  </div>
</template>
