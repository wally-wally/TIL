<template>
  <div class="home">
    <Observable />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Observable from "@/components/Observable.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Observable,
  },
});
</script>
