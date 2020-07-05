# :computer: Vue with Typescript #3

<br>

## 1. `@Model`

- `components/MyCheckBox.vue` 컴포넌트에서 `input` 태그의 `checkbox` 버튼 클릭 여부가 변화될 때 마다 `change` 함수를 실행해서 `checked` 값으로 emit으로 `views/ToC.vue` 컴포넌트로 올려보내서 출력되는 문구를 다르게 할 것이다.
- `@Model` 작성법(아래 코드 예시)
  - 데코레이터의 첫 번째 인자로 <b>이벤트명</b>을 작성한다.
  - 체크 여부에 대한 값을 받을 것이기 때문에 이름을 `checked`로 했다.(type을 boolean)
  - checked 값은 부모에서 받아서 쓰는 것이기 때문에 readonly로 설정
  - 지금까지의 상태는 값이 초기화되지 않아서 lint 에러가 발생하기 때문에 checked 뒤에 `!`를 붙여줘야 한다.
  - 이 값에 대한 타입을 명시적으로 선언해줘야 하므로 데코레이터의 두 번째 인자로 type을 넘겨준다.
  - `{type: Boolean}` => 체크된 값을 `Boolean` 형이라고 선언
- `MyCheckBox.vue`

```vue
<template>
  <!-- script 단에서 선언한 checked 값을 input 태그의 checked 값으로 넣어준다. -->
  <input type="checkbox" :checked="checked" @change="change">
</template>

<script lang="ts">
import { Vue, Component, Model, Emit } from 'vue-property-decorator';

@Component
export default class MyCheckBox extends Vue {
  @Model('change', {type: Boolean}) readonly checked!: boolean;

  @Emit()
  change(event: Event) {
    return event.target.checked;
  }
}
</script>
```

- `ToC.vue`

```vue
<template>
  <div>
    <h1>약관</h1>
    <p>
      이곳에는 동의를 필요하는 어떠한 약관 내용이 들어갑니다.
    </p>
    <!-- v-model로 넘겨 주는 값이 MyCheckBox 컴포넌트의 Model 데코레이터에 선언된 checked 값으로 들어가게 된다. -->
    <MyCheckBox v-model="checked" @change="change"></MyCheckBox>
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MyCheckBox from '@/components/MyCheckBox.vue';

@Component({
  components: {
    MyCheckBox,
  },
})
export default class ToC extends Vue {
  checked: boolean = false;
  text: string = '동의하지 않습니다.';

  // checkbox의 checked 값이 바뀔 때 마다 text 내용이 바뀌어야 하므로 change 함수를 만들어야 한다.
  change(checked: boolean) { // 인수인 checked는 MyCheckBox에서 넘어온 checked 데이터
    this.checked = checked;
    this.text = checked ? '동의합니다.' : '동의하지 않습니다.';
  }
}
</script>
```

<br>

## 2. Mixin 활용 - `01_vue-ts-mixin` 프로젝트 참고

- 기존 코드(`accordion.vue`)

```vue
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
import {Vue, Component} from 'vue-property-decorator';
@Component
export default class ToggleBtn extends Vue {
    public show: boolean = false;
    public toggle() {
        this.show = !this.show;
    }
}
</script>
<style>
    .card{
        width: 500px;
        margin: 10px;
    }
</style>
```

- 기존 코드(`dropdown.vue`)

```vue
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
import {Vue, Component} from 'vue-property-decorator';
@Component
export default class Dropdown extends Vue {
    public show: boolean = false;
    public toggle() {
        this.show = !this.show;
    }
}
</script>

<style>
    .dropdown{
        width: 500px;
    }
</style>
```

- 위 기존 코드에서 보시다 시피 `show`, `toggle` property 선언된 부분이 똑같이 작성된 것을 볼 수 있다.
- 이 부분을 `Mixin`을 활용해서 공통 부분을 하나의 컴포넌트로 묶어서 작성해보도록 하자.
- `components/toggle.vue`
  - `template` 단과 `style` 단은 `toggle.vue`에서 필요가 없기 때문에 지웠다.

```vue
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class Toggle extends Vue {
  public show: boolean = false;
  public toggle() {
    this.show = !this.show;
  }
}
</script>
```

- 바뀐 코드(`accordion.vue`, `dropdown.vue` 모두 동일)
  - `Vue`를 `Mixins(toggle)`로 바꾸면 다중 상속으로 사용할 수 있다.
  - `Mixins` 함수에 넣을 수 있는 component의 최대 개수는 5개이다.

```vue
<script lang="ts">
// script 부분만 바뀜
import {Vue, Component, Mixins} from 'vue-property-decorator'; // Mixin을 활용하기 위해 Mixins 추가
import toggle from '@/components/toggle.vue';

@Component({
    components: {
        toggle,
    },
})
export default class ToggleBtn extends Mixins(toggle) {
    mounted() {
        console.log(this); // this를 출력하여 show, toggle에 접근해서 사용할 수 있음을 확인
    }
}
</script>
```

![01](https://user-images.githubusercontent.com/52685250/86537679-ee41a580-bf2b-11ea-9af0-9aecb5972387.JPG)

- 만약 Mixin에서 사용하는 property와 해당 컴포넌트에서 사용하는 property명이 같다면 사용하는 해당 컴포넌트가 우선순위가 높아서 overwrite되서 사용하게 된다.
  - `dropdown.vue`에 `show` property를 추가로 작성한 후 console창으로 `this`를 출력하면 `show`가 `false`가 아닌 `true`로 저장됨을 확인할 수 있다.

```vue
<script lang="ts">
import {Vue, Component, Mixins} from 'vue-property-decorator';
import toggle from '@/components/toggle.vue';

@Component({
    components: {
        toggle,
    },
})
export default class ToggleBtn extends Mixins(toggle) {
    public show: boolean = true;

    mounted() {
        console.log(this);
    }
}
</script>
```

![02](https://user-images.githubusercontent.com/52685250/86537759-758f1900-bf2c-11ea-8900-a6e0a52be4f3.JPG)