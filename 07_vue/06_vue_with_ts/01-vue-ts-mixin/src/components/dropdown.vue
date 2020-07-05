<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle"
                @click="toggle"
                type="button" id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
            Dropdown button
        </button>
        <div class="dropdown-menu show" v-show="show" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
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
// Vue를 Mixins(toggle)로 바꾸면 다중 상속으로 사용할 수 있다. / Mixin 함수에 넣을 수 있는 component의 최대 개수는 5개이다.
export default class ToggleBtn extends Mixins(toggle) {
    // 만약 Mixin에서 사용하는 property와 해당 컴포넌트에서 사용하는 property명이 같다면
    // 사용하는 해당 컴포넌트가 우선순위가 높아서 overwrite되서 사용하게 된다.
    public show: boolean = true;

    mounted() {
        // 위 show property 코드가 없으면 this안의 show는 false이지만
        // 이 컴포넌트에 show property를 선언하면 선언된 값이 출력된다.
        console.log(this);
    }
}
</script>

<style>
    .dropdown{
        width: 500px;
    }
</style>