<template>
    <div class="card">
        <div class="card-header" @click="toggle">
            Featured
        </div>
        <div class="card-body" v-show="show">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Mixins} from 'vue-property-decorator';
import toggle from '@/components/toggle.vue';

@Component({
    components: {
        toggle,
    },
})
export default class ToggleBtn extends Mixins(toggle) {
    mounted() {
        console.log(this);
    }
}
</script>
<style>
    .card{
        width: 500px;
        margin: 10px;
    }
</style>
