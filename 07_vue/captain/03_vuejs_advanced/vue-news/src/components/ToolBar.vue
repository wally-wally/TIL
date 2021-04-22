<template>
  <div class="header">
    <router-link to="/news">News</router-link>
    <router-link to="/ask">Ask</router-link>
    <router-link to="/jobs">Jobs</router-link>
  </div>
</template>

<style scoped>
  .header {
    color: white;
    background-color: #42b883;
    display: flex;
    padding: 8px;
  }

  .header a:nth-child(-n+2) {
    border-right: 1px solid white;
    padding-right: 6px;
    margin-right: 6px;
  }

  .header .router-link-exact-active {
    color: #35495e;
  }

  .header a {
    color: white;
  }
</style>