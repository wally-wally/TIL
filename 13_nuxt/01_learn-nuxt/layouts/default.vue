<template>
  <div>
    <AppHeader />
    <!-- Nuxt: router-view와 동일한 역할 -->
    <Nuxt />
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue';

export default {
  components: { AppHeader },
}
</script>
