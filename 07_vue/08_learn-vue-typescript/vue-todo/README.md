# :page_facing_up: vue-todo project summary

<br>

## :one: Making Project

- Check the features needed for your project
  - `Choose Vue version, Babel, TS, Linter`
- Choose a version of Vue.js that you want to start the project with
  - `2.x`
- Use class-style component syntax?
  - `No`

- Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)?
  - `Yes`

<br>

## :two: Type Definition

- `data`

  각 데이터가 어떤 타입인지 `as` 키워드를 이용해서 타입을 정의하자.

  ```vue
  <script lang="ts">
  export default Vue.extend({
    data() {
      return {
        todoText: "",
        todoItems: [] as Todo[]
      };
    },
  })
  </script>
  ```

- `methods`

  파라미터의 타입을 정확하게 정의해주자.

  ```vue
  <script lang="ts">
  export default Vue.extend({
    methods: {
      toggleTodoItem(todoItem: Todo, index: number) {
        this.todoItems.splice(index, 1, {
          ...todoItem,
          done: !todoItem.done
        });
        storage.save(this.todoItems);
      },
    }
  })
  </script>
  ```

- `props`

  Vue.js에서 prop의 type 정의는 PropType을 이용하고 제네릭으로 구체적인 타입을 넘겨줘야 한다.

  ```vue
  <script lang="ts">
  import Vue, { PropType } from "vue";
      
  export default Vue.extend({
    props: {
      todoItem: Object as PropType<Todo>,
      index: Number
    },
  })
  </script>
  ```

- `computed`

  `computed` 속성은 꼭 반환 타입을 정의해야 타입 추론이 원활하게 가능하다.

  ```vue
  <script lang="ts">
  import Vue, { PropType } from "vue";
      
  export default Vue.extend({
    computed: {
      todoItemClass(): string | null {
        return this.todoItem.done ? "complete" : null;
      }
    },
  })
  </script>
  ```

  