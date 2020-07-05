<template>
  <div id="app">
    <toggle-btn/>
    <dropdown/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import toggleBtn from '@/components/accordion.vue';
import dropdown from '@/components/dropdown.vue';

@Component({
  components: {
    dropdown,
    toggleBtn,
  },
})
export default class App extends Vue {
}
</script>

<style>
</style>