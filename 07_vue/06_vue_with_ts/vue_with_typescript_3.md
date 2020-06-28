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

