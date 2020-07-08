<template>
  <div>
    {{ $store.getters.count }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Count extends Vue {}
</script>