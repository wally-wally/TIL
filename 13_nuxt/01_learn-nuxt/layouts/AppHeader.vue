<template>
  <header class="title">
    <!-- NuxtLink: router-link와 동일한 역할 -->
    <NuxtLink class="logo" to="/">Nuxt Shopping</NuxtLink>
  </header>
</template>

<style scoped>
header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
}
.logo {
  font-weight: 900;
}
.logo:visited {
  color: inherit;
}
</style>
