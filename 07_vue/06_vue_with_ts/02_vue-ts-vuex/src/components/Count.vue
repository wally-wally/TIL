<template>
  <div>
    {{ $store.getters.count }}
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class Count extends Vue {}
</script>